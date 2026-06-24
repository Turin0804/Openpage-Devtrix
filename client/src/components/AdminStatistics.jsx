import { FaUserAlt, FaDollarSign } from "react-icons/fa";
import { CgOrganisation } from "react-icons/cg";
import { RiArticleFill } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "./common/LoadingSpinner";

const AdminStatistics = () => {
    const { data: stat = {}, isLoading } = useQuery({
        queryKey: ["stat"],
        queryFn: async () => {
            const response = await axios(
                `${import.meta.env.VITE_API_URL}/users-stat`
            );
            return response.data;
        },
    });
    const { totalUsers } = stat || {};
    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="mt-12 text-gray-800 dark:text-gray-200 transition-colors duration-200">
            {/* small cards */}
            <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-grow">
                {/* Sales Card */}
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white dark:bg-zinc-900 border border-transparent dark:border-white/[0.08] text-gray-700 dark:text-gray-300 shadow-sm dark:shadow-none transition-colors">
                    <div
                        className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-orange-600 to-orange-400 text-white shadow-orange-500/40`}
                    >
                        <FaDollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div className="p-4 text-right">
                        <p className="block antialiased font-sans text-sm leading-normal font-medium text-gray-500 dark:text-gray-400">
                            Total Revenue
                        </p>
                        <h4 className="block antialiased tracking-normal font-sans text-2xl font-bold leading-snug text-gray-900 dark:text-white">
                            $155
                        </h4>
                    </div>
                </div>
                {/* Total Publishers */}
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white dark:bg-zinc-900 border border-transparent dark:border-white/[0.08] text-gray-700 dark:text-gray-300 shadow-sm dark:shadow-none transition-colors">
                    <div
                        className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40`}
                    >
                        <CgOrganisation className="w-6 h-6 text-white" />
                    </div>
                    <div className="p-4 text-right">
                        <p className="block antialiased font-sans text-sm leading-normal font-medium text-gray-500 dark:text-gray-400">
                            Total Publishers
                        </p>
                        <h4 className="block antialiased tracking-normal font-sans text-2xl font-bold leading-snug text-gray-900 dark:text-white">
                            13
                        </h4>
                    </div>
                </div>
                {/* Total Articles */}
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white dark:bg-zinc-900 border border-transparent dark:border-white/[0.08] text-gray-700 dark:text-gray-300 shadow-sm dark:shadow-none transition-colors">
                    <div
                        className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-pink-600 to-pink-400 text-white shadow-pink-500/40`}
                    >
                        <RiArticleFill className="w-6 h-6 text-white" />
                    </div>
                    <div className="p-4 text-right">
                        <p className="block antialiased font-sans text-sm leading-normal font-medium text-gray-500 dark:text-gray-400">
                            Total Articles
                        </p>
                        <h4 className="block antialiased tracking-normal font-sans text-2xl font-bold leading-snug text-gray-900 dark:text-white">
                            120
                        </h4>
                    </div>
                </div>
                {/* Users Card */}
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white dark:bg-zinc-900 border border-transparent dark:border-white/[0.08] text-gray-700 dark:text-gray-300 shadow-sm dark:shadow-none transition-colors">
                    <div
                        className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-orange-600 to-orange-400 text-white shadow-orange-500/40`}
                    >
                        <FaUserAlt className="w-6 h-6 text-white" />
                    </div>
                    <div className="p-4 text-right">
                        <p className="block antialiased font-sans text-sm leading-normal font-medium text-gray-500 dark:text-gray-400">
                            Total User
                        </p>
                        <h4 className="block antialiased tracking-normal font-sans text-2xl font-bold leading-snug text-gray-900 dark:text-white">
                            {totalUsers}
                        </h4>
                    </div>
                </div>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {/*Sales Bar Chart */}
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white dark:bg-zinc-900 border border-transparent dark:border-white/[0.08] text-gray-700 dark:text-gray-300 shadow-sm dark:shadow-none overflow-hidden xl:col-span-2 transition-colors">
                    {/* Chart goes here.. */}
                </div>
            </div>
        </div>
    );
};

export default AdminStatistics;
