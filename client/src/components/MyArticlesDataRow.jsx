import PropTypes from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import DeleteModal from "./modal/DeleteModal";

const MyArticlesDataRow = ({ index, article, refetch }) => {
    const { title, description, status, publisher, isPremium, _id } = article || {};
    const axiosSecure = useAxiosSecure();

    // delete modal
    let [isOpen, setIsOpen] = useState(false);
    //update modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedDescription, setUpdatedDescription] = useState(description);

    function openModal() { setIsOpen(true); }
    function closeModal() { setIsOpen(false); }

    function openEditModal() { setIsEditModalOpen(true); }
    function closeEditModal() { setIsEditModalOpen(false); }

    // Update an article
    const handleUpdate = async () => {
        try {
            const updatedArticle = {
                title: updatedTitle,
                description: updatedDescription,
            };
            await axiosSecure.put(`/articles/${_id}`, updatedArticle);
            refetch();
            toast.success("Article updated successfully!");
        } catch (err) {
            console.log(err);
            toast.error(err.response.data);
        } finally {
            closeEditModal();
        }
    };

    // Delete a article
    const handleDelete = async () => {
        try {
            await axiosSecure.delete(`/articles/${_id}`);
            refetch();
            toast.success("Article deleted successfully!");
        } catch (err) {
            console.log(err);
            toast.error(err.response.data);
        } finally {
            closeModal();
        }
    };

    return (
        <tr className="hover:bg-gray-50/50 dark:hover:bg-zinc-800/50 transition-colors">
            <td className="px-5 py-4 border-b border-gray-200 dark:border-white/[0.08] bg-white dark:bg-zinc-900 text-sm">
                <p className="text-gray-600 dark:text-gray-400 font-medium">{index + 1}</p>
            </td>
            <td className="px-5 py-4 border-b border-gray-200 dark:border-white/[0.08] bg-white dark:bg-zinc-900 text-sm">
                <p className="text-gray-900 dark:text-gray-200 font-medium truncate max-w-[200px]">{title}</p>
            </td>
            <td className="px-5 py-4 border-b border-gray-200 dark:border-white/[0.08] bg-white dark:bg-zinc-900 text-sm">
                <Link
                    to={`/articles/${_id}`}
                    className="inline-flex items-center px-3 py-1.5 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-500/20 text-xs font-semibold rounded-lg transition-colors"
                >
                    Details
                </Link>
            </td>
            <td className="px-5 py-4 border-b border-gray-200 dark:border-white/[0.08] bg-white dark:bg-zinc-900 text-sm">
                <p className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase
                    ${status === "approved" 
                        ? "bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400" 
                        : "bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400"
                    }`}
                >
                    {status}
                </p>
            </td>
            <td className="px-5 py-4 border-b border-gray-200 dark:border-white/[0.08] bg-white dark:bg-zinc-900 text-sm">
                <p className="text-gray-600 dark:text-gray-400">{publisher?.publisherName || 'N/A'}</p>
            </td>
            <td className="px-5 py-4 border-b border-gray-200 dark:border-white/[0.08] bg-white dark:bg-zinc-900 text-sm">
                <p className="text-gray-600 dark:text-gray-400">{isPremium ? "Yes" : "No"}</p>
            </td>
            <td className="px-5 py-4 border-b border-gray-200 dark:border-white/[0.08] bg-white dark:bg-zinc-900 text-sm">
                <div className="flex gap-2">
                    <button
                        onClick={openEditModal}
                        className="inline-flex items-center px-3 py-1.5 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20 text-xs font-semibold rounded-lg transition-colors"
                    >
                        Update
                    </button>
                    <button
                        onClick={openModal}
                        className="inline-flex items-center px-3 py-1.5 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 text-xs font-semibold rounded-lg transition-colors"
                    >
                        Delete
                    </button>
                </div>

                {/* Edit Modal */}
                {isEditModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
                        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 p-6 rounded-2xl shadow-xl max-w-lg w-full text-left">
                            <h2 className="text-xl font-bold mb-5 text-gray-900 dark:text-white">Edit Article</h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={updatedTitle}
                                        onChange={(e) => setUpdatedTitle(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                                    <textarea
                                        value={updatedDescription}
                                        onChange={(e) => setUpdatedDescription(e.target.value)}
                                        className="w-full h-32 px-4 py-2.5 bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-xl text-gray-900 dark:text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 resize-y"
                                    />
                                </div>
                            </div>
                            
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={closeEditModal}
                                    className="px-5 py-2.5 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdate}
                                    className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-sm font-medium transition-colors"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Modal uses HeadlessUI, so we'll leave it as is, or we could update it separately if needed, but its styling is likely handled within the modal component */}
                <DeleteModal
                    isOpen={isOpen}
                    closeModal={closeModal}
                    handleDelete={handleDelete}
                />
            </td>
        </tr>
    );
};

MyArticlesDataRow.propTypes = {
    index: PropTypes.number.isRequired,
    article: PropTypes.object.isRequired,
    refetch: PropTypes.func.isRequired,
};

export default MyArticlesDataRow;
