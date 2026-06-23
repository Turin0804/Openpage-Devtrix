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

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mx1xh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
async function run() {
    try {
        const db = client.db("insightArc");
        const usersCollection = db.collection("users");
        const articlesCollection = db.collection("articles");
        const publishersCollection = db.collection("publishers");
        const subscriptionsCollection = db.collection("subscriptions");

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
                expiresIn: "365d",
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
                    // maxAge: 0,
                    // secure: process.env.NODE_ENV === "production",
                    // sameSite:
                    //     process.env.NODE_ENV === "production"
                    //         ? "none"
                    //         : "strict",
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
        app.get("/all-users", async (req, res) => {
            const users = await usersCollection.find().toArray();
            res.send(users);
        });

        // Count all users, normal users, and premium users
        app.get("/users-stat", async (req, res) => {
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
        app.get("/all-users/:email", verifyToken, async (req, res) => {
            const email = req.params.email;
            const query = { email: { $ne: email } };
            const users = await usersCollection.find(query).toArray();
            res.send(users);
        });

        // Get user data by email
        app.get("/users/:email", async (req, res) => {
            const email = req.params.email;
            const query = { email };
            const user = await usersCollection.findOne(query);
            res.send(user);
        });

        // Update user role and status
        app.patch("/users/role/:email", verifyToken, async (req, res) => {
            const email = req.params.email;
            const { role } = req.body;
            const filter = { email };

            const updateDoc = {
                $set: {
                    role,
                },
            };
            const result = await usersCollection.updateOne(filter, updateDoc);
            res.send(result);
        });

        // Get user role
        app.get("/users/role/:email", verifyToken, async (req, res) => {
            const email = req.params.email;
            const query = { email };
            const user = await usersCollection.findOne(query);
            res.send({ role: user?.role });
        });

        // // GET current user data
        // app.get("/users/me", verifyToken, async (req, res) => {
        //     const email = req.user;
        //     const query = { email: email };
        //     const user = await usersCollection.findOne(query);
        //     res.send(user);
        // });

        // Save or update user data in the database
        app.post("/users/:email", async (req, res) => {
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

        // // Update urrent user data
        // app.patch("/users/me", verifyToken, async (req, res) => {
        //     const email = req.user;
        //     const query = { email };
        //     const update = { $set: req.body };
        //     const options = { returnOriginal: false };
        //     const result = await usersCollection.findOneAndUpdate(
        //         query,
        //         update,
        //         options
        //     );
        //     res.send(result.value);
        // });

        /**
         *
         * Publisher API
         *
         */
        // Add a publisher
        app.post("/publishers", async (req, res) => {
            const publisher = req.body;
            const result = await publishersCollection.insertOne(publisher);
            res.send(result);
        });

        // Get all publishers
        app.get("/publishers", async (req, res) => {
            const publishers = await publishersCollection.find().toArray();
            res.send(publishers);
        });

        /**
         *
         * Articles API
         *
         */
        // Get all articles & search articles
        app.get("/articles", async (req, res) => {
            const searchTerm = req.query.search || "";
            const articles = await articlesCollection
                .find({
                    title: { $regex: searchTerm, $options: "i" }, // case-insensitive
                })
                .toArray();
            res.send(articles);
        });

        // app.get("/articles", async (req, res) => {
        //     try {
        //         const searchTerm = req.query.search || "";
        //         const articles = await articlesCollection
        //             .find({
        //                 title: { $regex: searchTerm, $options: "i" },
        //             })
        //             .toArray();
        //         res.send(articles);
        //     } catch (error) {
        //         console.error("Error fetching articles:", error);
        //         res.status(500).send({ message: "Error fetching articles" });
        //     }
        // });

        // Get all Latest articles
        app.get("/latest-articles", async (req, res) => {
            // sort by timestamp in descending order
            const articles = await articlesCollection
                .find()
                .sort({ timestamp: -1 })
                .limit(4)
                .toArray();
            res.send(articles);
        });

        // Get all approved articles  & search articles
        app.get("/approved-articles", async (req, res) => {
            const searchTerm = req.query.search || "";
            const articles = await articlesCollection
                .find({
                    status: "approved",
                    title: { $regex: searchTerm, $options: "i" }, // case-insensitive
                })
                .toArray();
            res.send(articles);
        });

        // GET 6 trending articles
        app.get("/trending-articles", async (req, res) => {
            // sort by view count in descending order
            const articles = await articlesCollection
                .find()
                .sort({ viewCount: -1 })
                .limit(6)
                .toArray();
            res.send(articles);
        });

        // Get current user articles
        app.get("/my-articles/:email", verifyToken, async (req, res) => {
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
        app.get("/articles/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const article = await articlesCollection.findOne(query);
            res.send(article);
        });

        // Update the status of a article and make premium field true
        app.patch("/articles/:id", verifyToken, async (req, res) => {
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
        app.patch("/articles/:id/view", async (req, res) => {
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
        app.put("/articles/:id", verifyToken, async (req, res) => {
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
        app.get("/premium-articles", verifyToken, async (req, res) => {
            const articles = await articlesCollection
                .find({ isPremium: true })
                .toArray();
            res.send(articles);
        });

        // GET all articles by user
        app.get("/user-articles", verifyToken, async (req, res) => {
            const email = req.params.email;
            const query = { "user.email": email };
            const articles = await articlesCollection.find(query).toArray();
            res.send(articles);
        });

        // Add article
        app.post("/articles", verifyToken, async (req, res) => {
            const article = req.body;
            const result = await articlesCollection.insertOne(article);
            res.send(result);
        });

        // DELETE article by id
        app.delete("/articles/:id", verifyToken, async (req, res) => {
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
        app.get("/subscriptions", async (req, res) => {
            const subscriptions = await subscriptionsCollection
                .find()
                .toArray();
            res.send(subscriptions);
        });

        // Get a subscription by id
        app.get("/subscriptions/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const subscription = await subscriptionsCollection.findOne(query);
            res.send(subscription);
        });

        // Add a subscription
        app.post("/update-subscription", verifyToken, async (req, res) => {
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

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Welcome to Openpage Server.....😊📰");
});

app.listen(port, () => {
    console.log(`Openpage is running on port ${port}`);
});
