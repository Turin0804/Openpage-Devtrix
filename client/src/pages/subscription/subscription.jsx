import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import Container from "../../components/common/Container";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Subscription = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [subscriptionPeriod, setSubscriptionPeriod] = useState("");

    const { data: subscriptions = [], isLoading } = useQuery({
        queryKey: ["subscriptions"],
        queryFn: async () => {
            const response = await axiosSecure(
                `${import.meta.env.VITE_API_URL}/subscriptions`
            );
            return response.data;
        },
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    const handleSubscription = () => {
        navigate("/payment", {
            state: { subscriptionPeriod },
        });
    };

    return (
        <>
            <Helmet>
                <title>Subscription | InsightArc</title>
            </Helmet>

            <div className="relative w-full h-64 bg-indigo-600 flex items-center justify-center">
                <h1 className="text-5xl font-bold text-white">
                    Subscribe Now! ✨🚀
                </h1>
            </div>

            <Container>
                <div className="text-center py-10">
                    <h2 className="text-4xl font-bold">
                        Choose Your Plan
                    </h2>

                    <p className="mt-4 text-gray-600">
                        Select a subscription plan that suits you best.
                    </p>
                </div>

                <div className="max-w-md mx-auto mb-10">
                    <label
                        htmlFor="subscriptionPeriod"
                        className="block text-lg font-medium mb-2"
                    >
                        Subscription Period
                    </label>

                    <select
                        id="subscriptionPeriod"
                        value={subscriptionPeriod}
                        onChange={(e) =>
                            setSubscriptionPeriod(e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="" disabled>
                            Select a subscription
                        </option>

                        {subscriptions?.map((subscription) => (
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
                        className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
                    >
                        Subscribe
                    </button>
                </div>
            </Container>
        </>
    );
};

export default Subscription;