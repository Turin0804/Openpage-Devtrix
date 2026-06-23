import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Card from "../../components/Card";
import Container from "../../components/common/Container";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const Articles = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const { data: articles, isLoading } = useQuery({
        queryKey: ["articles", searchTerm],
        queryFn: async () => {
            const response = await axios(
                `${import.meta.env.VITE_API_URL}/approved-articles?search=${searchTerm}`
            );
            return response.data;
        },
    });
    if (isLoading) return <LoadingSpinner />;

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    };

    return (
        <Container>
            <h1 className="text-4xl font-grenze font-bold text-center mb-8">
                OpenPage
            </h1>
            <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-1/2 py-2 px-4 border border-orange-600 rounded"
            />
            {articles && articles.length > 0 ? (
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
    );
};

export default Articles;
