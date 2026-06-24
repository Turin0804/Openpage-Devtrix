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
    console.log(subscriptionPeriod);

    const { data: userData = {}, isLoading } = useQuery({
        queryKey: ["userData"],
        queryFn: async () => {
            const response = await axiosSecure(
                `${import.meta.env.VITE_API_URL}/users/${user?.email}`
            );
            return response.data;
        },
    });
    // console.log(userData);
    const { _id } = userData;
    // console.log(_id);
    if (isLoading) return <LoadingSpinner />;

    const handlePaymentSuccess = async () => {
        try {
            // Update user subscription status on the server
            await axiosSecure.post(
                `${import.meta.env.VITE_API_URL}/update-subscription`,
                {
                    userId: _id,
                    subscriptionPeriod,
                }
            );
            navigate("/premium-articles");
        } catch (error) {
            console.error("Error updating subscription:", error);
        }
    };

    return (
        <div className="bg-white dark:bg-zinc-950 min-h-screen py-16 relative overflow-hidden">
            <Helmet>
                <title>Secure Checkout | OpenPage</title>
            </Helmet>

            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

            <Container>
                <div className="max-w-2xl mx-auto relative z-10">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            Secure Checkout
                        </h2>
                        <p className="mt-3 text-gray-600 dark:text-gray-400">
                            You&apos;re upgrading to the <span className="font-bold text-orange-500 capitalize">{subscriptionPeriod}</span> plan.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl dark:shadow-black/60 relative z-10">
                        {/* Order Summary */}
                        <div className="mb-8 p-5 bg-gray-50 dark:bg-zinc-950/50 rounded-2xl border border-gray-100 dark:border-zinc-800/50 flex flex-col gap-3">
                            <div className="flex justify-between items-center text-sm font-medium text-gray-600 dark:text-gray-400">
                                <span>Selected Plan</span>
                                <span className="capitalize px-3 py-1 bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 rounded-lg">{subscriptionPeriod}</span>
                            </div>
                            <div className="h-px bg-gray-200 dark:bg-zinc-800/50 w-full" />
                            <div className="flex justify-between items-center">
                                <span className="text-gray-900 dark:text-white font-bold">Total Due Today</span>
                                <span className="text-gray-500 dark:text-gray-400 text-sm">Calculated securely via Stripe</span>
                            </div>
                        </div>

                        {/* Stripe Elements */}
                        <Elements stripe={stripePromise}>
                            <CheckoutForm
                                handlePaymentSuccess={handlePaymentSuccess}
                            />
                        </Elements>
                    </div>
                    
                    {/* Trust Badges */}
                    <div className="mt-8 flex flex-col items-center justify-center gap-2 text-center text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1.5 justify-center">
                            <FiShield className="text-emerald-500" />
                            <span className="font-medium">256-bit SSL Encryption</span>
                        </div>
                        <p className="flex items-center gap-1.5 justify-center">
                            <FiLock /> Payments are securely processed by Stripe
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Payment;
