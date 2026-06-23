import { Link } from "react-router-dom";
import { FaTwitter, FaGithub, FaLinkedin, FaRss } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-zinc-950 border-t border-white/8">
            {/* Gradient top line */}
            <div className="h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

            <div className="max-w-screen-xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <h2 className="font-rye text-3xl font-bold text-white mb-2">
                            OpenPage
                        </h2>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Your premium destination for news, analysis, and exclusive
                            editorial content. Crafted for the curious mind.
                        </p>
                        <div className="flex gap-4 mt-5">
                            <a href="#" className="text-gray-500 hover:text-orange-400 transition-colors duration-200">
                                <FaTwitter size={18} />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-orange-400 transition-colors duration-200">
                                <FaGithub size={18} />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-orange-400 transition-colors duration-200">
                                <FaLinkedin size={18} />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-orange-400 transition-colors duration-200">
                                <FaRss size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
                            Navigate
                        </h3>
                        <ul className="space-y-2.5">
                            {[
                                { to: "/", label: "Home" },
                                { to: "/articles", label: "All Articles" },
                                { to: "/my-articles", label: "My Articles" },
                                { to: "/add-article", label: "Write an Article" },
                            ].map(({ to, label }) => (
                                <li key={to}>
                                    <Link
                                        to={to}
                                        className="text-gray-400 text-sm hover:text-orange-400 transition-colors duration-200"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* More */}
                    <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
                            More
                        </h3>
                        <ul className="space-y-2.5">
                            {[
                                { to: "/subscription", label: "Subscription" },
                                { to: "/premium-articles", label: "Premium Articles" },
                                { to: "#", label: "Contact Us" },
                                { to: "#", label: "Privacy Policy" },
                            ].map(({ to, label }) => (
                                <li key={label}>
                                    <Link
                                        to={to}
                                        className="text-gray-400 text-sm hover:text-orange-400 transition-colors duration-200"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-10 pt-6 border-t border-white/8 flex flex-col md:flex-row justify-between items-center gap-3">
                    <p className="text-gray-600 text-xs">
                        © {new Date().getFullYear()} OpenPage. All rights reserved.
                    </p>
                    <p className="text-gray-700 text-xs">
                        Built with ❤️ for storytellers
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
