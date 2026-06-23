import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Container from "../../components/common/Container";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { useState } from "react";
import { FiArrowRight, FiCheck } from "react-icons/fi";

const Subscription = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [subscriptionPeriod, setSubscriptionPeriod] = useState("");

    const { data: subscriptions, isLoading } = useQuery({
        queryKey: ["subscriptions"],
        queryFn: async () => {
            const response = await axiosSecure(`${import.meta.env.VITE_API_URL}/subscriptions`);
            return response.data;
        },
    });
    if (isLoading) return <LoadingSpinner />;

    const handleSubscription = () => {
        navigate("/payment", { state: { subscriptionPeriod } });
    };

    return (
        <div className="bg-zinc-950 min-h-screen">
            <Helmet>
                <title>Subscription | OpenPage</title>
                <meta name="description" content="Choose a subscription plan on OpenPage to access premium content." />
            </Helmet>

            {/* Banner */}
            <div className="relative bg-gradient-to-br from-orange-700 via-orange-600 to-amber-600 py-16 sm:py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_#fff_0%,_transparent_70%)]" />
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 text-center relative z-10">
                    <h1 className="text-3xl sm:text-5xl font-bold text-white mb-3">
                        Subscribe Now ✨
                    </h1>
                    <p className="text-orange-100/80 text-sm sm:text-base max-w-sm mx-auto">
                        Unlock premium articles, exclusive insights, and ad-free reading.
                    </p>
                </div>
            </div>

            <Container>
                <div className="py-12 sm:py-16 max-w-xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white">Choose Your Plan</h2>
                        <p className="text-gray-500 mt-2 text-sm">Select a subscription period that suits you best.</p>
                    </div>

                    {/* Benefits list */}
                    <div className="bg-zinc-900 border border-white/[0.06] rounded-2xl p-5 sm:p-6 mb-6">
                        <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-4">What you get</p>
                        <ul className="space-y-2.5">
                            {["Access to all premium articles", "Ad-free reading experience", "Priority customer support", "Cancel anytime"].map((f, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                                    <FiCheck size={14} className="text-orange-400 flex-shrink-0" />
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Select plan */}
                    <div className="bg-zinc-900 border border-white/[0.06] rounded-2xl p-5 sm:p-6">
                        <label htmlFor="subscriptionPeriod" className="block text-sm font-semibold text-gray-300 mb-3">
                            Subscription Period
                        </label>
                        <select
                            id="subscriptionPeriod"
                            value={subscriptionPeriod}
                            onChange={(e) => setSubscriptionPeriod(e.target.value)}
                            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all duration-200 appearance-none cursor-pointer"
                            required
                        >
                            <option value="" disabled className="bg-zinc-800 text-gray-500">
                                Select a plan…
                            </option>
                            {subscriptions?.map((sub) => (
                                <option key={sub._id} value={sub.subscriptionPeriod} className="bg-zinc-800 text-white">
                                    {sub.subscriptionPeriod} — ${sub.amount}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={handleSubscription}
                            disabled={!subscriptionPeriod}
                            className={`mt-4 flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                subscriptionPeriod
                                    ? "bg-orange-600 hover:bg-orange-500 text-white hover:shadow-lg hover:shadow-orange-500/25"
                                    : "bg-zinc-800 text-gray-600 cursor-not-allowed"
                            }`}
                        >
                            Continue to Payment <FiArrowRight size={15} />
                        </button>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Subscription;
