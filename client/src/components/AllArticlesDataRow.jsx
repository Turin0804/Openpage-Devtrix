import PropTypes from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import DeleteModal from "./modal/DeleteModal";

const AllArticlesDataRow = ({ article, refetch }) => {
    const { title, author, status, publisher, createdAt, isPremium, _id } =
        article || {};
    // console.log(article);

    const axiosSecure = useAxiosSecure();

    let [isOpen, setIsOpen] = useState(false);
    const closeModal = () => setIsOpen(false);

    // Update the status of the article
    const handleStatusChange = async (newStatus) => {
        if (status === newStatus) return;
        console.log(newStatus);
        // Update the status using patch request
        try {
            await axiosSecure.patch(`/articles/${_id}`, {
                status: newStatus,
            });
            refetch();
            toast.success("Status updated!");
        } catch (err) {
            console.log(err);
            toast.error(err.response.data);
        }
    };

    // Make premium article
    const handleMakePremium = async () => {
        if (isPremium) return;
        try {
            await axiosSecure.patch(`/articles/${_id}`, {
                isPremium: true,
            });
            refetch();
            toast.success("Article made premium!");
        } catch (err) {
            console.log(err);
            toast.error(err.response.data);
        }
    };

    // Delete a article
    const handleDelete = async () => {
        try {
            // console.log("Deleted: ", _id);
            await axiosSecure.delete(`/articles/${_id}`);
            // Call refetch to update the UI
            refetch();
            toast.success("article deleted successfully!");
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
                <p className="text-gray-900 dark:text-gray-200 font-medium truncate max-w-[150px]">{title}</p>
            </td>
            <td className="px-5 py-4 border-b border-gray-200 dark:border-white/[0.08] bg-white dark:bg-zinc-900 text-sm">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className="block relative">
                            <img
                                alt="photo"
                                src={author.image}
                                className="mx-auto object-cover rounded h-10 w-10 border border-gray-200 dark:border-zinc-700"
                            />
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-5 py-4 border-b border-gray-200 dark:border-white/[0.08] bg-white dark:bg-zinc-900 text-sm">
                <p className="text-gray-600 dark:text-gray-400">
                    {author.name}
                </p>
            </td>
            <td className="px-5 py-4 border-b border-gray-200 dark:border-white/[0.08] bg-white dark:bg-zinc-900 text-sm">
                <p className="text-gray-600 dark:text-gray-400">
                    {author.email}
                </p>
            </td>
            <td className="px-5 py-4 border-b border-gray-200 dark:border-white/[0.08] bg-white dark:bg-zinc-900 text-sm">
                <p className="text-gray-600 dark:text-gray-400">{createdAt}</p>
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
                <select
                    required
                    defaultValue={status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="p-1.5 border border-orange-300 dark:border-orange-500/50 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 rounded-lg text-gray-900 dark:text-gray-200 bg-white dark:bg-zinc-800 transition-colors text-xs font-medium cursor-pointer"
                    name="category"
                >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                </select>
            </td>
            <td className="px-5 py-4 border-b border-gray-200 dark:border-white/[0.08] bg-white dark:bg-zinc-900 text-sm">
                <button
                    onClick={() => setIsOpen(true)}
                    className="inline-flex items-center px-3 py-1.5 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 text-xs font-semibold rounded-lg transition-colors disabled:opacity-50"
                >
                    Decline
                </button>
            </td>
            <td className="px-5 py-4 border-b border-gray-200 dark:border-white/[0.08] bg-white dark:bg-zinc-900 text-sm">
                {isPremium ? (
                    <p className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-orange-100 dark:bg-orange-500/10 text-orange-700 dark:text-orange-400">Premium</p>
                ) : (
                    <button
                        onClick={handleMakePremium}
                        className="inline-flex items-center px-3 py-1.5 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-500/20 text-xs font-semibold rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
                    >
                        Make Premium
                    </button>
                )}
            </td>
            <td className="px-5 py-4 border-b border-gray-200 dark:border-white/[0.08] bg-white dark:bg-zinc-900 text-sm">
                <button
                    onClick={() => setIsOpen(true)}
                    className="inline-flex items-center px-3 py-1.5 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 text-xs font-semibold rounded-lg transition-colors disabled:opacity-50"
                >
                    Delete
                </button>

                <DeleteModal
                    isOpen={isOpen}
                    closeModal={closeModal}
                    handleDelete={handleDelete}
                />
            </td>
        </tr>
    );
};

AllArticlesDataRow.propTypes = {
    article: PropTypes.object.isRequired,
    refetch: PropTypes.func.isRequired,
};
export default AllArticlesDataRow;
