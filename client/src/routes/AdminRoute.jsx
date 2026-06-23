import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/common/LoadingSpinner";

const AdminRoute = ({ children }) => {
    const [role, isLoading] = useRole();
    const location = useLocation();

    if (isLoading) return <LoadingSpinner />;
    if (role == "admin") return children;
    return (
        <Navigate to="/" state={{ from: location }} replace="true" />
    );
};

AdminRoute.propTypes = {
    children: PropTypes.element,
};
export default AdminRoute;
