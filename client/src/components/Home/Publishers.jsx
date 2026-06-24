import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../common/LoadingSpinner";
import Container from "../common/Container";
import Marquee from "react-fast-marquee";

const Publishers = () => {
    const { data: publishers, isLoading } = useQuery({
        queryKey: ["publishers"],
        queryFn: async () => {
            const response = await axios(`${import.meta.env.VITE_API_URL}/publishers`);
            return response.data;
        },
    });
    if (isLoading) return <LoadingSpinner />;

    return (
        <section className="bg-gray-50 dark:bg-zinc-900 border-y border-gray-200 dark:border-white/[0.06] py-16 sm:py-20">
            <Container>
                <div className="text-center mb-10 sm:mb-14">
                    <p className="text-orange-500 dark:text-orange-400 text-xs font-semibold uppercase tracking-widest mb-3">Trusted sources</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Our Publishers</h2>
                    <div className="mt-4 h-px w-16 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto" />
                </div>
            </Container>

            <Marquee pauseOnHover speed={40} gradient={false}>
                <div className="flex gap-5 px-3">
                    {publishers?.map((publisher) => (
                        <div key={publisher._id}
                            className="group bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl overflow-hidden w-56 flex-shrink-0 hover:border-orange-300 dark:hover:border-orange-500/40 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-orange-900/20 transition-all duration-300"
                        >
                            <div className="bg-gray-50 dark:bg-zinc-700/40 h-32 flex items-center justify-center overflow-hidden">
                                <img className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                                    src={publisher.logo} alt={publisher.publisherName} />
                            </div>
                            <div className="p-4">
                                <h3 className="text-gray-900 dark:text-white font-semibold text-sm truncate">{publisher.publisherName}</h3>
                                {publisher.description && (
                                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 line-clamp-2">{publisher.description}</p>
                                )}
                                <div className="flex items-center justify-between mt-3">
                                    {publisher.website && (
                                        <a href={publisher.website} target="_blank" rel="noopener noreferrer"
                                            className="text-orange-500 dark:text-orange-400 text-xs hover:text-orange-600 dark:hover:text-orange-300 transition-colors duration-200 font-medium">
                                            Visit ↗
                                        </a>
                                    )}
                                    {publisher.articlesCount !== undefined && (
                                        <span className="text-gray-400 dark:text-gray-600 text-xs">{publisher.articlesCount} articles</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Marquee>
        </section>
    );
};

export default Publishers;
