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
        <tr>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <img
                    className="w-10 h-10 border rounded-full object-cover"
                    src={photo}
                    alt=""
                />
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{name}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{email}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap capitalize">
                    {role}
                </p>
            </td>

            {role === "admin" ? null : (
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span
                        onClick={() => setIsOpen(true)}
                        className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-indigo-900 leading-tight"
                    >
                        <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-indigo-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">Make Admin</span>
                    </span>
                    {/* Modal */}
                    <UpdateUserModal
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        role={role}
                        updateRole={updateRole}
                    />
                </td>
            )}
        </tr>
    );
};

UserDataRow.propTypes = {
    userData: PropTypes.object,
    refetch: PropTypes.func,
};

export default UserDataRow;
