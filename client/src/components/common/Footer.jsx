import { Link } from "react-router-dom";
import { FaTwitter, FaGithub, FaLinkedin, FaRss } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-zinc-950 border-t border-gray-200 dark:border-white/[0.08]">
            <div className="h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10">
                    <div className="col-span-2">
                        <h2 className="font-rye text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">OpenPage</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
                            Your premium destination for news, analysis, and exclusive editorial content.
                        </p>
                        <div className="flex gap-4 mt-5">
                            {[FaTwitter, FaGithub, FaLinkedin, FaRss].map((Icon, i) => (
                                <a key={i} href="#" className="text-gray-400 hover:text-orange-500 dark:text-gray-600 dark:hover:text-orange-400 transition-colors duration-200">
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Navigate</h3>
                        <ul className="space-y-2.5">
                            {[["/" ,"Home"], ["/articles", "Articles"], ["/my-articles", "My Articles"], ["/add-article", "Write"]].map(([to, label]) => (
                                <li key={to}><Link to={to} className="text-gray-500 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400 text-sm transition-colors duration-200">{label}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">More</h3>
                        <ul className="space-y-2.5">
                            {[["/subscription", "Subscription"], ["/premium-articles", "Premium"], ["#", "Contact"], ["#", "Privacy"]].map(([to, label]) => (
                                <li key={label}><Link to={to} className="text-gray-500 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400 text-sm transition-colors duration-200">{label}</Link></li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-gray-200 dark:border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-2">
                    <p className="text-gray-400 dark:text-gray-600 text-xs">© {new Date().getFullYear()} OpenPage. All rights reserved.</p>
                    <p className="text-gray-300 dark:text-gray-700 text-xs">Built with ❤️ for storytellers</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
