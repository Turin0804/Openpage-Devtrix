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


        </div>
    );
};

export default AddPublisher;
