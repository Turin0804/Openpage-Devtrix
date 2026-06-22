import Container from "../../components/common/Container";

const Articles = () => {
    return (
        <Container>
            <h1 className="text-4xl font-grenze font-bold text-center mb-8">
                InsightArc
            </h1>
        </Container>
    );
};

export default Articles;

import { useState } from "react";
import Container from "../../components/common/Container";

const Articles = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchTerm(e.target.value);
    };

    return (
        <Container>
            <h1 className="text-4xl font-grenze font-bold text-center mb-8">
                InsightArc
            </h1>

            <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-1/2 py-2 px-4 border border-indigo-600 rounded"
            />
        </Container>
    );
};

export default Articles;

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
                InsightArc
            </h1>

            <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-1/2 py-2 px-4 border border-indigo-600 rounded"
            />
        </Container>
    );
};

export default Articles;