import CountUp from "react-countup";
import axios from "axios";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../common/LoadingSpinner";
import Container from "../common/Container";
import { useQuery } from "@tanstack/react-query";

const UserStatistics = () => {
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
    const { totalUsers, normalUsers, premiumUsers } = stat || {};
    if (isLoading) return <LoadingSpinner />;

    return (
        <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                    <h2 className="text-4xl font-bold">Users</h2>
                    <CountUp
                        end={totalUsers}
                        duration={2.5}
                        className="text-3xl font-bold text-green-500"
                    />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                    <h2 className="text-4xl font-bold">Normal Users</h2>
                    <CountUp
                        end={normalUsers}
                        duration={2.5}
                        className="text-3xl font-bold text-orange-500"
                    />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                    <h2 className="text-3xl font-bold">Premium Users</h2>
                    <CountUp
                        end={premiumUsers}
                        duration={2.5}
                        className="text-4xl font-bold text-indigo-500"
                    />
                </div>
            </div>
        </Container>
    );
};

export default UserStatistics;
