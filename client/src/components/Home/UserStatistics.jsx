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
            const response = await axios(${import.meta.env.VITE_API_URL}/users-stat);
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
        <section className="bg-white dark:bg-zinc-950 py-16 sm:py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-zinc-800 to-transparent"></div>
            
            <Container className="relative z-10">
                <div className="text-center mb-16 sm:mb-20">
                    <p className="text-orange-500 dark:text-orange-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">Community</p>
                    <h2 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">Our Growing Network</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-zinc-800/50">
                    {cards.map(({ label, value, Icon, num, icon }, index) => (
                        <div key={label} className="relative flex flex-col items-center text-center pt-8 md:pt-0 group px-4">
                            {/* Hover glow effect behind the icon */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-current opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-[0.05] rounded-full blur-2xl transition-opacity duration-500 pointer-events-none" style={{ color: index === 0 ? '#ea580c' : index === 1 ? '#0284c7' : '#d97706' }}></div>

                            <div className={w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-white/50 dark:border-white/5 ${icon} group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500}>
                                <Icon size={28} />
                            </div>
                            
                            <div className="flex-grow">
                                <CountUp end={value || 0} duration={3} className={text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter ${num} drop-shadow-sm} />
                            </div>
                            
                            <div className="mt-4">
                                <p className="text-gray-500 dark:text-zinc-400 text-sm sm:text-base font-bold uppercase tracking-widest">{label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
            
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-zinc-800 to-transparent mt-16"></div>
        </section>
    );
};

export default UserStatistics;