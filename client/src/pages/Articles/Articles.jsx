import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Card from "../../components/Card";
import Container from "../../components/common/Container";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import { FiSearch } from "react-icons/fi";

const Articles = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const { data: articles, isLoading } = useQuery({
        queryKey: ["articles", searchTerm],
        queryFn: async () => {
            const response = await axios(`${import.meta.env.VITE_API_URL}/approved-articles?search=${searchTerm}`);
            return response.data;
        },
    });
    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen">
            <Helmet>
                <title>Articles | OpenPage</title>
            </Helmet>

            <div className="bg-gray-50 dark:bg-zinc-900 border-b border-gray-200 dark:border-white/[0.06] py-10 sm:py-14">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 text-center">
                    <p className="text-orange-500 dark:text-orange-400 text-xs font-semibold uppercase tracking-widest mb-3">Browse</p>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">All Articles</h1>
                    <div className="relative max-w-md mx-auto">
                        <FiSearch size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                        <input
                            type="text" placeholder="Search articles by title…"
                            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-xl text-gray-900 dark:text-white text-sm placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-orange-400 dark:focus:border-orange-500/60 focus:ring-1 focus:ring-orange-300 dark:focus:ring-orange-500/30 transition-all duration-200"
                        />
                    </div>
                </div>
            </div>

            <Container>
                <div className="py-10 sm:py-14">
                    {articles && articles.length > 0 ? (
                        <>
                            <p className="text-gray-400 dark:text-gray-500 text-sm mb-6">{articles.length} article{articles.length !== 1 ? "s" : ""} found</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                                {articles.map((article) => (<Card key={article._id} article={article} />))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-5xl mb-4">🔍</p>
                            <p className="text-gray-700 dark:text-gray-400 text-lg font-medium">No articles found</p>
                            <p className="text-gray-400 dark:text-gray-600 text-sm mt-2">Try a different search term</p>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default Articles;
