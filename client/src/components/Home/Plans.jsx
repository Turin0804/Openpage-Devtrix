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
        <section className="bg-white dark:bg-zinc-950 py-16 sm:py-24 relative overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="absolute top-1/4 left-0 w-72 h-72 bg-orange-500/10 dark:bg-orange-500/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <Container className="relative z-10">
                <div className="text-center mb-14 sm:mb-20">
                    <p className="text-orange-500 dark:text-orange-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">Pricing Plans</p>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight mb-4">Choose Your Plan</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base max-w-lg mx-auto font-medium">Unlock exclusive content, in-depth analysis, and an ad-free reading experience.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
                    {plans.map((plan, index) => (
                        <div key={index}
                            className={`relative rounded-3xl p-8 sm:p-10 flex flex-col gap-8 transition-all duration-500 ${
                                plan.popular
                                    ? "bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 shadow-2xl shadow-orange-900/30 md:-translate-y-4 md:hover:-translate-y-6"
                                    : "bg-white/50 dark:bg-zinc-900/30 backdrop-blur-sm border border-gray-200 dark:border-white/5 hover:border-orange-500/30 dark:hover:border-orange-500/30 shadow-sm hover:shadow-xl dark:hover:shadow-orange-900/10 hover:-translate-y-2"
                            }`}
                        >
                            {/* Accent Glow for Popular */}
                            {plan.popular && (
                                <div className="absolute -inset-0.5 bg-gradient-to-b from-orange-500 to-amber-500 rounded-3xl opacity-20 blur-sm pointer-events-none"></div>
                            )}
                            
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <div className="relative px-4 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center overflow-hidden shadow-lg shadow-orange-500/40">
                                        <div className="absolute inset-0 bg-white/20 w-1/2 -skew-x-12 translate-x-[-150%] animate-[shimmer_2.5s_infinite]"></div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white relative z-10">
                                            Most Popular
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="relative z-10 text-center">
                                <p className={`text-xs font-bold uppercase tracking-[0.2em] mb-2 ${plan.popular ? "text-orange-400" : "text-gray-400 dark:text-gray-500"}`}>
                                    {plan.label}
                                </p>
                                <div className="flex items-end justify-center gap-1 mb-2">
                                    <span className={`text-5xl font-black tracking-tight ${plan.popular ? "text-white" : "text-gray-900 dark:text-white"}`}>
                                        ${plan.amount}
                                    </span>
                                </div>
                                <h3 className={`text-sm font-semibold mb-2 ${plan.popular ? "text-zinc-300" : "text-gray-600 dark:text-gray-400"}`}>
                                    {plan.subscriptionPeriod}
                                </h3>
                                <p className={`text-xs font-medium ${plan.popular ? "text-zinc-500" : "text-gray-400 dark:text-gray-500"}`}>{plan.desc}</p>
                            </div>

                            <div className="relative z-10 flex-grow">
                                <ul className="space-y-4">
                                    {features.map((f, i) => (
                                        <li key={i} className={`flex items-start gap-3 text-sm font-medium ${plan.popular ? "text-zinc-300" : "text-gray-600 dark:text-gray-400"}`}>
                                            <div className={`mt-0.5 rounded-full p-0.5 ${plan.popular ? "bg-orange-500/20 text-orange-400" : "bg-gray-100 dark:bg-zinc-800 text-orange-500 dark:text-orange-400"}`}>
                                                <FiCheck size={12} strokeWidth={3} />
                                            </div>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="relative z-10 mt-2">
                                <Link to="/subscription"
                                    className={`group flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                                        plan.popular
                                            ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                                            : "bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white hover:bg-orange-50 dark:hover:bg-zinc-700 hover:text-orange-600 dark:hover:text-orange-400"
                                    }`}
                                >
                                    Get Started
                                    <svg className={`w-4 h-4 transition-transform duration-300 ${plan.popular ? "group-hover:translate-x-1" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default Plans;
