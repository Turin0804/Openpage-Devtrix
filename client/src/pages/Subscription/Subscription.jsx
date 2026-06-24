import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Container from "../../components/common/Container";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { useState } from "react";
import { FiCheck } from "react-icons/fi";

const Subscription = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [subscriptionPeriod, setSubscriptionPeriod] = useState("");

    const { data: subscriptions, isLoading } = useQuery({
        queryKey: ["subscriptions"],
        queryFn: async () => {
            const response = await axiosSecure(
                `${import.meta.env.VITE_API_URL}/subscriptions`
            );
            return response.data;
        },
    });

    if (isLoading) return <LoadingSpinner />;

    const handleSubscription = () => {
        navigate("/payment", { state: { subscriptionPeriod } });
    };

    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen pb-24 relative overflow-hidden">
            <Helmet>
                <title>Subscription | OpenPage</title>
            </Helmet>

            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-orange-500/10 dark:bg-orange-500/20 blur-[120px] pointer-events-none rounded-full"></div>

            {/* Header Section */}
            <div className="relative pt-24 pb-16 text-center z-10">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
                    Unlock <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Premium</span> Access
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-4">
                    Choose the perfect plan to get unlimited access to exclusive editorial content, deeper insights, and an ad-free reading experience.
                </p>
            </div>

            <Container>
                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10 px-4 sm:px-0 mt-4">
                    {subscriptions?.map((sub, idx) => (
                        <div 
                            key={sub._id}
                            onClick={() => setSubscriptionPeriod(sub.subscriptionPeriod)}
                            className={`relative p-8 rounded-[2rem] border-2 transition-all duration-300 cursor-pointer flex flex-col ${
                                subscriptionPeriod === sub.subscriptionPeriod
                                ? "border-orange-500 bg-orange-50/80 dark:bg-orange-500/20 shadow-2xl shadow-orange-500/40 scale-105 z-20"
                                : "border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-orange-300 dark:hover:border-orange-500/50 hover:shadow-xl hover:scale-[1.02] z-10"
                            }`}
                        >
                            {idx === 1 && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[11px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <h3 className="text-xl font-bold text-gray-900 dark:text-white capitalize">{sub.subscriptionPeriod}</h3>
                            
                            <div className="mt-5 flex items-baseline gap-2">
                                <span className="text-5xl font-black text-gray-900 dark:text-white">${sub.amount}</span>
                            </div>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium">Total billed for {sub.subscriptionPeriod}</p>
                            
                            <div className="my-8 h-px w-full bg-gray-100 dark:bg-white/10" />

                            <ul className="space-y-4 flex-1">
                                {['Unlimited Premium Articles', 'Ad-free Experience', 'Support the Publishers'].map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center text-orange-500">
                                            <FiCheck size={12} strokeWidth={3} />
                                        </div>
                                        <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            
                            {/* Selected Indicator */}
                            <div className={`mt-8 w-full py-3 rounded-xl border text-center text-sm font-bold transition-colors duration-300 ${
                                subscriptionPeriod === sub.subscriptionPeriod
                                ? "bg-orange-500 border-orange-500 text-white"
                                : "bg-transparent border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-gray-400"
                            }`}>
                                {subscriptionPeriod === sub.subscriptionPeriod ? "Selected" : "Select Plan"}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action Button */}
                <div className="mt-20 flex justify-center relative z-10">
                    <button
                        onClick={handleSubscription}
                        disabled={!subscriptionPeriod}
                        className="group relative px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-lg font-bold rounded-full overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-300 shadow-xl disabled:hover:scale-100"
                    >
                        {!subscriptionPeriod ? (
                            <span className="relative z-10 flex items-center gap-2">Select a Plan to Continue</span>
                        ) : (
                            <>
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                                    Proceed to Checkout
                                </span>
                            </>
                        )}
                    </button>
                </div>
            </Container>
        </div>
    );
};

export default Subscription;
