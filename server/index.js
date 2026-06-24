require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");

const port = process.env.PORT || 9000;
const app = express();

// middleware
const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://getopenpage.web.app",
        "https://getopenpage.firebaseapp.com",
    ],
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

const verifyToken = async (req, res, next) => {
    // console.log(req.cookies);
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).send({ message: "unauthorized access" });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(401).send({ message: "unauthorized access" });
        }
        req.user = decoded;
        next();
    });
};
// Use MONGODB_URI env var — set direct string locally, SRV string on Vercel
const uri = process.env.MONGODB_URI || `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pneoyej.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

// Module-level collection references — null until DB connects
let usersCollection = null;
let articlesCollection = null;
let publishersCollection = null;
let subscriptionsCollection = null;

// Middleware: lazily connect if DB not ready yet (handles serverless cold starts)
const requireDb = async (req, res, next) => {
    if (!usersCollection) {
        try {
            await connectDB();
        } catch (err) {
            return res.status(503).json({
                message: "Database unavailable. Please check MongoDB connection.",
            });
        }
    }
    if (!usersCollection) {
        return res.status(503).json({
            message: "Database unavailable. Please check MongoDB connection.",
        });
    }
    next();
};

async function connectDB() {
    try {
        await client.connect();
        const db = client.db("openpage");
        usersCollection = db.collection("users");
        articlesCollection = db.collection("articles");
        publishersCollection = db.collection("publishers");
        subscriptionsCollection = db.collection("subscriptions");

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("✅ Successfully connected to MongoDB!");
    } catch (err) {
        console.error("❌ Failed to connect to MongoDB:", err.message);
        console.error("⚠️  Server is running but database features are unavailable.");
        console.error("📋 Check: 1) Your IP is whitelisted in Atlas  2) Internet connectivity  3) .env credentials");
    }
}

/**
 *
 * JWT Authentication
 *
 */
// Generate jwt token
app.post("/jwt", async (req, res) => {
    const email = req.body;
    console.log(email);
    const token = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1000d",
    });
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite:
            process.env.NODE_ENV === "production" ? "none" : "strict",
    }).send({ success: true });
});

// Logout
app.get("/logout", async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "strict",
        }).send({ success: true });
    } catch (err) {
        res.status(500).send(err);
    }
});

/**
 *
 * Users API
 *
 */

// Get all users data
app.get("/all-users", requireDb, async (req, res) => {
    const users = await usersCollection.find().toArray();
    res.send(users);
});

// Count all users, normal users, and premium users
app.get("/users-stat", requireDb, async (req, res) => {
    try {
        const totalUsers = await usersCollection.countDocuments();
        const premiumUsers = await usersCollection.countDocuments({
            userHasSubscription: true,
        });
        const normalUsers = totalUsers - premiumUsers;

        res.send({
            totalUsers,
            normalUsers,
            premiumUsers,
        });
    } catch (error) {
        console.error("Error counting users:", error);
        res.status(500).send("Error counting users");
    }
});

// Get all users data except the current user
app.get("/all-users/:email", verifyToken, requireDb, async (req, res) => {
    const email = req.params.email;
    const query = { email: { $ne: email } };
    const users = await usersCollection.find(query).toArray();
    res.send(users);
});

// Get user data by email
app.get("/users/:email", requireDb, async (req, res) => {
    const email = req.params.email;
    const query = { email };
    const user = await usersCollection.findOne(query);
    res.send(user);
});

// Update user role and status
app.patch("/users/role/:email", verifyToken, requireDb, async (req, res) => {
    const email = req.params.email;
    const { role } = req.body;
    const filter = { email };

    const updateDoc = {
        $set: {
            role,
        },
    };

    if (role === "admin") {
        updateDoc.$set.userHasSubscription = true;
        updateDoc.$set.premiumTaken = "365 days";
    }

    const result = await usersCollection.updateOne(filter, updateDoc);
    res.send(result);
});

// Get user role
app.get("/users/role/:email", verifyToken, requireDb, async (req, res) => {
    const email = req.params.email;
    const query = { email };
    const user = await usersCollection.findOne(query);
    res.send({ role: user?.role });
});

// Save or update user data in the database
app.post("/users/:email", requireDb, async (req, res) => {
    const email = req.params.email;
    const query = { email };
    const user = req.body;
    // check if user exists in the database
    const existingUser = await usersCollection.findOne(query);
    if (existingUser) {
        return res.send(existingUser);
    }
    const result = await usersCollection.insertOne({
        ...user,
        role: "user",
        timestamp: Date.now(),
        userHasSubscription: false,
        premiumTaken: "",
    });
    res.send(result);
});

/**
 *
 * Publisher API
 *
 */
// Add a publisher
app.post("/publishers", requireDb, async (req, res) => {
    const publisher = req.body;
    const result = await publishersCollection.insertOne(publisher);
    res.send(result);
});

// Get all publishers
app.get("/publishers", requireDb, async (req, res) => {
    const publishers = await publishersCollection.find().toArray();
    res.send(publishers);
});

/**
 *
 * Articles API
 *
 */
// Get all articles & search articles
app.get("/articles", requireDb, async (req, res) => {
    const searchTerm = req.query.search || "";
    const articles = await articlesCollection
        .find({
            title: { $regex: searchTerm, $options: "i" }, // case-insensitive
        })
        .toArray();
    res.send(articles);
});

// Get all Latest articles
app.get("/latest-articles", requireDb, async (req, res) => {
    // sort by timestamp in descending order
    const articles = await articlesCollection
        .find()
        .sort({ timestamp: -1 })
        .limit(8)
        .toArray();
    res.send(articles);
});

// Get all approved articles  & search articles
app.get("/approved-articles", requireDb, async (req, res) => {
    const searchTerm = req.query.search || "";
    const articles = await articlesCollection
        .find({
            status: "approved",
            title: { $regex: searchTerm, $options: "i" }, // case-insensitive
        })
        .toArray();
    res.send(articles);
});

// GET 8 trending articles
app.get("/trending-articles", requireDb, async (req, res) => {
    // sort by view count in descending order
    const articles = await articlesCollection
        .find()
        .sort({ viewCount: -1 })
        .limit(8)
        .toArray();
    res.send(articles);
});

// Get current user articles
app.get("/my-articles/:email", verifyToken, requireDb, async (req, res) => {
    const email = req.params.email;
    const query = { "author.email": email }; // Assuming articles have an author field with an email
    try {
        const articles = await articlesCollection.find(query).toArray();
        res.send(articles);
    } catch (error) {
        console.error("Error fetching articles:", error);
        res.status(500).send("Error fetching articles");
    }
});

// Get article by id
app.get("/articles/:id", requireDb, async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const article = await articlesCollection.findOne(query);
    res.send(article);
});

// Update the status of a article and make premium field true
app.patch("/articles/:id", verifyToken, requireDb, async (req, res) => {
    const id = req.params.id;
    const { status, isPremium } = req.body;

    const filter = { _id: new ObjectId(id) };

    const updateDoc = {
        $set: {
            status,
            isPremium,
        },
    };
    const result = await articlesCollection.updateOne(
        filter,
        updateDoc
    );
    res.send(result);
});

// Update view count
app.patch("/articles/:id/view", requireDb, async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const update = { $inc: { viewCount: 1 } };
    const options = { returnOriginal: false };

    const result = await articlesCollection.updateOne(
        query,
        update,
        options
    );
    if (result) {
        res.status(200).json({
            message: "View count updated",
            article: result.value,
        });
    } else {
        res.status(404).json({ message: "Article not found" });
    }
});

// Update article
app.put("/articles/:id", verifyToken, requireDb, async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;

    const filter = { _id: new ObjectId(id) };
    const updateDoc = {
        $set: {
            title,
            description,
        },
    };

    try {
        const result = await articlesCollection.updateOne(
            filter,
            updateDoc
        );
        if (result.modifiedCount === 1) {
            res.send({ message: "Article updated successfully" });
        } else {
            res.status(404).send({ message: "Article not found" });
        }
    } catch (error) {
        console.error("Error updating article:", error);
        res.status(500).send("Error updating article");
    }
});

// GET all premium articles
app.get("/premium-articles", verifyToken, requireDb, async (req, res) => {
    const articles = await articlesCollection
        .find({ isPremium: true })
        .toArray();
    res.send(articles);
});

// GET all articles by user
app.get("/user-articles", verifyToken, requireDb, async (req, res) => {
    const email = req.params.email;
    const query = { "user.email": email };
    const articles = await articlesCollection.find(query).toArray();
    res.send(articles);
});

// Add article
app.post("/articles", verifyToken, requireDb, async (req, res) => {
    const article = req.body;
    const result = await articlesCollection.insertOne(article);
    res.send(result);
});

// DELETE article by id
app.delete("/articles/:id", verifyToken, requireDb, async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await articlesCollection.deleteOne(query);
    res.send(result);
});

/***
 *
 * Subscriptions API
 *
 */
// Get all subscriptions
app.get("/subscriptions", requireDb, async (req, res) => {
    const subscriptions = await subscriptionsCollection
        .find()
        .toArray();
    res.send(subscriptions);
});

// Get a subscription by id
app.get("/subscriptions/:id", requireDb, async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const subscription = await subscriptionsCollection.findOne(query);
    res.send(subscription);
});

// Add a subscription
app.post("/update-subscription", verifyToken, requireDb, async (req, res) => {
    const { userId, subscriptionPeriod } = req.body;
    console.log(userId, subscriptionPeriod);

    try {
        const filter = { _id: new ObjectId(userId) };
        const updateDoc = {
            $set: {
                userHasSubscription: true,
                premiumTaken: subscriptionPeriod,
            },
        };

        const result = await usersCollection.updateOne(
            filter,
            updateDoc
        );
        console.log(
            `Successfully updated the document with the _id: ${result}`
        );
        res.send(result);
    } catch (error) {
        console.error("Error updating subscription:", error);
        res.status(500).send("Error updating subscription");
    }
});

app.get("/", (req, res) => {
    res.send("Welcome to OpenPage Server.....😊📰");
});

// Start server and attempt DB connection
app.listen(port, () => {
    console.log(`OpenPage is running on port ${port}`);
});

connectDB();
