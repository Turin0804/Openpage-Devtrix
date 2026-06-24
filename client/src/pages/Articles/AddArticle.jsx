import { Helmet } from "react-helmet-async";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { uploadImage } from "../../api/utils";
import AddArticleForm from "../../components/Form/AddArticleForm";
import Container from "../../components/common/Container";

const AddArticle = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [publisher, setPublisher] = useState(null); // publisher object
    const [tags, setTags] = useState([]);
    const [imageUpload, setImageUpload] = useState({ name: "Choose File" });
    const [uploading, setUploading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (tags.length === 0) {
            toast.error("Please select at least one tag.");
            return;
        }
        
        setUploading(true);

        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const image = form.image.files[0];
        // Upload image
        const imageUrl = await uploadImage(image);

        // author Info
        const author = {
            name: user.displayName,
            image: user.photoURL,
            email: user.email,
        };

        // Create article object
        const article = {
            title,
            publisher,
            tags: tags.map((tag) => tag.value),
            description,
            isPremium: false,
            image: imageUrl,
            author,
            viewCount: 0, // initially 0
            status: "pending",
            createdAt: new Date().toISOString().split("T")[0], // get today's date
        };
        console.table(article);

        // Save article data to the database
        try {
            await axiosSecure.post("/articles", article);
            toast.success("Article added successfully!");
            navigate("/my-articles");
        } catch (err) {
            console.log(err);
            toast.error("Failed to add article.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-zinc-950 min-h-[calc(100vh-64px)] py-8 transition-colors duration-200">
            <Helmet>
                <title>Add Article | OpenPage</title>
            </Helmet>

            <Container>
                {/* Form */}
                <AddArticleForm
                    handleSubmit={handleSubmit}
                    imageUpload={imageUpload}
                    setImageUpload={setImageUpload}
                    uploading={uploading}
                    tags={tags}
                    setTags={setTags}
                    publisher={publisher}
                    setPublisher={setPublisher}
                />
            </Container>
        </div>
    );
};

export default AddArticle;
