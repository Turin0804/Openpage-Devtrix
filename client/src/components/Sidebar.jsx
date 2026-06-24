import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";

import { Link } from "react-router-dom";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";

const Sidebar = () => {
    const { logOut } = useAuth();
    const [role, isLoading] = useRole();
    const [isActive, setActive] = useState(false);

    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive);
    };

    return (
        <>
            {/* Small Screen Navbar */}
            <div className="bg-gray-100 dark:bg-zinc-900 text-gray-800 dark:text-gray-200 flex justify-between md:hidden border-b border-gray-200 dark:border-white/[0.08]">
                <div className="block cursor-pointer p-4 font-bold">
                    <Link to="/" className="font-rye text-2xl text-gray-900 dark:text-white">
                        OpenPage
                    </Link>
                </div>

                <button
                    onClick={handleToggle}
                    className="mobile-menu-button p-4 focus:outline-none hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors"
                >
                    <AiOutlineBars className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`z-20 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 dark:bg-zinc-900 border-r border-gray-200 dark:border-white/[0.08] w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && "-translate-x-full"
                    }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>
                    <div className="w-full hidden md:flex px-4 py-3 shadow-sm dark:shadow-none border border-orange-200 dark:border-orange-500/20 rounded-xl justify-center items-center bg-orange-50 dark:bg-orange-500/10 mx-auto">
                        <Link to="/" className="font-rye text-2xl text-orange-600 dark:text-orange-400">
                            OpenPage
                        </Link>
                    </div>

                    {/* Nav Items */}
                    <div className="flex flex-col justify-between flex-1 mt-6">
                        <nav>
                            {/*  Menu Items */}
                            {role === "admin" && <AdminMenu />}
                        </nav>
                    </div>
                </div>

                <div>
                    <hr className="border-gray-200 dark:border-white/[0.08] mb-4" />

                    <MenuItem
                        icon={FcSettings}
                        label="Profile"
                        address="/profile"
                    />
                    <button
                        onClick={logOut}
                        className="flex w-full items-center px-4 py-2 mt-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors duration-200"
                    >
                        <GrLogout className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        <span className="mx-4 font-medium">Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
