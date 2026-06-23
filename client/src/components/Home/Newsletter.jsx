import { useState } from "react";
import toast from "react-hot-toast";
import { FiMail, FiUser, FiArrowRight } from "react-icons/fi";

const Newsletter = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email) { toast.error("Please fill in all fields"); return; }
        try {
            toast.success("Subscribed successfully! 🎉");
            setName("");
            setEmail("");
        } catch {
            toast.error("Failed to subscribe");
        }
    };

    return (
        <section className="bg-zinc-950 py-16 sm:py-20">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-white/[0.08] rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden relative">
                    {/* Background glow */}
                    <div className="absolute -top-20 -right-20 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                        {/* Text */}
                        <div>
                            <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-3">Stay informed</p>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                                Get the best stories<br />
                                <span className="gradient-text">delivered to you</span>
                            </h2>
                            <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                                Join thousands of readers who get the latest news, exclusive editorial pieces, and premium insights straight to their inbox.
                            </p>
                            <div className="flex items-center gap-3 mt-6">
                                <div className="flex -space-x-2">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 border-2 border-zinc-900 flex items-center justify-center text-[10px] text-white font-bold">
                                            {String.fromCharCode(65 + i)}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-gray-500 text-xs">+2,400 subscribers already</p>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="relative">
                                <FiUser size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Your name"
                                    className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all duration-200"
                                    required
                                />
                            </div>
                            <div className="relative">
                                <FiMail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all duration-200"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25"
                            >
                                Subscribe <FiArrowRight size={16} />
                            </button>
                            <p className="text-center text-gray-600 text-xs">No spam, ever. Unsubscribe at any time.</p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
