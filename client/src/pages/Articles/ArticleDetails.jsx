import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { useEffect } from "react";
import Container from "../../components/common/Container";
import { FiEye, FiStar } from "react-icons/fi";

const ArticleDetails = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();

    const { data: article = {}, isLoading } = useQuery({
        queryKey: ["article", id],
        queryFn: async () => {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/articles/${id}`);
            return data;
        },
    });

    useEffect(() => {
        const updateViewCount = async () => {
            try {
                await axios.patch(`${import.meta.env.VITE_API_URL}/articles/${id}/view`);
                queryClient.invalidateQueries(["article", id]);
            } catch (err) {
                console.log("Failed to update view count", err);
            }
        };
        if (id) updateViewCount();
    }, [id, queryClient]);

    if (isLoading) return <LoadingSpinner />;

    const { title, image, publisher, tags, description, viewCount, isPremium, author } = article || {};

    return (
        <div className="bg-zinc-950 min-h-screen">
            <Helmet>
                <title>{title || "Article"} | OpenPage</title>
            </Helmet>

            {/* Hero image */}
            {image && (
                <div className="w-full h-56 sm:h-80 lg:h-96 overflow-hidden relative">
                    <img className="w-full h-full object-cover" src={image} alt={title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                </div>
            )}

            <Container>
                <div className="max-w-3xl mx-auto py-8 sm:py-12">
                    {/* Premium badge */}
                    {isPremium && (
                        <div className="flex items-center gap-2 mb-5 px-4 py-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl w-fit">
                            <FiStar size={14} className="text-amber-400" />
                            <p className="text-amber-300 text-sm font-medium">Premium Article</p>
                        </div>
                    )}

                    {/* Publisher */}
                    {publisher?.publisherName && (
                        <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-3">
                            {publisher.publisherName}
                        </p>
                    )}

                    {/* Title */}
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
                        {title}
                    </h1>

                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-white/[0.08]">
                        {author && (
                            <div className="flex items-center gap-2.5">
                                <img
                                    className="w-8 h-8 rounded-full ring-2 ring-white/10"
                                    referrerPolicy="no-referrer"
                                    src={author.image}
                                    alt={author.name}
                                />
                                <span className="text-gray-300 text-sm font-medium">{author.name}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                            <FiEye size={14} />
                            <span>{viewCount || 0} views</span>
                        </div>
                    </div>

                    {/* Body */}
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed custom-first-letter">
                        {description}
                    </p>

                    {/* Tags */}
                    {tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-white/[0.08]">
                            {tags.map((tag, i) => (
                                <span key={i} className="px-3 py-1.5 rounded-full bg-zinc-800 border border-zinc-700 text-gray-400 text-xs font-medium">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default ArticleDetails;
