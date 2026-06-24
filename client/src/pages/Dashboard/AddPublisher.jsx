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
        <div className="container mx-auto p-4 text-gray-900 dark:text-gray-200 transition-colors duration-200">
            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Add Publisher</h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/[0.08] p-6 rounded-xl shadow-sm dark:shadow-none transition-colors">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Publisher Name
                    </label>
                    <input
                        type="text"
                        value={publisherName}
                        onChange={(e) => setPublisherName(e.target.value)}
                        placeholder="Publisher Name"
                        className="mt-1 block w-full p-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-md text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 transition-colors"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Website URL
                    </label>
                    <input
                        type="url"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="Website URL"
                        className="mt-1 block w-full p-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-md text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Publisher Logo
                    </label>
                    <input
                        type="file"
                        onChange={(e) => setLogo(e.target.files[0])}
                        className="mt-1 block w-full p-2 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-md text-gray-900 dark:text-gray-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 dark:file:bg-zinc-700 dark:file:text-gray-200 hover:file:bg-gray-200 dark:hover:file:bg-zinc-600"
                        accept="image/*"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-500 transition-colors"
                >
                    Add Publisher
                </button>
            </form>
        </div>
    );
};

export default AddPublisher;
