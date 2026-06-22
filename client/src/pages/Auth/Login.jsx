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
    // form submit handler
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            //User Login
            await signIn(email, password);
            navigate(from, { replace: true });
            toast.success("Login Successful");
        } catch (err) {
            console.log(err);
            toast.error(err?.message);
        }
    };

    // Handle Google Signin
    const handleGoogleSignIn = async () => {
        try {
            //User Registration using google
            const data = await signInWithGoogle();
            // Save user in database if not exists
            await saveUser(data?.user);

            navigate(from, { replace: true });
            toast.success("Login Successful");
        } catch (err) {
            console.log(err);
            toast.error(err?.message);
        }
    };
    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen bg-white py-12">
                <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
                    <div className="mb-8 text-center">
                        <h1 className="my-3 text-4xl font-bold">Log In</h1>
                        <p className="text-sm text-gray-400">
                            Sign in to access your account
                        </p>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        noValidate=""
                        action=""
                        className="space-y-6 ng-untouched ng-pristine ng-valid"
                    >
                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm"
                                >
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    placeholder="Enter Your Email Here"
                                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-indigo-500 bg-gray-200 text-gray-900"
                                    data-temp-mail-org="0"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between">
                                    <label
                                        htmlFor="password"
                                        className="text-sm mb-2"
                                    >
                                        Password
                                    </label>
                                </div>
                                <div className="relative">
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name="password"
                                        autoComplete="new-password"
                                        id="password"
                                        required
                                        placeholder="*******"
                                        className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-indigo-500 bg-gray-200 text-gray-900"
                                    />
                                    <div
                                        className="absolute inset-y-5 right-0 pr-3 flex items-center cursor-pointer"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? (
                                            <AiFillEyeInvisible size={24} />
                                        ) : (
                                            <AiFillEye size={24} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
