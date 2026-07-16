import { Link } from "react-router-dom";
import { FaTwitter, FaGithub, FaLinkedin, FaRss } from "react-icons/fa";

const NAV = [
    { to: "/", label: "Home" },
    { to: "/articles", label: "Articles" },
    { to: "/subscription", label: "Pricing" },
    { to: "/add-article", label: "Write" },
];

const SOCIALS = [
    { Icon: FaTwitter, href: "#", label: "Twitter" },
    { Icon: FaGithub, href: "https://github.com/Turin0804/Openpage-Devtrix", label: "GitHub" },
    { Icon: FaLinkedin, href: "#", label: "LinkedIn" },
    { Icon: FaRss, href: "#", label: "RSS" },
];

const Footer = () => {
    return (
        <footer className="relative bg-white dark:bg-zinc-950 overflow-hidden">

            {/* Top razor glow line */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent" />
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-20 bg-orange-500/10 blur-3xl rounded-full pointer-events-none" />

            {/* Main single strip */}
            <div className="max-w-screen-xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">

                {/* Wordmark */}
                <Link to="/" className="group shrink-0">
                    <span className="font-rye text-2xl text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors duration-300 tracking-tight">
                        OpenPage
                    </span>
                </Link>

                {/* Inline nav */}
                <nav className="flex items-center gap-1">
                    {NAV.map(({ to, label }, i) => (
                        <span key={to} className="flex items-center">
                            <Link
                                to={to}
                                className="text-[13px] font-medium text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-200 px-3 py-1 rounded-md hover:bg-orange-50 dark:hover:bg-orange-500/10"
                            >
                                {label}
                            </Link>
                            {i < NAV.length - 1 && (
                                <span className="text-gray-200 dark:text-white/10 select-none">·</span>
                            )}
                        </span>
                    ))}
                </nav>

                {/* Social icons — same size as original (16) */}
                <div className="flex items-center gap-3 shrink-0">
                    {SOCIALS.map(({ Icon, href, label }) => (
                        <a
                            key={label}
                            href={href}
                            aria-label={label}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-orange-50 hover:text-orange-500 dark:hover:bg-orange-500/10 dark:hover:text-orange-400 transition-all duration-300"
                        >
                            <Icon size={16} />
                        </a>
                    ))}
                </div>
            </div>

            {/* Bottom micro-bar */}
            <div className="border-t border-gray-100 dark:border-white/[0.04]">
                <div className="max-w-screen-xl mx-auto px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-1">
                    <p className="text-[11px] text-gray-400 dark:text-gray-600 tracking-wide">
                        © {new Date().getFullYear()} OpenPage. All rights reserved.
                    </p>
                    <p className="text-[11px] text-gray-400 dark:text-gray-600 tracking-wide flex items-center gap-1.5">
                        Crafted by{" "}
                        <span
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-widest uppercase ring-1 ring-orange-400/50 dark:ring-orange-500/40 shadow-[0_0_10px_rgba(249,115,22,0.3)] dark:shadow-[0_0_14px_rgba(249,115,22,0.25)]"
                            style={{
                                background: "linear-gradient(90deg,#f97316,#f59e0b)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            DevTrix
                        </span>
                    </p>
                </div>
            </div>

        </footer>
    );
};

export default Footer;