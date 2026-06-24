import CountUp from "react-countup";
import axios from "axios";
import LoadingSpinner from "../common/LoadingSpinner";
import Container from "../common/Container";
import { useQuery } from "@tanstack/react-query";
import { FiUsers, FiUser, FiStar } from "react-icons/fi";

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

    const cards = [
        { label: "Total Users",     value: totalUsers,   Icon: FiUsers, light: "border-orange-200 bg-orange-50", dark: "dark:border-orange-500/20 dark:bg-zinc-900", num: "text-orange-600 dark:text-orange-400", icon: "text-orange-500 dark:text-orange-400 bg-orange-100 dark:bg-orange-500/10" },
        { label: "Regular Users",   value: normalUsers,  Icon: FiUser,  light: "border-sky-200 bg-sky-50",    dark: "dark:border-sky-500/20 dark:bg-zinc-900",    num: "text-sky-600 dark:text-sky-400",    icon: "text-sky-500 dark:text-sky-400 bg-sky-100 dark:bg-sky-500/10" },
        { label: "Premium Members", value: premiumUsers, Icon: FiStar,  light: "border-amber-200 bg-amber-50", dark: "dark:border-amber-500/20 dark:bg-zinc-900", num: "text-amber-600 dark:text-amber-400", icon: "text-amber-500 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/10" },
    ];

    return (
        <section className="bg-white dark:bg-zinc-950 py-16 sm:py-20">
            <Container>
                <div className="text-center mb-10 sm:mb-14">
                    <p className="text-orange-500 dark:text-orange-400 text-xs font-semibold uppercase tracking-widest mb-3">Community</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Our Growing Community</h2>
                    <div className="mt-4 h-px w-16 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
                    {cards.map(({ label, value, Icon, light, dark, num, icon }) => (
                        <div key={label} className={`border rounded-2xl p-6 sm:p-8 text-center flex flex-col items-center gap-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${light} ${dark}`}>
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${icon}`}>
                                <Icon size={22} />
                            </div>
                            <div>
                                <CountUp end={value || 0} duration={2.5} className={`text-4xl sm:text-5xl font-bold ${num}`} />
                                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mt-1">{label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default UserStatistics;
