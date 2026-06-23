import { CardElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const CheckoutForm = ({ handlePaymentSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle payment logic here

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (error) {
            console.error(error);
            return;
        }

        // Send paymentMethod.id to your server (e.g., via an API call) to process the payment
        // Example: await fetch('/api/pay', { method: 'POST', body: JSON.stringify({ paymentMethodId: paymentMethod.id }) });

        // console.log("Payment successful:", paymentMethod);
        toast.success("Payment successful!!");

        // On successful payment
        handlePaymentSuccess();
    };

    return (
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <label htmlFor="card-element" className="sr-only">
                        Credit or debit card
                    </label>
                    <div
                        id="card-element"
                        className="p-3 border border-gray-300 rounded-md"
                    >
                        {/* Stripe Card Element will be inserted here */}

                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: "16px",
                                        color: "#424770",
                                        "::placeholder": {
                                            color: "#aab7c4",
                                        },
                                    },
                                    invalid: {
                                        color: "#9e2146",
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>

            <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Pay
            </button>
        </form>
    );
};

CheckoutForm.propTypes = {
    handlePaymentSuccess: PropTypes.func.isRequired,
};
export default CheckoutForm;
