import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { GiStarShuriken } from "react-icons/gi";
import { FiArrowRight, FiLock } from "react-icons/fi";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Card = ({ article }) => {
    const { _id, title, image, publisher, tags, description, isPremium } = article;
    const navigate = useNavigate();
    const { user } = useAuth();

    const { data: userData = {} } = useQuery({
        queryKey: ["userData"],
        queryFn: async () => {
            const response = await axios(
                `${import.meta.env.VITE_API_URL}/users/${user?.email}`
            );
            return response.data;
        },
    });

    const { userHasSubscription } = userData;
    const isLocked = isPremium && !userHasSubscription;

    return (
        <div className="group col-span-1 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col hover:border-orange-500/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-900/20 transition-all duration-300">
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-zinc-800">
                <img
                    className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-500"
                    src={image}
                    alt={title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {isPremium && (
                    <div className="absolute top-2.5 right-2.5">
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
                            <GiStarShuriken size={10} /> Premium
                        </span>
                    </div>
                )}

                {isLocked && (
                    <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="flex items-center gap-1.5 text-xs text-gray-300 font-medium px-3 py-1.5 bg-zinc-800/90 rounded-full border border-zinc-700">
                            <FiLock size={11} /> Premium Only
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow p-4 gap-2.5">
                <p className="text-[11px] font-semibold text-orange-400 uppercase tracking-wider">
                    {publisher?.publisherName}
                </p>
                <h3 className="font-bold text-sm sm:text-base text-white leading-snug line-clamp-2 group-hover:text-orange-100 transition-colors duration-200">
                    {title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-2 flex-grow">
                    {description}
                </p>

                {tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-[11px] px-2 py-0.5 rounded-full bg-zinc-800 text-gray-400 border border-zinc-700">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                <button
                    disabled={isLocked}
                    onClick={() => navigate(`/articles/${_id}`)}
                    className={`mt-1 flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                        isLocked
                            ? "bg-zinc-800 text-gray-600 cursor-not-allowed"
                            : "bg-orange-600 hover:bg-orange-500 text-white hover:shadow-lg hover:shadow-orange-500/20"
                    }`}
                >
                    {isLocked ? "Subscribe to Read" : "Read Article"}
                    {!isLocked && <FiArrowRight size={14} />}
                </button>
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
        publisher: PropTypes.shape({ publisherName: PropTypes.string }),
        tags: PropTypes.arrayOf(PropTypes.string),
        isPremium: PropTypes.bool,
    }),
};

export default Card;
