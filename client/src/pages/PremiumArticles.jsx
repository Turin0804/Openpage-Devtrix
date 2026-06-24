import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Container from "../components/common/Container";
import Card from "../components/Card";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { FiStar } from "react-icons/fi";

const PremiumArticles = () => {
    const axiosSecure = useAxiosSecure();

    const { data: articles, isLoading } = useQuery({
        queryKey: ["articles"],
        queryFn: async () => {
            const response = await axiosSecure(`${import.meta.env.VITE_API_URL}/premium-articles`);
            return response.data;
        },
    });
    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen">
            <Helmet>
                <title>Premium Articles | OpenPage</title>
            </Helmet>

            <div className="bg-gray-50 dark:bg-zinc-900 border-b border-gray-200 dark:border-white/[0.06] py-10 sm:py-14">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-full mb-4">
                        <FiStar size={13} className="text-amber-500 dark:text-amber-400" />
                        <span className="text-amber-700 dark:text-amber-300 text-xs font-semibold uppercase tracking-widest">Members Only</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Premium Articles</h1>
                    <p className="text-gray-500 mt-3 text-sm max-w-sm mx-auto">Exclusive content curated for our subscribed members.</p>
                </div>
            </div>

            <Container>
                <div className="py-10 sm:py-14">
                    {articles && articles.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                            {articles.map((article) => (<Card key={article._id} article={article} />))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-5xl mb-4">⭐</p>
                            <p className="text-gray-700 dark:text-gray-400 text-lg font-medium">No premium articles yet</p>
                            <p className="text-gray-400 dark:text-gray-600 text-sm mt-2">Check back soon for exclusive content</p>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default PremiumArticles;
