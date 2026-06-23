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

    