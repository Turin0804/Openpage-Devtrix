import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../common/LoadingSpinner";
import Container from "../common/Container";
import Card from "../Card";
import axios from "axios";
import { Link } from "react-router-dom";

const LatestArticles = () => {
    const { data: articles, isLoading } = useQuery({
        queryKey: ["articles"],
        queryFn: async () => {
            const response = await axios(`${import.meta.env.VITE_API_URL}/latest-articles`);
            return response.data;
        },
    });
    if (isLoading) return <LoadingSpinner />;

    return (
        <section className="bg-white dark:bg-zinc-950 py-16 sm:py-20 relative">
            <Container>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4">
                    <div>
                        <p className="text-orange-500 dark:text-orange-400 text-xs font-semibold uppercase tracking-widest mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                            Fresh off the press
                        </p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight">Latest Articles</h2>
                    </div>
                    <div className="h-px md:h-12 w-full md:w-px bg-gradient-to-r md:bg-gradient-to-b from-transparent via-orange-500/50 to-transparent hidden sm:block" />
                    <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs font-medium">Discover our most recent stories, insights, and expert analysis.</p>
                </div>

                {articles && articles.length > 0 ? (
                    <div className="space-y-10 sm:space-y-16">
                        {/* Featured First Article */}
                        {articles[0] && (
                            <div className="group relative bg-gray-50 dark:bg-zinc-900 rounded-3xl overflow-hidden border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-2xl hover:shadow-orange-900/20 transition-all duration-500 flex flex-col lg:flex-row">
                                <div className="lg:w-3/5 relative aspect-video lg:aspect-auto lg:min-h-[400px] overflow-hidden">
                                    <img
                                        src={articles[0].image}
                                        alt={articles[0].title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                                            Featured
                                        </span>
                                    </div>
                                </div>
                                <div className="lg:w-2/5 p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-4">
                                        {articles[0].publisher && (
                                            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">
                                                {articles[0].publisher.publisherName}
                                            </span>
                                        )}
                                        <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-zinc-600"></span>
                                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Just now</span>
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-[1.2] mb-4 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                                        {articles[0].title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed line-clamp-3 mb-8">
                                        {articles[0].description}
                                    </p>
                                    <div className="mt-auto">
                                        <Link
                                            to={`/articles/${articles[0]._id}`}
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20"
                                        >
                                            Read Featured Article
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                                {/* Hidden absolute overlay to make the whole area clickable if we want, but Card handles the click */}
                            </div>
                        )}

                        {/* Remaining Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                            {articles.slice(1).map((article) => (
                                <Card key={article._id} article={article} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-24 bg-gray-50 dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 border-dashed">
                        <div className="w-20 h-20 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                            <span className="text-4xl">📰</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Articles Yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">Check back later for fresh stories and expert insights.</p>
                    </div>
                )}
            </Container>
        </section>
    );
};

export default LatestArticles;
