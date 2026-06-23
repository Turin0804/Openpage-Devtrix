import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Newsletter = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email) {
            toast.error("Please fill in all fields");
            return;
        }

        try {
            // await axios.post(`${import.meta.env.VITE_API_URL}/newsletter`, {
            //     name,
            //     email,
            // });
            toast.success("Subscribed successfully!");
            setName("");
            setEmail("");
        } catch (error) {
            console.error("Error subscribing to newsletter:", error);
            toast.error("Failed to subscribe");
        }
    };

    return (
        <div className="bg-indigo-50 py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-6">
                    Subscribe to our Newsletter
                </h2>
                <p className="text-center text-gray-600 mb-8">
                    Stay updated with the latest news and exclusive content.
                </p>
                <form
                    onSubmit={handleSubmit}
                    className="max-w-lg mx-auto space-y-4"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your Name"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your Email"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Newsletter;
