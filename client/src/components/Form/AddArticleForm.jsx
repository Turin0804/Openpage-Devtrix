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
        <form onSubmit={handleSubmit} className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 xl:gap-16 pt-4 lg:pt-10">
            {/* Left Column: Writing Area (Takes up most space) */}
            <div className="flex-1 w-full lg:w-[65%] xl:w-[70%] mt-8 lg:mt-0">
                {/* Title */}
                <input
                    className="w-full bg-transparent border-none outline-none focus:ring-0 p-0 text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-zinc-700 transition-colors mb-6 lg:mb-10 resize-none"
                    name="title"
                    id="title"
                    type="text"
                    placeholder="Article Title..."
                    required
                />

                {/* Description (Body) */}
                <textarea
                    id="description"
                    placeholder="Tell your story..."
                    className="w-full bg-transparent border-none outline-none focus:ring-0 p-0 min-h-[60vh] text-lg sm:text-xl text-gray-800 dark:text-gray-300 placeholder-gray-400 dark:placeholder-zinc-600 transition-colors resize-y leading-relaxed font-medium"
                    name="description"
                    required
                ></textarea>
            </div>

            {/* Right Column: Settings Sidebar */}
            <div className="w-full lg:w-[35%] xl:w-[30%] border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-zinc-800 pt-8 lg:pt-0 lg:pl-10 xl:pl-16">
                <div className="sticky top-24 space-y-8">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-5">Publish Settings</h3>

                        <div className="space-y-6">
                            {/* Publisher */}
                            <div className="space-y-2">
                                <label htmlFor="publisher" className="block text-xs font-medium text-gray-500 dark:text-gray-400">
                                    PUBLISHER
                                </label>
                                <select
                                    required
                                    onChange={(e) => {
                                        setPublisher({
                                            _id: e.target.value,
                                            publisherName: e.target.options[e.target.selectedIndex].text,
                                        });
                                    }}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 rounded-xl text-gray-900 dark:text-white text-sm transition-colors cursor-pointer appearance-none"
                                    name="publisher"
                                    defaultValue=""
                                >
                                    <option value="" disabled className="text-gray-400">Select a publisher...</option>
                                    {publishers.map((publisher) => (
                                        <option key={publisher._id} value={publisher._id}>{publisher.publisherName}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Tags */}
                            <div className="space-y-2">
                                <label htmlFor="tags" className="block text-xs font-medium text-gray-500 dark:text-gray-400">
                                    TAGS
                                </label>
                                <div className="border border-gray-200 dark:border-zinc-800 rounded-xl bg-gray-50 dark:bg-zinc-900 transition-colors focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500/50">
                                    <Select
                                        options={tagOptions}
                                        isMulti
                                        value={tags}
                                        onChange={setTags}
                                        styles={customSelectStyles}
                                        className="w-full text-sm"
                                        placeholder="Add tags..."
                                    />
                                </div>
                            </div>

                            {/* Cover Image */}
                            <div className="space-y-2">
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">
                                    COVER IMAGE
                                </label>
                                <div className="border-2 border-dashed border-gray-200 dark:border-zinc-800 hover:border-orange-400 dark:hover:border-orange-500/50 rounded-xl bg-gray-50 dark:bg-zinc-900/50 flex flex-col items-center justify-center p-6 text-center transition-colors">
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
                                        className="cursor-pointer bg-white dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-zinc-700 py-2 px-4 rounded-lg font-medium transition-colors text-xs mb-3 shadow-sm"
                                    >
                                        Browse Files
                                    </label>
                                    <p className="text-[10px] text-gray-400 dark:text-gray-500">
                                        {imageUpload?.image?.name || "No file selected"}
                                    </p>

                                    {imageUpload && imageUpload?.url && (
                                        <div className="mt-4 flex flex-col items-center gap-1.5">
                                            <img
                                                className="w-full max-w-[140px] h-auto object-cover rounded-lg border border-gray-200 dark:border-zinc-700 shadow-sm"
                                                src={imageUpload?.url}
                                                alt="Preview"
                                            />
                                            <p className="text-[9px] text-gray-400 dark:text-gray-500">
                                                Size: {(imageUpload.image.size / 1024).toFixed(2)} KB
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={uploading}
                            className="w-full py-4 px-4 bg-orange-600 hover:bg-orange-500 disabled:bg-orange-600/50 text-white font-bold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25 flex items-center justify-center"
                        >
                            {uploading ? (
                                <TbFidgetSpinner className="animate-spin text-xl" />
                            ) : (
                                "Publish Article"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </form>
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
