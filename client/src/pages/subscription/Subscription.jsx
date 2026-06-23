import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Container from "../../components/common/Container";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { useState } from "react";

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
    // console.log(subscriptions);
    if (isLoading) return <LoadingSpinner />;

    const handleSubscription = () => {
        // Navigate to the payment page
        navigate("/payment", { state: { subscriptionPeriod } });
    };

    return (
        <>
            <Helmet>
                <title>Subscription | OpenPage</title>
            </Helmet>
            {/* Banner */}
            <div className="relative w-full h-64 bg-indigo-600 flex items-center justify-center">
                <h1 className="text-5xl font-bold text-white">
                    Subscribe Now! ✨🚀
                </h1>
            </div>
            <Container>
                <div className="text-center">
                    <h2 className="text-4xl font-bold">Choose Your Plan</h2>
                    <p className="mt-4">
                        Select a subscription plan that suits you best.
                    </p>
                </div>

                {/* Subscription form */}
                <div className="subscription-form mt-8 max-w-md mx-auto">
                    <label
                        htmlFor="subscriptionPeriod"
                        className="block text-lg font-medium"
                    >
                        Subscription Period
                    </label>
                    <select
                        id="subscriptionPeriod"
                        value={subscriptionPeriod}
                        onChange={(e) => setSubscriptionPeriod(e.target.value)}
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                        required
                    >
                        <option value="" disabled>
                            Select a subscription
                        </option>
                        {subscriptions.map((subscription) => (
                            <option
                                key={subscription._id}
                                value={subscription.subscriptionPeriod}
                            >
                                {subscription.subscriptionPeriod} - $
                                {subscription.amount}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={handleSubscription}
                        disabled={!subscriptionPeriod}
                        className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Subscribe
                    </button>
                </div>
            </Container>
        </>
    );
};

export default Subscription;
