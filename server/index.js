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