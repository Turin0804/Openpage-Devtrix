import { useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import UpdateUserModal from "./modal/UpdateUserModal";

const UserDataRow = ({ userData, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const { name, email, photo, role } = userData || {};
    const [isOpen, setIsOpen] = useState(false);

    // Handle updating user role
    const updateRole = async (selectedRole) => {
        if (role === selectedRole) return;
        try {
            await axiosSecure.patch(`/users/role/${email}`, {
                role: selectedRole,
            });

            toast.success("Role Updated to Admin...");
            refetch();
        } catch (err) {
            toast.error(err.response.data);
        } finally {
            setIsOpen(false);
        }
    };

    return (
        <tr className="hover:bg-gray-50/50 dark:hover:bg-zinc-800/50 transition-colors">
            <td className="px-5 py-4 border-b border-gray-200 dark:border-white/[0.08] bg-white dark:bg-zinc-900 text-sm">
                <img
                    className="w-10 h-10 border border-gray-200 dark:border-zinc-700 rounded-full object-cover"
                    src={photo}
                    alt=""
                />
            </td>
            <td className="px-5 py-4 border-b border-gray-200 dark:border-white/[0.08] bg-white dark:bg-zinc-900 text-sm">
                <p className="text-gray-900 dark:text-gray-200 font-medium">{name}</p>
            </td>
            <td className="px-5 py-4 border-b border-gray-200 dark:border-white/[0.08] bg-white dark:bg-zinc-900 text-sm">
                <p className="text-gray-600 dark:text-gray-400">{email}</p>
            </td>
            <td className="px-5 py-4 border-b border-gray-200 dark:border-white/[0.08] bg-white dark:bg-zinc-900 text-sm">
                <p className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase
                    ${role === "admin" 
                        ? "bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400" 
                        : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-400"
                    }`}
                >
                    {role}
                </p>
            </td>

            <td className="px-5 py-4 border-b border-gray-200 dark:border-white/[0.08] bg-white dark:bg-zinc-900 text-sm">
                {role === "admin" ? null : (
                    <>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="inline-flex items-center px-3 py-1.5 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-500/20 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                        >
                            Make Admin
                        </button>
                        {/* Modal */}
                        <UpdateUserModal
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            role={role}
                            updateRole={updateRole}
                        />
                    </>
                )}
            </td>
        </tr>
    );
};

UserDataRow.propTypes = {
    userData: PropTypes.object,
    refetch: PropTypes.func,
};

export default UserDataRow;
