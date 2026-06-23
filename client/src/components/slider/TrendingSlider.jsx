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
        <>
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2 w-full h-[70vh]"
            >
                {articles.map((article) => (
                    <SwiperSlide key={article._id}>
                        <img
                            className="w-full h-full object-cover"
                            src={article.image}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
                            <h2 className="text-4xl font-bold text-center">
                                {article.title}
                            </h2>
                            <p className="text-lg mt-2 w-9/12 text-center">
                                {truncateDescription(article.description)}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper w-full h-[10vh] mt-4"
            >
                {articles.map((article) => (
                    <SwiperSlide key={article._id}>
                        <img
                            className="w-full h-full object-cover"
                            src={article.image}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
                            <h2 className="text-lg font-semibold">
                                {article.title}
                            </h2>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default Slider;
