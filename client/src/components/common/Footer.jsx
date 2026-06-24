import { Link } from "react-router-dom";
import { FaTwitter, FaGithub, FaLinkedin, FaRss } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-zinc-950 border-t border-gray-200 dark:border-white/[0.05] relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-[100px] bg-orange-500/10 dark:bg-orange-500/5 blur-[50px] pointer-events-none rounded-full" />
            
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12 lg:py-16 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    <div className="sm:col-span-2 lg:col-span-2">
                        <Link to="/" className="inline-block group mb-5">
                            <span className="font-rye text-3xl font-bold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors duration-300">
                                OpenPage
                            </span>
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-sm mb-8">
                            Your premium destination for news, analysis, and exclusive editorial content. Creating a space where storytellers and readers connect.
                        </p>
                        <div className="flex gap-4">
                            {[FaTwitter, FaGithub, FaLinkedin, FaRss].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-orange-50 hover:text-orange-500 dark:hover:bg-orange-500/10 dark:hover:text-orange-400 transition-all duration-300">
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-6">Navigation</h3>
                        <ul className="space-y-4">
                            {[["/" ,"Home"], ["/articles", "All Articles"], ["/my-articles", "My Articles"], ["/add-article", "Write an Article"]].map(([to, label]) => (
                                <li key={to}><Link to={to} className="text-gray-500 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400 text-sm font-medium transition-colors duration-200">{label}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-6">Premium</h3>
                        <ul className="space-y-4">
                            {[["/subscription", "Pricing Plans"], ["/premium-articles", "Premium Content"], ["#", "Support"], ["#", "Terms of Service"]].map(([to, label]) => (
                                <li key={label}><Link to={to} className="text-gray-500 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400 text-sm font-medium transition-colors duration-200">{label}</Link></li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-200 dark:border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 dark:text-gray-500 text-sm text-center md:text-left">
                        © {new Date().getFullYear()} OpenPage. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
                        <span>Built with</span>
                        <span className="text-red-500 animate-pulse">❤️</span>
                        <span>for storytellers</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
