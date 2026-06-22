import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { uploadImage } from "../../api/utils";

const AddPublisher = () => {
    const [publisherName, setPublisherName] = useState("");
    const [logo, setLogo] = useState(null);
    const [website, setWebsite] = useState("");
    const axiosSecure = useAxiosSecure();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add Publisher</h1>

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

            
        </div>
    );
};

export default AddPublisher;
