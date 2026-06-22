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
        <div>
            <h1>Add Publisher</h1>
        </div>
    );
};

export default AddPublisher;