import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import TrendingSlider from "../../components/slider/TrendingSlider";
import Publishers from "../../components/Home/Publishers";
import UserStatistics from "../../components/Home/UserStatistics";
import Plans from "../../components/Home/Plans";
import LatestArticles from "../../components/Home/LatestArticles";
import Newsletter from "../../components/Home/Newsletter";
import Podcasts from "../../components/Home/Podcasts";
import TechnologyInnovation from "../../components/Home/TechnologyInnovation";
import { FiX, FiArrowRight, FiStar } from "react-icons/fi";

const Homepage = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();

    const { data: userData } = useQuery({
        queryKey: ["userData", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const response = await axios(`${import.meta.env.VITE_API_URL}/users/${user?.email}`);
            return response.data;
        },
    });

    useEffect(() => {
        if (userData?.userHasSubscription) return;

        const timer = setTimeout(() => setShowModal(true), 10000);
        return () => clearTimeout(timer);
    }, [userData]);

    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen">
            <Helmet>
                <title>OpenPage | Home</title>
                <meta name="description" content="Your premium destination for news, analysis, and exclusive editorial content." />
            </Helmet>

            <TrendingSlider />
            <LatestArticles />
            <Publishers />
            <TechnologyInnovation />
            <Podcasts />
            <UserStatistics />
            <Plans />
            <Newsletter />

            {/* Subscription Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
                    <div className="relative z-10 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-3xl p-8 sm:p-10 max-w-sm w-full shadow-2xl dark:shadow-black/60">
                        <button onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-all duration-200">
                            <FiX size={15} />
                        </button>
                        <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 flex items-center justify-center mb-5">
                            <FiStar size={24} className="text-orange-500 dark:text-orange-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Go Premium ✨</h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Unlock exclusive articles, in-depth analysis, and ad-free reading. Subscribe now for as little as $1.
                        </p>
                        <button
                            onClick={() => { setShowModal(false); navigate("/subscription"); }}
                            className="flex items-center justify-center gap-2 w-full py-3 px-5 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25">
                            See Subscription Plans <FiArrowRight size={15} />
                        </button>
                        <button onClick={() => setShowModal(false)}
                            className="mt-3 w-full text-center text-gray-400 hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-400 text-xs transition-colors duration-200 py-1">
                            Maybe later
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Homepage;
