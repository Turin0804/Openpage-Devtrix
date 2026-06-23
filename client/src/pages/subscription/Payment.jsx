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
        <>
            <Helmet>
                <title>Payment | OpenPage</title>
            </Helmet>

            <Container>
                <div className="flex flex-col items-center justify-center py-12 bg-gray-50 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md space-y-8">
                        <div>
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                Complete Your Payment
                            </h2>
                            <p className="mt-2 text-center text-sm text-gray-600">
                                You have selected the{" "}
                                <span className="text-indigo-500">
                                    {subscriptionPeriod}
                                </span>{" "}
                                subscription period.
                            </p>
                        </div>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm
                                handlePaymentSuccess={handlePaymentSuccess}
                            />
                        </Elements>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Payment;
