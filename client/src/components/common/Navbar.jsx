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
            const response = await axios(
                `${import.meta.env.VITE_API_URL}/users/${user?.email}`
            );
            return response.data;
        },
    });

    const { userHasSubscription, role } = userData || {};
    if (isLoading) return <LoadingSpinner />;

    const close = () => setIsOpen(false);

    const linkClass = ({ isActive }) =>
        `block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            isActive
                ? "text-orange-400 bg-orange-500/10"
                : "text-gray-300 hover:text-white hover:bg-white/5"
        }`;

    return (
        <div className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-xl border-b border-white/[0.08]">
            <div className="max-w-screen-xl mx-auto px-4 lg:px-6 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex flex-col leading-tight group">
                        <span className="font-rye text-2xl font-bold text-white group-hover:text-orange-400 transition-colors duration-200">
                            OpenPage
                        </span>
                        <span className="text-[10px] text-gray-500 tracking-widest uppercase hidden sm:block">
                            Create · Write · Share
                        </span>
                    </Link>

                    {/* Right side */}
                    <div className="flex gap-3 items-center relative">
                        <ThemeToggle />

                        {/* Avatar + Hamburger */}
                        <div
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center gap-2.5 px-2.5 py-1.5 border border-white/10 rounded-full cursor-pointer hover:border-orange-500/50 hover:bg-white/5 transition-all duration-200"
                        >
                            <AiOutlineMenu className="text-gray-400 text-sm" />
                            <Link to="/profile" onClick={(e) => e.stopPropagation()}>
                                <img
                                    className="w-8 h-8 object-cover rounded-full ring-2 ring-white/10 hover:ring-orange-500/50 transition-all duration-200"
                                    referrerPolicy="no-referrer"
                                    src={user && user.photoURL ? user.photoURL : avatarImg}
                                    alt="profile"
                                />
                            </Link>
                        </div>

                        {/* Dropdown */}
                        {isOpen && (
                            <>
                                {/* Overlay to close */}
                                <div className="fixed inset-0 z-40" onClick={close} />
                                <div className="absolute right-0 top-14 w-56 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden z-50">
                                    <div className="p-2 flex flex-col gap-0.5">
                                        <NavLink to="/" onClick={close} className={linkClass}>Home</NavLink>
                                        <NavLink to="/add-article" onClick={close} className={linkClass}>Add Article</NavLink>
                                        <NavLink to="/articles" onClick={close} className={linkClass}>Articles</NavLink>
                                        <NavLink to="/subscription" onClick={close} className={linkClass}>Subscription</NavLink>
                                        <NavLink to="/my-articles" onClick={close} className={linkClass}>My Articles</NavLink>

                                        {userHasSubscription && (
                                            <NavLink
                                                to="/premium-articles"
                                                onClick={close}
                                                className={({ isActive }) =>
                                                    `block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                                                        isActive
                                                            ? "text-amber-400 bg-amber-500/10"
                                                            : "text-amber-300 hover:text-amber-200 hover:bg-amber-500/5"
                                                    }`
                                                }
                                            >
                                                ★ Premium
                                            </NavLink>
                                        )}

                                        {role === "admin" && (
                                            <NavLink to="/dashboard" onClick={close} className={linkClass}>Dashboard</NavLink>
                                        )}

                                        <div className="my-1 h-px bg-white/10" />

                                        {user ? (
                                            <button
                                                onClick={() => { logOut(); close(); }}
                                                className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 cursor-pointer"
                                            >
                                                Logout
                                            </button>
                                        ) : (
                                            <>
                                                <Link to="/login" onClick={close} className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200">
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
