import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../common/LoadingSpinner";

const Slider = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const { data: articles = {}, isLoading } = useQuery({
        queryKey: ["articles"],
        queryFn: async () => {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/trending-articles`
            );
            return response.data;
        },
    });
    // console.log(articles);
    if (isLoading) return <LoadingSpinner />;

    const truncateDescription = (description) => {
        const words = description.split(" ");
        return words.length > 10
            ? words.slice(0, 20).join(" ") + "..."
            : description;
    };

    return (
        <div className="relative w-full max-w-screen-2xl mx-auto pb-8 pt-4">
            {/* Main Slider */}
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                    "--swiper-navigation-size": "24px",
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="w-full h-[60vh] md:h-[75vh] lg:h-[80vh] rounded-none sm:rounded-3xl overflow-hidden shadow-2xl"
            >
                {articles.map((article) => (
                    <SwiperSlide key={article._id} className="relative group">
                        {/* Background Image */}
                        <div className="absolute inset-0 w-full h-full">
                            <img
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                                src={article.image}
                                alt={article.title}
                            />
                        </div>

                        {/* Premium Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>

                        {/* Content Container */}
                        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12 lg:p-20 text-left">
                            <div className="max-w-4xl space-y-4 sm:space-y-6">
                                {/* Badge */}
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-600/90 backdrop-blur-sm border border-orange-500/50">
                                    <span className="flex h-2 w-2 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                                    </span>
                                    <span className="text-white text-xs font-bold uppercase tracking-wider">
                                        Trending Now
                                    </span>
                                </div>

                                {/* Title */}
                                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight drop-shadow-md">
                                    {article.title}
                                </h2>

                                {/* Description */}
                                <p className="text-base sm:text-lg lg:text-xl text-gray-200 line-clamp-2 sm:line-clamp-3 leading-relaxed max-w-3xl drop-shadow-sm font-medium">
                                    {article.description}
                                </p>

                                {/* CTA Button */}
                                <div className="pt-2">
                                    <button className="px-6 py-3 sm:px-8 sm:py-4 bg-white text-gray-900 hover:bg-orange-50 hover:text-orange-600 rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center gap-2 group/btn">
                                        Read Full Article
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Thumbnail Slider */}
            <div className="hidden sm:block mt-4 sm:mt-6 px-4 sm:px-0">
                <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={12}
                    slidesPerView={3}
                    breakpoints={{
                        640: { slidesPerView: 4, spaceBetween: 16 },
                        1024: { slidesPerView: 5, spaceBetween: 20 },
                    }}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="thumbs-slider w-full h-[100px] sm:h-[120px]"
                >
                    {articles.map((article) => (
                        <SwiperSlide key={article._id} className="cursor-pointer rounded-xl overflow-hidden relative group opacity-60 hover:opacity-100 transition-opacity duration-300 [&.swiper-slide-thumb-active]:opacity-100 [&.swiper-slide-thumb-active]:ring-2 [&.swiper-slide-thumb-active]:ring-orange-500 [&.swiper-slide-thumb-active]:ring-offset-2 [&.swiper-slide-thumb-active]:ring-offset-white dark:[&.swiper-slide-thumb-active]:ring-offset-zinc-950">
                            <img
                                className="w-full h-full object-cover"
                                src={article.image}
                                alt={article.title}
                            />
                            {/* Dark overlay for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                                <h2 className="text-white text-xs sm:text-sm font-semibold line-clamp-2 leading-tight">
                                    {article.title}
                                </h2>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Slider;
