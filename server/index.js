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