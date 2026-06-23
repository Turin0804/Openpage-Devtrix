import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import TrendingSlider from "../../components/slider/TrendingSlider";
import Publishers from "../../components/Home/Publishers";
import UserStatistics from "../../components/Home/UserStatistics";
import Plans from "../../components/Home/Plans";
import LatestArticles from "../../components/Home/LatestArticles";
import Newsletter from "../../components/Home/Newsletter";
import Podcasts from "../../components/Home/Podcasts";
import TechnologyInnovation from "../../components/Home/TechnologyInnovation";

const Homepage = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowModal(true);
        }, 10000); // 10 seconds

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, []);

    const handleSubscribeClick = () => {
        navigate("/subscription");
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <Helmet>
                <title>OpenPage | Home</title>
            </Helmet>

            <TrendingSlider />
            <LatestArticles />
            <Publishers />
            <TechnologyInnovation />
            <Podcasts />
            <UserStatistics />
            <Plans />
            <Newsletter />

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center relative">
                        <h2 className="text-2xl font-bold mb-4">
                            Subscribe Now! ✨🚀
                        </h2>
                        <p className="mb-4">
                            Get access to premium content by subscribing to our
                            plans.
                        </p>
                        <button
                            onClick={handleSubscribeClick}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Subscribe
                        </button>
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-2 right-2 px-2 py-1 bg-red-300 rounded-md hover:bg-red-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Homepage;
