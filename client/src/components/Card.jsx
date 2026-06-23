import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Button from "./common/Button";
import { GiStarShuriken } from "react-icons/gi";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Card = ({ article }) => {
    const { _id, title, image, publisher, tags, description, isPremium } =
        article;
    // console.log(article);
    const navigate = useNavigate();

    const { user } = useAuth();
    // const axiosSecure = useAxiosSecure();

    const { data: userData = {} } = useQuery({
        queryKey: ["userData"],
        queryFn: async () => {
            const response = await axios(
                `${import.meta.env.VITE_API_URL}/users/${user?.email}`
            );
            return response.data;
        },
    });
    // console.log(userData);
    const { userHasSubscription } = userData;

    return (
        <div className="col-span-1 group shadow-xl p-3 rounded-xl flex flex-col justify-between gap-2 w-full">
            <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                <img
                    className="object-cover h-full w-full group-hover:scale-110 transition"
                    src={image}
                    alt={title}
                />
                <div className="absolute top-3 right-3 text-white">
                    {isPremium && (
                        <p className="flex items-center gap-1 bg-orange-500 p-1 rounded">
                            <GiStarShuriken
                                size={20}
                                className="text-yellow-300"
                            />
                            <span className="">Premium</span>
                        </p>
                    )}
                </div>
            </div>

            <div className="flex-grow">
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="font-semibold text-md">
                    Publisher: {publisher.publisherName}
                </p>
                <p className="text-gray-700 break-words">
                    {`${description.slice(0, 50)}...`}
                </p>
                <h5 className="font-medium text-md">
                    {tags.map((tag, index) => (
                        <span key={index} className="mr-2">
                            #{tag}
                        </span>
                    ))}
                </h5>
            </div>

            <div>
                <Button
                    label={"Details"}
                    disabled={isPremium && !userHasSubscription}
                    onClick={() => navigate(`/articles/${_id}`)}
                />
            </div>
        </div>
    );
};

Card.propTypes = {
    article: PropTypes.shape({
        _id: PropTypes.string,
        title: PropTypes.string,
        image: PropTypes.string,
        description: PropTypes.string,
        publisher: PropTypes.shape({
            publisherName: PropTypes.string,
        }),
        tags: PropTypes.arrayOf(PropTypes.string),
        isPremium: PropTypes.bool,
        // userHasSubscription: PropTypes.bool,
    }),
};

export default Card;
