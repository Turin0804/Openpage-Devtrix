import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Container from "../components/common/Container";
import Card from "../components/Card";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const PremiumArticles = () => {
    const axiosSecure = useAxiosSecure();

    const { data: articles, isLoading } = useQuery({
        queryKey: ["articles"],
        queryFn: async () => {
            const response = await axiosSecure(
                `${import.meta.env.VITE_API_URL}/premium-articles`
            );
            return response.data;
        },
    });
    if (isLoading) return <LoadingSpinner />;

    return (
        <>
            <Helmet>
                <title>Premium Articles | OpenPage</title>
            </Helmet>
            <Container>
                {articles && articles.length > 0 ? (
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {articles.map((article) => (
                            <Card key={article._id} article={article} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-lg text-gray-500 mt-12">
                        No articles found
                    </div>
                )}
            </Container>
        </>
    );
};

export default PremiumArticles;
