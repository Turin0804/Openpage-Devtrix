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
        const db = client.db("openpage");
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
    res.send("Welcome to openpage Server.....😊📰");
});

app.listen(port, () => {
    console.log(`openpage is running on port ${port}`);
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

