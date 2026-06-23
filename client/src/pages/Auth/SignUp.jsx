import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { saveUser, uploadImage } from "../../api/utils";
import Navbar from "../../components/common/Navbar";

const SignUp = () => {
    const { createUser, updateUserProfile, signInWithGoogle, loading } =
        useAuth();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const validatePassword = (password) => {
        const errors = {};
        if (password.length < 6) {
            errors.length = "Password must be at least 6 characters long.";
        }
        if (!/[A-Z]/.test(password)) {
            errors.capital =
                "Password must contain at least one capital letter.";
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.special =
                "Password must contain at least one special character.";
        }
        if (!/[0-9]/.test(password)) {
            errors.numeric =
                "Password must contain at least one numeric character.";
        }
        return errors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const image = form.image.files[0];
        // console.log(image);

        // Validate Password
        const passwordErrors = validatePassword(password);

        if (Object.keys(passwordErrors).length > 0) {
            setErrors(passwordErrors);
            toast.error(
                "Password is not correct. Please write correct password!!"
            );
            return;
        }

        // Clear password error if validation passes
        setPasswordError("");

        // Upload Image
        const photoUrl = await uploadImage(image);

        try {
            // User Registration
            const result = await createUser(email, password);

            // Save username & profile photo
            await updateUserProfile(name, photoUrl);
            // console.log(result);
            // Save user in database
            await saveUser({ ...result.user, displayName: name, photoUrl });

            toast.success("Signup Successful");
            navigate("/");
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
            // Save user in database
            await saveUser(data?.user);

            toast.success("Signup Successful");
            navigate("/");
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
                        <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
                        <p className="text-sm text-gray-400">
                            Welcome to InsightArc
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
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter Your Name Here"
                                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-indigo-500 bg-gray-200 text-gray-900"
                                    data-temp-mail-org="0"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="image"
                                    className="block mb-2 text-sm"
                                >
                                    Select Image:
                                </label>
                                <input
                                    required
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                />
                            </div>
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
                                {errors.length && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.length}
                                    </p>
                                )}
                                {errors.capital && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.capital}
                                    </p>
                                )}
                                {errors.special && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.special}
                                    </p>
                                )}
                                {errors.numeric && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.numeric}
                                    </p>
                                )}
                                {passwordError && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {passwordError}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="bg-indigo-500 w-full rounded-md py-3 text-white"
                            >
                                {loading ? (
                                    <TbFidgetSpinner className="animate-spin m-auto" />
                                ) : (
                                    "Continue"
                                )}
                            </button>
                        </div>
                    </form>
                    <div className="flex items-center pt-4 space-x-1">
                        <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
                        <p className="px-3 text-sm dark:text-gray-400">
                            Signup with social accounts
                        </p>
                        <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
                    </div>
                    <div
                        onClick={handleGoogleSignIn}
                        className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
                    >
                        <FcGoogle size={32} />

                        <p>Continue with Google</p>
                    </div>
                    <p className="px-6 text-sm text-center text-gray-400">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="hover:underline hover:text-indigo-500 text-gray-600"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );