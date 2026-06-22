// import Container from "../Container";
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
    // console.log(userData);
    const { userHasSubscription, role } = userData || {};
    // console.log("userHasSubscription", userHasSubscription);
    // console.log("role", role);
    if (isLoading) return <LoadingSpinner />;

    const links = (
        <>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `tab hover:underline ${isActive ? "text-primary" : ""}`
                }
            >
                Home
            </NavLink>
            <NavLink
                to="/add-article"
                className={({ isActive }) =>
                    `tab hover:underline ${isActive ? "text-primary" : ""}`
                }
            >
                Add Article
            </NavLink>
            <NavLink
                to="/articles"
                className={({ isActive }) =>
                    `tab hover:underline ${isActive ? "text-primary" : ""}`
                }
            >
                Articles
            </NavLink>
            <NavLink
                to="/subscription"
                className={({ isActive }) =>
                    `tab hover:underline ${isActive ? "text-primary" : ""}`
                }
            >
                Subscription
            </NavLink>
            <NavLink
                to="/my-articles"
                className={({ isActive }) =>
                    `tab hover:underline ${isActive ? "text-primary" : ""}`
                }
            >
                My Articles
            </NavLink>
            {userHasSubscription ? (
                <NavLink
                    to="/premium-articles"
                    className={({ isActive }) =>
                        `tab hover:underline ${isActive ? "text-primary" : ""}`
                    }
                >
                    Premium Articles
                </NavLink>
            ) : (
                ""
            )}
            {role === "admin" ? (
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `tab hover:underline ${isActive ? "text-primary" : ""}`
                    }
                >
                    Dashboard
                </NavLink>
            ) : (
                ""
            )}
        </>
    );

    return (
        <div className="sticky top-0 z-50 backdrop-blur-md bg-white/45 border-b-2">
            <div className="max-w-screen-xl mx-auto px-4 lg:px-0 py-4">
                <div className="flex flex-row  items-center justify-between gap-3 md:gap-0">
                    {/* Logo */}
                    <div>
                        <Link to="/" className="font-grenze text-3xl font-bold">
                            InsightArc
                        </Link>
                        <p className="text-xs">
                            Your Arc of Knowledge and Insight
                        </p>
                    </div>

                    {/* <div className="hidden md:flex flex-row gap-3 font-semibold">{links}</div> */}
                    {/* Dropdown Menu */}
                    <div className="flex gap-2 items-center relative">
                        {/* Theme Toggle */}
                        <ThemeToggle />

                        <div className="flex flex-row items-center gap-3">
                            {/* Dropdown btn */}
                            <div
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                            >
                                <AiOutlineMenu />
                                <div className="">
                                    {/* Avatar */}
                                    <Link to="/profile">
                                        <img
                                            className="w-10 h-10 object-cover rounded-full"
                                            referrerPolicy="no-referrer"
                                            src={
                                                user && user.photoURL
                                                    ? user.photoURL
                                                    : avatarImg
                                            }
                                            alt="profile"
                                            height="30"
                                            width="30"
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {isOpen && (
                            <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] overflow-hidden bg-white/80 right-0 top-12 text-sm z-10">
                                <div className="relative flex flex-col cursor-pointer">
                                    <div className="flex flex-col space-y-3 font-semibold">
                                        {links}
                                    </div>

                                    {/* <Link
                                        to="/"
                                        className="block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                                    >
                                        Home
                                    </Link> */}

                                    {user ? (
                                        <>
                                            <button
                                                onClick={logOut}
                                                className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                                            >
                                                Logout
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to="/login"
                                                className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                                            >
                                                Login
                                            </Link>
                                            <Link
                                                to="/signup"
                                                className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                                            >
                                                Sign Up
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
