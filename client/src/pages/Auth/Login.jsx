import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { TbFidgetSpinner } from "react-icons/tb";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { saveUser } from "../../api/utils";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";

const Login = () => {
    const { signIn, signInWithGoogle, loading, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";
    const [showPassword, setShowPassword] = useState(false);

    if (loading) return <LoadingSpinner />;
    if (user) return <Navigate to={from} replace={true} />;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        try {
            await signIn(form.email.value, form.password.value);
            navigate(from, { replace: true });
            toast.success("Login Successful");
        } catch (err) {
            toast.error(err?.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const data = await signInWithGoogle();
            await saveUser(data?.user);
            navigate(from, { replace: true });
            toast.success("Login Successful");
        } catch (err) {
            toast.error(err?.message);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="font-rye text-3xl font-bold text-white mb-1">OpenPage</h1>
                    <p className="text-gray-500 text-sm">Sign in to your account</p>
                </div>

                <div className="bg-zinc-900 border border-white/[0.08] rounded-2xl p-7 sm:p-8">
                    <h2 className="text-xl font-bold text-white mb-6">Welcome back</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1.5">
                                Email address
                            </label>
                            <div className="relative">
                                <FiMail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    type="email" name="email" id="email" required
                                    placeholder="you@example.com"
                                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <FiLock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password" id="password" required
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-11 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors duration-200"
                                >
                                    {showPassword ? <AiFillEyeInvisible size={18} /> : <AiFillEye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button type="button" className="text-xs text-gray-500 hover:text-orange-400 transition-colors duration-200">
                                Forgot password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25"
                        >
                            {loading ? <TbFidgetSpinner className="animate-spin mx-auto" /> : "Sign In"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-5">
                        <div className="flex-1 h-px bg-white/[0.08]" />
                        <p className="text-gray-600 text-xs">or continue with</p>
                        <div className="flex-1 h-px bg-white/[0.08]" />
                    </div>

                    {/* Google */}
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-white text-sm font-medium rounded-xl transition-all duration-200"
                    >
                        <FcGoogle size={20} /> Continue with Google
                    </button>

                    <p className="text-center text-gray-500 text-sm mt-5">
                        No account yet?{" "}
                        <Link to="/signup" className="text-orange-400 hover:text-orange-300 font-medium transition-colors duration-200">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
