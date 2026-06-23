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
    // console.log("stat", stat);
    const { totalUsers } = stat || {};
    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="mt-12">
            {/* small cards */}
            <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 flex-grow">
                {/* Sales Card */}
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                    <div
                        className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-orange-600 to-orange-400 text-white shadow-orange-500/40`}
                    >
                        <FaDollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div className="p-4 text-right">
                        <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                            Total Revenue
                        </p>
                        <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                            $155
                        </h4>
                    </div>
                </div>
                {/* Total Publishers */}
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                    <div
                        className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40`}
                    >
                        <CgOrganisation className="w-6 h-6 text-white" />
                    </div>
                    <div className="p-4 text-right">
                        <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                            Total Publishers
                        </p>
                        <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                            13
                        </h4>
                    </div>
                </div>
                {/* Total Articles */}
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                    <div
                        className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-pink-600 to-pink-400 text-white shadow-pink-500/40`}
                    >
                        <RiArticleFill className="w-6 h-6 text-white" />
                    </div>
                    <div className="p-4 text-right">
                        <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                            Total Articles
                        </p>
                        <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                            120
                        </h4>
                    </div>
                </div>
                {/* Users Card */}
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                    <div
                        className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-indigo-600 to-indigo-400 text-white shadow-indigo-500/40`}
                    >
                        <FaUserAlt className="w-6 h-6 text-white" />
                    </div>
                    <div className="p-4 text-right">
                        <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
                            Total User
                        </p>
                        <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
                            {totalUsers}
                        </h4>
                    </div>
                </div>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {/*Sales Bar Chart */}
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2">
                    {/* Chart goes here.. */}
                </div>
            </div>
        </div>
    );
};

export default AdminStatistics;
