import { Link, useNavigate } from "react-router-dom";
import Container from "../common/Container";

const plans = [
    {
        subscriptionPeriod: "1 minute",
        amount: 1,
    },
    {
        subscriptionPeriod: "5 days",
        amount: 10,
    },
    {
        subscriptionPeriod: "10 days",
        amount: 18,
    },
];

const Plans = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-gray-100 text-gray-800">
            <Container>
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8">
                        Choose Your Plan
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className="card border border-gray-300 bg-white text-gray-800 shadow-md rounded-lg"
                            >
                                <div className="card-body p-6">
                                    <h3 className="card-title text-indigo-600 text-2xl font-semibold">
                                        {plan.subscriptionPeriod}
                                    </h3>
                                    <p className="text-lg font-bold mt-2">
                                        ${plan.amount}
                                    </p>
                                    <ul className="mt-4 space-y-2">
                                        <li>Access to premium content</li>
                                        <li>Cancel anytime</li>
                                        <li>Support our platform</li>
                                    </ul>
                                    <div className="card-actions mt-6">
                                        <Link
                                            to="/subscription"
                                            className="btn btn-primary w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
                                        >
                                            Subscribe
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Plans;
