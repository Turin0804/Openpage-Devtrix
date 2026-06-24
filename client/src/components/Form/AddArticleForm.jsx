import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PropTypes from "prop-types";
import { TbFidgetSpinner } from "react-icons/tb";
import Select from "react-select";
import LoadingSpinner from "../common/LoadingSpinner";

const tagOptions = [
    { value: "technology", label: "Technology" },
    { value: "science", label: "Science" },
    { value: "business", label: "Business" },
    { value: "entertainment", label: "Entertainment" },
    { value: "health", label: "Health" },
];

const AddArticleForm = ({
    handleSubmit,
    imageUpload,
    setImageUpload,
    uploading,
    tags,
    setTags,
    publisher,
    setPublisher,
}) => {
    const { data: publishers = [], isLoading } = useQuery({
        queryKey: ["publishers"],
        queryFn: async () => {
            const response = await axios(`${import.meta.env.VITE_API_URL}/publishers`);
            return response.data;
        },
    });

    if (isLoading) return <LoadingSpinner />;

    // Custom styles for React-Select to support dark mode
    const customSelectStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: "transparent",
            borderColor: state.isFocused ? "#F59E0B" : "currentColor",
            boxShadow: state.isFocused ? "0 0 0 1px #F59E0B" : "none",
            "&:hover": {
                borderColor: state.isFocused ? "#F59E0B" : "currentColor",
            },
            padding: "0.25rem",
            borderRadius: "0.5rem",
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: "var(--card)", // Uses CSS variable from index.css
            border: "1px solid var(--border)",
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? "var(--border)" : "transparent",
            color: "var(--text)",
            cursor: "pointer",
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "var(--text)",
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: "var(--border)",
            borderRadius: "0.25rem",
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: "var(--text)",
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: "var(--text)",
            ":hover": {
                backgroundColor: "#ef4444",
                color: "white",
            },
        }),
    };

    return (
        <div className="w-full text-gray-800 dark:text-gray-200">
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Publish an Article</h1>
                <p className="text-gray-500 mt-2 text-sm">Share your story with the OpenPage community.</p>
            </div>

            <div className="bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-white/[0.08] rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto shadow-sm dark:shadow-none">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* Title */}
                            <div className="space-y-1.5 text-sm">
                                <label htmlFor="title" className="block font-medium text-gray-700 dark:text-gray-300">
                                    Title
                                </label>
                                <input
                                    className="w-full px-4 py-3 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
                                    name="title"
                                    id="title"
                                    type="text"
                                    placeholder="Enter a captivating title..."
                                    required
                                />
                            </div>

                            {/* Publisher */}
                            <div className="space-y-1.5 text-sm">
                                <label htmlFor="publisher" className="block font-medium text-gray-700 dark:text-gray-300">
                                    Publisher
                                </label>
                                <select
                                    required
                                    onChange={(e) => {
                                        setPublisher({
                                            _id: e.target.value,
                                            publisherName: e.target.options[e.target.selectedIndex].text,
                                        });
                                    }}
                                    className="w-full px-4 py-3 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 rounded-xl text-gray-900 dark:text-white transition-colors appearance-none cursor-pointer"
                                    name="publisher"
                                    defaultValue=""
                                >
                                    <option value="" disabled className="text-gray-400">
                                        Select a publisher...
                                    </option>
                                    {publishers.map((publisher) => (
                                        <option key={publisher._id} value={publisher._id}>
                                            {publisher.publisherName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Description */}
                            <div className="space-y-1.5 text-sm">
                                <label htmlFor="description" className="block font-medium text-gray-700 dark:text-gray-300">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    placeholder="Write your article description here..."
                                    className="w-full h-32 px-4 py-3 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors resize-y"
                                    name="description"
                                    required
                                ></textarea>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6 flex flex-col">
                            {/* Tags */}
                            <div className="space-y-1.5 text-sm">
                                <label htmlFor="tags" className="block font-medium text-gray-700 dark:text-gray-300">
                                    Tags
                                </label>
                                <div className="border border-gray-300 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 transition-colors focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500/50">
                                    <Select
                                        options={tagOptions}
                                        isMulti
                                        value={tags}
                                        onChange={setTags}
                                        styles={customSelectStyles}
                                        className="w-full"
                                        placeholder="Select tags..."
                                    />
                                </div>
                            </div>

                            {/* Image */}
                            <div className="space-y-1.5 text-sm flex-grow flex flex-col">
                                <label className="block font-medium text-gray-700 dark:text-gray-300">
                                    Cover Image
                                </label>
                                <div className="flex-grow border-2 border-dashed border-gray-300 dark:border-zinc-700 hover:border-orange-400 dark:hover:border-orange-500/50 rounded-xl bg-white dark:bg-zinc-800/50 flex flex-col items-center justify-center p-6 text-center transition-colors">
                                    <input
                                        className="hidden"
                                        type="file"
                                        name="image"
                                        id="image"
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files[0]) {
                                                setImageUpload({
                                                    image: e.target.files[0],
                                                    url: URL.createObjectURL(e.target.files[0]),
                                                });
                                            }
                                        }}
                                        required
                                    />
                                    <label
                                        htmlFor="image"
                                        className="cursor-pointer bg-gray-100 dark:bg-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-600 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-zinc-600 py-2 px-4 rounded-lg font-medium transition-colors text-sm mb-3"
                                    >
                                        Browse Files
                                    </label>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {imageUpload?.image?.name || "No file selected"}
                                    </p>

                                    {imageUpload && imageUpload?.url && (
                                        <div className="mt-4 flex flex-col items-center gap-2">
                                            <img
                                                className="w-full max-w-[120px] h-auto object-cover rounded-lg border border-gray-200 dark:border-zinc-700 shadow-sm"
                                                src={imageUpload?.url}
                                                alt="Preview"
                                            />
                                            <p className="text-[10px] text-gray-500 dark:text-gray-400">
                                                Size: {(imageUpload.image.size / 1024).toFixed(2)} KB
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 border-t border-gray-200 dark:border-white/[0.08]">
                        <button
                            type="submit"
                            disabled={uploading}
                            className="w-full py-3.5 px-4 bg-orange-600 hover:bg-orange-500 disabled:bg-orange-600/50 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25 flex items-center justify-center"
                        >
                            {uploading ? (
                                <TbFidgetSpinner className="animate-spin text-xl" />
                            ) : (
                                "Publish Article"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

AddArticleForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    imageUpload: PropTypes.object,
    setImageUpload: PropTypes.func.isRequired,
    uploading: PropTypes.bool.isRequired,
    publisher: PropTypes.object,
    setPublisher: PropTypes.func.isRequired,
    tags: PropTypes.array.isRequired,
    setTags: PropTypes.func.isRequired,
};

export default AddArticleForm;
