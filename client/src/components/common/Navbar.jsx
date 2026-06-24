import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import avatarImg from "../../assets/placeholder.jpg";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";
import ThemeToggle from "../ThemeToggle";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const { data: userData = {}, isLoading } = useQuery({
        queryKey: ["userData"],
        queryFn: async () => {
            const response = await axios(`${import.meta.env.VITE_API_URL}/users/${user?.email}`);
            return response.data;
        },
    });
    const { userHasSubscription, role } = userData || {};
    if (isLoading) return <LoadingSpinner />;

    const close = () => setIsOpen(false);

    const linkClass = ({ isActive }) =>
        `block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            isActive
                ? "text-orange-500 bg-orange-500/10"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5"
        }`;

    return (
        <div className="sticky top-0 z-50 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-b border-gray-200 dark:border-white/[0.08]">
            <div className="max-w-screen-xl mx-auto px-4 lg:px-6 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex flex-col leading-tight group">
                        <span className="font-rye text-2xl font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors duration-200">
                            OpenPage
                        </span>
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 tracking-widest uppercase hidden sm:block">
                            Create · Write · Share
                        </span>
                    </Link>

                    {/* Right side */}
                    <div className="flex gap-3 items-center relative">
                        <ThemeToggle />

                        <div
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center gap-2.5 px-2.5 py-1.5 border border-gray-200 dark:border-white/10 rounded-full cursor-pointer hover:border-orange-400 hover:bg-gray-50 dark:hover:border-orange-500/50 dark:hover:bg-white/5 transition-all duration-200"
                        >
                            <AiOutlineMenu className="text-gray-500 dark:text-gray-400 text-sm" />
                            <Link to="/profile" onClick={(e) => e.stopPropagation()}>
                                <img
                                    className="w-8 h-8 object-cover rounded-full ring-2 ring-gray-100 dark:ring-white/10 hover:ring-orange-400 transition-all duration-200"
                                    referrerPolicy="no-referrer"
                                    src={user && user.photoURL ? user.photoURL : avatarImg}
                                    alt="profile"
                                />
                            </Link>
                        </div>

                        {/* Dropdown */}
                        {isOpen && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={close} />
                                <div className="absolute right-0 top-14 w-56 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl dark:shadow-black/60 overflow-hidden z-50">
                                    <div className="p-2 flex flex-col gap-0.5">
                                        <NavLink to="/" onClick={close} className={linkClass}>Home</NavLink>
                                        <NavLink to="/add-article" onClick={close} className={linkClass}>Add Article</NavLink>
                                        <NavLink to="/articles" onClick={close} className={linkClass}>Articles</NavLink>
                                        <NavLink to="/subscription" onClick={close} className={linkClass}>Subscription</NavLink>
                                        <NavLink to="/my-articles" onClick={close} className={linkClass}>My Articles</NavLink>

                                        {userHasSubscription && (
                                            <NavLink to="/premium-articles" onClick={close}
                                                className={({ isActive }) =>
                                                    `block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                                                        isActive
                                                            ? "text-amber-600 bg-amber-500/10 dark:text-amber-400"
                                                            : "text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:text-amber-300 dark:hover:text-amber-200 dark:hover:bg-amber-500/5"
                                                    }`
                                                }
                                            >★ Premium</NavLink>
                                        )}
                                        {role === "admin" && (
                                            <NavLink to="/dashboard" onClick={close} className={linkClass}>Dashboard</NavLink>
                                        )}

                                        <div className="my-1 h-px bg-gray-100 dark:bg-white/10" />

                                        {user ? (
                                            <button
                                                onClick={() => { logOut(); close(); }}
                                                className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200 cursor-pointer"
                                            >Logout</button>
                                        ) : (
                                            <>
                                                <Link to="/login" onClick={close} className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5 transition-all duration-200">
                                                    Login
                                                </Link>
                                                <Link to="/signup" onClick={close} className="block px-4 py-2.5 rounded-lg text-sm font-medium text-white bg-orange-600 hover:bg-orange-500 transition-all duration-200 text-center mt-1">
                                                    Sign Up
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
