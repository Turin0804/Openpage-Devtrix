import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { useEffect } from "react";
import Container from "../../components/common/Container";
import Heading from "../../components/common/Heading";

const ArticleDetails = () => {
    const { id } = useParams();
    // console.log(id);
    const queryClient = useQueryClient();

    const { data: article = {}, isLoading } = useQuery({
        queryKey: ["article", id],
        queryFn: async () => {
            const { data } = await axios(
                `${import.meta.env.VITE_API_URL}/articles/${id}`
            );
            return data;
        },
    });
    // console.log(article);

    useEffect(() => {
        const updateViewCount = async () => {
            try {
                await axios.patch(
                    `${import.meta.env.VITE_API_URL}/articles/${id}/view`
                );
                queryClient.invalidateQueries(["article", id]);
            } catch (err) {
                console.log("Failed to update view count", err);
            }
        };

        if (id) {
            updateViewCount();
        }
    }, [id, queryClient]);

    if (isLoading) return <LoadingSpinner />;

    const {
        title,
        image,
        publisher,
        tags,
        description,
        viewCount,
        isPremium,
        author,
    } = article || {};
    // console.log(article);
    // console.log(publisher.publisherName);

    return (
        <>
            <Helmet>
                <title>{title} | OpenPage</title>
            </Helmet>

            <Container>
                <div className="w-full gap-12">
                    <div className="flex justify-between items-center">
                        <Heading
                            title={title}
                            subtitle={`Publisher: ${publisher.publisherName}`}
                        />
                        <p>Views: {viewCount}</p>
                    </div>
                    {isPremium && (
                        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 my-4">
                            <p className="font-semibold">Premium Article</p>
                            <p>
                                This is a premium article. You need to subscribe
                                to view this article.
                            </p>
                        </div>
                    )}
                    {/* Image */}
                    <div className="w-full h-72 overflow-hidden rounded-md my-8">
                        <img
                            className="object-cover w-full h-full"
                            src={image}
                            alt={title}
                        />
                    </div>

                    <div className="md:gap-10 flex-1">
                        {/* article Info */}
                        <p className="text-lg font-light text-neutral-500  custom-first-letter custom-first-line">
                            {description}
                        </p>
                        <hr className="my-6" />

                        <div className="flex flex-row items-center gap-2">
                            <h4 className="text-xl font-semibold ">
                                Article Writter: {author?.name}
                            </h4>
                            <img
                                className="rounded-full w-10 h-10"
                                alt="Avatar"
                                referrerPolicy="no-referrer"
                                src={author?.image}
                            />
                        </div>
                        <hr className="my-6" />
                        <div className="font-semibold text-lg gap-4 text-neutral-500">
                            {tags.map((tag, index) => (
                                <span key={index} className="mr-2">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default ArticleDetails;
