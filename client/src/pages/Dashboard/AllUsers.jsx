import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import UserDataRow from "../../components/UserDataRow";

const AllUsers = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const {
        data: users = [],
        isLoading,
        refetch,
    } = useQuery({
        // [] is the initial value of users
        queryKey: ["users", user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/all-users/${user?.email}`);
            return data;
        },
    });

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen transition-colors duration-200">
            <div className="container mx-auto px-4 sm:px-8">
                <Helmet>
                    <title>All Users | Dashboard | OpenPage</title>
                </Helmet>

                <div className="py-8">
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow-sm dark:shadow-none border border-gray-200 dark:border-white/[0.08] rounded-xl overflow-hidden bg-white dark:bg-zinc-900 transition-colors">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        {[
                                            "Photo",
                                            "Name",
                                            "Email",
                                            "Role",
                                            "Action",
                                        ].map((head) => (
                                            <th
                                                key={head}
                                                scope="col"
                                                className="px-5 py-4 bg-gray-50 dark:bg-zinc-800/50 border-b border-gray-200 dark:border-white/[0.08] text-gray-700 dark:text-gray-300 text-left text-xs uppercase tracking-wider font-semibold"
                                            >
                                                {head}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((userData) => (
                                        <UserDataRow
                                            key={userData?._id}
                                            userData={userData}
                                            refetch={refetch}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
