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
        enabled: !!user?.email, // Only fetch if user is logged in
    });
    
    const { userHasSubscription, role } = userData || {};
    if (isLoading && user) return <LoadingSpinner />;

    const close = () => setIsOpen(false);

    // Common nav link style for desktop
    const desktopNavLink = ({ isActive }) =>
        `px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
            isActive
                ? "text-orange-500 bg-orange-50 dark:bg-orange-500/10"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5"
        }`;

    // Common nav link style for mobile dropdown
    const mobileNavLink = ({ isActive }) =>
        `block px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
            isActive
                ? "text-orange-500 bg-orange-500/10"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-white/5"
        }`;

    return (
        <div className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/[0.08] shadow-sm dark:shadow-none">
            <div className="max-w-screen-xl mx-auto px-4 lg:px-6 py-3">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link to="/" className="flex flex-col leading-tight group shrink-0">
                        <span className="font-rye text-2xl font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors duration-200">
                            OpenPage
                        </span>
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 tracking-widest uppercase hidden sm:block">
                            Create · Write · Share
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1.5">
                        <NavLink to="/" className={desktopNavLink}>Home</NavLink>
                        <NavLink to="/articles" className={desktopNavLink}>Articles</NavLink>
                        <NavLink to="/subscription" className={desktopNavLink}>Subscription</NavLink>
                        
                        {user && (
                            <>
                                <div className="w-px h-5 bg-gray-300 dark:bg-zinc-800 mx-2" />
                                <NavLink to="/add-article" className={desktopNavLink}>Write</NavLink>
                                <NavLink to="/my-articles" className={desktopNavLink}>My Articles</NavLink>
                            </>
                        )}

                        {userHasSubscription && (
                            <NavLink to="/premium-articles" 
                                className={({ isActive }) =>
                                    `px-3.5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                                        isActive
                                            ? "text-amber-600 bg-amber-50 dark:bg-amber-500/10 dark:text-amber-400"
                                            : "text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:text-amber-300 dark:hover:text-amber-200 dark:hover:bg-amber-500/5"
                                    }`
                                }
                            >
                                ★ Premium
                            </NavLink>
                        )}
                    </div>

                    {/* Right side */}
                    <div className="flex gap-3 items-center relative shrink-0">
                        <ThemeToggle />

                        <div
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center gap-2.5 px-2 py-1.5 border border-gray-200 dark:border-white/10 rounded-full cursor-pointer hover:border-orange-400 hover:bg-gray-50 dark:hover:border-orange-500/50 dark:hover:bg-white/5 transition-all duration-300 shadow-sm"
                        >
                            {/* Hamburger is visible on mobile, hidden on desktop where only the avatar might trigger the menu */}
                            <AiOutlineMenu className="text-gray-500 dark:text-gray-400 text-sm ml-1 lg:hidden" />
                            <div className="w-8 h-8 overflow-hidden rounded-full ring-2 ring-transparent hover:ring-orange-400 transition-all duration-300">
                                <img
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                    src={user && user.photoURL ? user.photoURL : avatarImg}
                                    alt="profile"
                                />
                            </div>
                        </div>

                        {/* Dropdown Menu */}
                        {isOpen && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={close} />
                                <div className="absolute right-0 top-14 w-56 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-2xl shadow-xl dark:shadow-black/60 overflow-hidden z-50">
                                    <div className="p-2 flex flex-col gap-0.5">
                                        
                                        {/* Mobile Navigation Links (Hidden on Desktop) */}
                                        <div className="lg:hidden flex flex-col gap-0.5">
                                            <NavLink to="/" onClick={close} className={mobileNavLink}>Home</NavLink>
                                            <NavLink to="/articles" onClick={close} className={mobileNavLink}>Articles</NavLink>
                                            <NavLink to="/subscription" onClick={close} className={mobileNavLink}>Subscription</NavLink>
                                            {user && (
                                                <>
                                                    <NavLink to="/add-article" onClick={close} className={mobileNavLink}>Add Article</NavLink>
                                                    <NavLink to="/my-articles" onClick={close} className={mobileNavLink}>My Articles</NavLink>
                                                </>
                                            )}
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
                                            <div className="my-1 h-px bg-gray-100 dark:bg-white/10" />
                                        </div>

                                        {/* Always visible in dropdown (Profile & Dashboard & Logout/Login) */}
                                        {role === "admin" && (
                                            <NavLink to="/dashboard" onClick={close} className={mobileNavLink}>Dashboard</NavLink>
                                        )}

                                        {user ? (
                                            <>
                                                <NavLink to="/profile" onClick={close} className={mobileNavLink}>Profile</NavLink>
                                                <button
                                                    onClick={() => { logOut(); close(); }}
                                                    className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200 cursor-pointer"
                                                >Logout</button>
                                            </>
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
