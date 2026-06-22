import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { TbFidgetSpinner } from "react-icons/tb";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { saveUser } from "../../api/utils";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Navbar from "../../components/common/Navbar";
import { useState } from "react";
const Login = () => {
    const { signIn, signInWithGoogle, loading, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";
    const [showPassword, setShowPassword] = useState(false);

    if (loading) return <LoadingSpinner />;
    if (user) return <Navigate to={from} replace={true} />;

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };