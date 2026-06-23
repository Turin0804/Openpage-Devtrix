import CountUp from "react-countup";
import axios from "axios";
import LoadingSpinner from "../common/LoadingSpinner";
import Container from "../common/Container";
import { useQuery } from "@tanstack/react-query";
import { FiUsers, FiUser, FiStar } from "react-icons/fi";

const stats = (totalUsers, normalUsers, premiumUsers) => [
    { label: "Total Users", value: totalUsers, icon: FiUsers, color: "orange" },
    { label: "Regular Users", value: normalUsers, icon: FiUser, color: "sky" },
    { label: "Premium Members", value: premiumUsers, icon: FiStar, color: "amber" },
];

const UserStatistics = () => {
    const { data: stat = {}, isLoading } = useQuery({
        queryKey: ["stat"],
        queryFn: async () => {
            const response = await axios(`${import.meta.env.VITE_API_URL}/users-stat`);
            return response.data;
        },
    });
    const { totalUsers, normalUsers, premiumUsers } = stat || {};
    if (isLoading) return <LoadingSpinner />;

    const colorMap = {
        orange: { ring: "border-orange-500/20", icon: "text-orange-400 bg-orange-500/10", num: "text-orange-400" },
        sky: { ring: "border-sky-500/20", icon: "text-sky-400 bg-sky-500/10", num: "text-sky-400" },
        amber: { ring: "border-amber-500/20", icon: "text-amber-400 bg-amber-500/10", num: "text-amber-400" },
    };

    return (
        <section className="bg-zinc-950 py-16 sm:py-20">
            <Container>
                <div className="text-center mb-10 sm:mb-14">
                    <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-3">Community</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white">Our Growing Community</h2>
                    <div className="mt-4 h-px w-16 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
                    {stats(totalUsers, normalUsers, premiumUsers).map(({ label, value, icon: Icon, color }) => {
                        const c = colorMap[color];
                        return (
                            <div key={label} className={`bg-zinc-900 border ${c.ring} rounded-2xl p-6 sm:p-8 text-center flex flex-col items-center gap-4 hover:-translate-y-1 hover:shadow-xl transition-all duration-300`}>
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${c.icon}`}>
                                    <Icon size={22} />
                                </div>
                                <div>
                                    <CountUp
                                        end={value || 0}
                                        duration={2.5}
                                        className={`text-4xl sm:text-5xl font-bold ${c.num}`}
                                    />
                                    <p className="text-gray-400 text-sm font-medium mt-1">{label}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
};

export default UserStatistics;
