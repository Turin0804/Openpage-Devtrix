import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Select from "react-select";
import LoadingSpinner from "../common/LoadingSpinner";

const tagOptions = [
    { value: "technology", label: "Technology" },
    { value: "science", label: "Science" },
    { value: "business", label: "Business" },
    { value: "entertainment", label: "Entertainment" },
    { value: "health", label: "Health" },
];

const UpdateArticleForm = ({ article, tags, setTags }) => {
    const { title, description, publisher } = article || {};

    const { data: publishers = [], isLoading } = useQuery({
        queryKey: ["publishers"],
        queryFn: async () => {
            const response = await axios(
                `${import.meta.env.VITE_API_URL}/publishers`
            );
            return response.data;
        },
    });
    // console.log("publishers", publishers);
    // const { publisherName, _id } = publishers;

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="w-full flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
            <form>
                <div className="grid grid-cols-1 gap-10">
                    <div className="space-y-6">
                        {/* Title */}
                        <div className="space-y-1 text-sm">
                            <label
                                htmlFor="name"
                                className="block text-gray-600"
                            >
                                Title
                            </label>
                            <input
                                className="w-full px-4 py-3 text-gray-800 border border-indigo-300 focus:outline-indigo-500 rounded-md bg-white"
                                name="title"
                                id="title"
                                type="text"
                                defaultValue={title}
                                placeholder="Article Title"
                                required
                            />
                        </div>
                        {/* Description */}
                        <div className="space-y-1 text-sm">
                            <label
                                htmlFor="description"
                                className="block text-gray-600"
                            >
                                Description
                            </label>

                            <textarea
                                id="description"
                                name="description"
                                defaultValue={description}
                                placeholder="Write article description here..."
                                className="block rounded-md focus:indigo-300 w-full h-32 px-4 py-3 text-gray-800  border border-indigo-300 bg-white focus:outline-indigo-500 "
                            ></textarea>
                        </div>
                    </div>
                    <div className="space-y-6 flex flex-col">
                        {/* Publisher */}
                        <div className="space-y-1 text-sm">
                            <label
                                htmlFor="publisher"
                                className="block text-gray-600 "
                            >
                                Publisher
                            </label>
                            <select
                                required
                                onChange={(e) => e.target.value}
                                className="w-full px-4 py-3 border-indigo-300 focus:outline-indigo-500 rounded-md bg-white"
                                name="publisher"
                            >
                                {publishers.map((publisher) => (
                                    <option
                                        key={publisher._id}
                                        value={publisher._id}
                                    >
                                        {publisher.publisherName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Image */}
                        {/* <div className="w-full m-auto rounded-lg flex-grow pt-4">
                            <div className="file_upload px-5 py-3 relative border-4 border-dashed border-gray-300 rounded-lg">
                                <div className="flex flex-col w-max mx-auto text-center">
                                    <label>
                                        <input
                                            className="text-sm cursor-pointer w-36 hidden"
                                            type="file"
                                            name="image"
                                            id="image"
                                            accept="image/*"
                                            hidden
                                            onChange={(e) => {
                                                setImageUpload({
                                                    image: e.target.files[0],
                                                    url: URL.createObjectURL(
                                                        e.target.files[0]
                                                    ),
                                                });
                                            }}
                                        />
                                        <div className="bg-indigo-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">
                                            {imageUpload?.image?.name ||
                                                "Choose File"}
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        {imageUpload && imageUpload?.image?.size && (
                            <div className="flex gap-6 items-center justify-center">
                                <img
                                    className="w-20"
                                    src={imageUpload?.url}
                                    alt=""
                                />
                                <p className="text-sm text-gray-500 text-center">
                                    Image size:{" "}
                                    {(imageUpload.image.size / 1024).toFixed(2)}{" "}
                                    KB
                                </p>
                            </div>
                        )} */}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-indigo-500 "
                        >
                            Update Article
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateArticleForm;
