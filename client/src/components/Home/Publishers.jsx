import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../common/LoadingSpinner";
import Container from "../common/Container";
import Marquee from "react-fast-marquee";

const Publishers = () => {
    const { data: publishers, isLoading } = useQuery({
        queryKey: ["publishers"],
        queryFn: async () => {
            const response = await axios(
                `${import.meta.env.VITE_API_URL}/publishers`
            );
            return response.data;
        },
    });
    if (isLoading) return <LoadingSpinner />;

    return (
        <Container>
            <h1 className="text-4xl font-bold text-center mb-8">Publishers</h1>
            <Marquee pauseOnHover={true} className="space-x-10">
                <div className="mt-12 flex gap-6">
                    {publishers.map((publisher) => (
                        <div
                            key={publisher._id}
                            className="bg-white shadow-lg rounded-md overflow-hidden"
                        >
                            <img
                                className="w-60 h-48 object-contain"
                                src={publisher.logo}
                                alt={publisher.publisherName}
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-bold mb-2">
                                    {publisher.publisherName}
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    {publisher.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <a
                                        href={publisher.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-600 hover:text-indigo-800"
                                    >
                                        Visit Website
                                    </a>
                                    <span className="text-gray-500 text-sm">
                                        {publisher.articlesCount} articles
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Marquee>
        </Container>
    );
};

export default Publishers;
