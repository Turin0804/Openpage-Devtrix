import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Container from "../../components/common/Container";
import CheckoutForm from "../../components/Form/CheckoutForm";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FiLock, FiShield } from "react-icons/fi";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Payment = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();
    const { subscriptionPeriod } = location.state || {};

    const { data: userData = {}, isLoading } = useQuery({
        queryKey: ["userData"],
        queryFn: async () => {
            const response = await axiosSecure(`${import.meta.env.VITE_API_URL}/users/${user?.email}`);
            return response.data;
        },
    });
    const { _id } = userData;
    if (isLoading) return <LoadingSpinner />;

    const handlePaymentSuccess = async () => {
        try {
            await axiosSecure.post(`${import.meta.env.VITE_API_URL}/update-subscription`, { userId: _id, subscriptionPeriod });
            navigate("/premium-articles");
        } catch (error) {
            console.error("Error updating subscription:", error);
        }
    };

    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen">
            <Helmet><title>Payment | OpenPage</title></Helmet>

            <Container>
                <div className="py-12 sm:py-16 max-w-lg mx-auto">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-full mb-4">
                            <FiShield size={13} className="text-green-600 dark:text-green-400" />
                            <span className="text-green-700 dark:text-green-300 text-xs font-semibold">Secure Payment</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Complete Payment</h1>
                        {subscriptionPeriod && (
                            <p className="text-gray-500 mt-2 text-sm">
                                You selected: <span className="text-orange-500 dark:text-orange-400 font-semibold">{subscriptionPeriod}</span>
                            </p>
                        )}
                    </div>

                    <div className="bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-white/[0.08] rounded-2xl p-6 sm:p-8">
                        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-200 dark:border-white/[0.06]">
                            <FiLock size={14} className="text-gray-400 dark:text-gray-500" />
                            <p className="text-gray-400 dark:text-gray-500 text-xs">256-bit encrypted checkout powered by Stripe</p>
                        </div>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm handlePaymentSuccess={handlePaymentSuccess} />
                        </Elements>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Payment;
