import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { uploadImage } from "../../api/utils";

const AddPublisher = () => {
    const [publisherName, setPublisherName] = useState("");
    const [logo, setLogo] = useState(null);
    const [website, setWebsite] = useState("");
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!publisherName || !logo || !website) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            const logoUrl = await uploadImage(logo);
            await axiosSecure.post("/publishers", {
                publisherName,
                logo: logoUrl,
                website,
                articlesCount: 0,
            });
            toast.success("Publisher added successfully!");
            setPublisherName("");
            setLogo(null);
            setWebsite("");
            e.target.reset();
        } catch (error) {
            console.error("Error adding publisher:", error);
            toast.error("Failed to add publisher");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add Publisher</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Publisher Name
                    </label>
                    <input
                        type="text"
                        value={publisherName}
                        onChange={(e) => setPublisherName(e.target.value)}
                        placeholder="Publisher Name"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Website URL
                    </label>
                    <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="Website URL"
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Publisher Logo
                    </label>
                    <input
                        type="file"
                        onChange={(e) => setLogo(e.target.files[0])}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        accept="image/*"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-400"
                >
                    Add Publisher
                </button>
            </form>
        </div>
    );
};

export default AddPublisher;
