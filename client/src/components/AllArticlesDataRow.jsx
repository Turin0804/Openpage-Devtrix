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
        <tr>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{title}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <div className="block relative">
                            <img
                                alt="photo"
                                src={author.image}
                                className="mx-auto object-cover rounded h-10 w-15 "
                            />
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {author.name}
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    {author.email}
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{createdAt}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p
                    className={`whitespace-no-wrap ${
                        status === "approved"
                            ? "text-green-600"
                            : "text-orange-600"
                    }`}
                >
                    {status}
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{publisher.publisherName}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <select
                    required
                    defaultValue={status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="p-1 border-2 border-indigo-300 focus:outline-indigo-500 rounded-md text-gray-900 whitespace-no-wrap bg-white"
                    name="category"
                >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                </select>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button
                    onClick={() => setIsOpen(true)}
                    className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-indigo-900 leading-tight"
                >
                    <span className="absolute cursor-pointer inset-0 bg-red-200 opacity-50 rounded-full"></span>
                    <span className="relative cursor-pointer">Decline</span>
                </button>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {isPremium ? (
                    <p className="text-indigo-600">Premium</p>
                ) : (
                    <>
                        <button
                            onClick={handleMakePremium}
                            className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-indigo-900 leading-tight"
                        >
                            <span className="absolute cursor-pointer inset-0 bg-orange-200 opacity-50 rounded-full"></span>
                            <span className="relative cursor-pointer">
                                Make Premium
                            </span>
                        </button>
                    </>
                )}
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button
                    onClick={() => setIsOpen(true)}
                    className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-indigo-900 leading-tight"
                >
                    <span className="absolute cursor-pointer inset-0 bg-red-200 opacity-50 rounded-full"></span>
                    <span className="relative cursor-pointer">Delete</span>
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
