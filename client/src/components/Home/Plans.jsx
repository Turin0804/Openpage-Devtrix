import { Link } from "react-router-dom";
import Container from "../common/Container";
import { FiCheck } from "react-icons/fi";

const plans = [
    { subscriptionPeriod: "1 minute", amount: 1, label: "Trial", desc: "Try before you commit", popular: false },
    { subscriptionPeriod: "5 days", amount: 10, label: "Standard", desc: "Best for regular readers", popular: true },
    { subscriptionPeriod: "10 days", amount: 18, label: "Extended", desc: "More access, more value", popular: false },
];

const features = ["Access to all premium articles", "Cancel anytime", "Priority support", "Support our creators"];

const Plans = () => {
    return (
        <section className="bg-gray-50 dark:bg-zinc-900 border-y border-gray-200 dark:border-white/[0.06] py-16 sm:py-20">
            <Container>
                <div className="text-center mb-10 sm:mb-14">
                    <p className="text-orange-500 dark:text-orange-400 text-xs font-semibold uppercase tracking-widest mb-3">Pricing</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Choose Your Plan</h2>
                    <p className="text-gray-500 mt-3 text-sm">Unlock premium content with a plan that suits you.</p>
                    <div className="mt-4 h-px w-16 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-4xl mx-auto">
                    {plans.map((plan, index) => (
                        <div key={index}
                            className={`relative rounded-2xl p-6 sm:p-7 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1 ${
                                plan.popular
                                    ? "bg-gradient-to-b from-orange-600 to-orange-700 border border-orange-500/60 shadow-2xl shadow-orange-500/20"
                                    : "bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 hover:border-orange-200 dark:hover:border-orange-500/30 shadow-sm hover:shadow-lg"
                            }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="text-[11px] font-bold uppercase tracking-widest bg-amber-400 text-zinc-900 px-3 py-1 rounded-full">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div>
                                <p className={`text-xs font-semibold uppercase tracking-widest ${plan.popular ? "text-orange-200" : "text-orange-500 dark:text-orange-400"}`}>
                                    {plan.label}
                                </p>
                                <h3 className={`text-xl font-bold mt-1 ${plan.popular ? "text-white" : "text-gray-900 dark:text-white"}`}>
                                    {plan.subscriptionPeriod}
                                </h3>
                                <p className={`text-sm mt-1 ${plan.popular ? "text-orange-100/80" : "text-gray-500"}`}>{plan.desc}</p>
                            </div>

                            <div className={`text-4xl font-bold ${plan.popular ? "text-white" : "text-orange-500 dark:text-orange-400"}`}>
                                ${plan.amount}
                                <span className={`text-sm font-normal ml-1 ${plan.popular ? "text-orange-100/70" : "text-gray-400"}`}>one-time</span>
                            </div>

                            <ul className="space-y-2.5 flex-grow">
                                {features.map((f, i) => (
                                    <li key={i} className={`flex items-center gap-2.5 text-sm ${plan.popular ? "text-orange-100" : "text-gray-600 dark:text-gray-400"}`}>
                                        <FiCheck size={14} className={plan.popular ? "text-white flex-shrink-0" : "text-orange-500 dark:text-orange-400 flex-shrink-0"} />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <Link to="/subscription"
                                className={`block text-center py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                    plan.popular
                                        ? "bg-white text-orange-600 hover:bg-orange-50"
                                        : "bg-orange-600 text-white hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-500/20"
                                }`}
                            >Get Started</Link>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default Plans;
