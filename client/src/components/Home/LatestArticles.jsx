import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../common/LoadingSpinner";
import Container from "../common/Container";
import Card from "../Card";
import axios from "axios";

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
        <section className="bg-zinc-950 py-16 sm:py-20">
            <Container>
                {/* Section header */}
                <div className="text-center mb-10 sm:mb-14">
                    <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-3">Fresh off the press</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white">Latest Articles</h2>
                    <div className="mt-4 h-px w-16 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto" />
                </div>

                {articles && articles.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                        {articles.map((article) => (
                            <Card key={article._id} article={article} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-600 py-20">
                        <p className="text-5xl mb-4">📰</p>
                        <p className="text-lg font-medium text-gray-500">No articles yet</p>
                    </div>
                )}
            </Container>
        </section>
    );
};

export default LatestArticles;
