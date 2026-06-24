import { FiPlay } from "react-icons/fi";

const podcasts = [
    { id: 1, title: "Tech Innovations", description: "Exploring the latest in technology and innovation with industry pioneers.", link: "https://youtu.be/y8NtMZ7VGmU?si=0WY9jOLheWqLGstB", tag: "Technology" },
    { id: 2, title: "Business Insights", description: "In-depth discussions with top industry leaders and entrepreneurs.", link: "https://youtu.be/bNpx7gpSqbY?si=H8y1swCjyTASCuvP", tag: "Business" },
    { id: 3, title: "Political Analysis", description: "Analyzing the latest political developments and global affairs.", link: "https://youtu.be/yqc9zX04DXs?si=0OsfBEhN5FI05yHo", tag: "Politics" },
];

const Podcasts = () => {
    return (
        <section className="bg-gray-50 dark:bg-zinc-900 border-y border-gray-200 dark:border-white/[0.06] py-16 sm:py-20">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-10 sm:mb-14">
                    <p className="text-orange-500 dark:text-orange-400 text-xs font-semibold uppercase tracking-widest mb-3">Listen & Watch</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">Interviews & Podcasts</h2>
                    <p className="text-gray-500 mt-3 text-sm">Expanding our media beyond text-based news.</p>
                    <div className="mt-4 h-px w-16 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {podcasts.map((podcast) => (
                        <a key={podcast.id} href={podcast.link} target="_blank" rel="noopener noreferrer"
                            className="group bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl p-5 sm:p-6 flex flex-col gap-4 hover:border-orange-300 dark:hover:border-orange-500/40 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-orange-900/20 transition-all duration-300"
                        >
                            <div className="flex items-center gap-4">
                                <div className="relative w-14 h-14 flex-shrink-0">
                                    <div className="absolute inset-0 rounded-full bg-orange-100 dark:bg-orange-500/20 group-hover:scale-110 group-hover:bg-orange-200 dark:group-hover:bg-orange-500/30 transition-all duration-300" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <FiPlay size={20} className="text-orange-500 dark:text-orange-400 ml-0.5 group-hover:text-orange-600 dark:group-hover:text-orange-300 transition-colors duration-200" />
                                    </div>
                                </div>
                                <div>
                                    <span className="text-[11px] font-semibold uppercase tracking-wider text-orange-400 dark:text-orange-400/70">{podcast.tag}</span>
                                    <h3 className="text-gray-900 dark:text-white font-semibold text-base group-hover:text-orange-600 dark:group-hover:text-orange-100 transition-colors duration-200">{podcast.title}</h3>
                                </div>
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed flex-grow">{podcast.description}</p>
                            <span className="text-orange-500 dark:text-orange-400 text-sm font-medium group-hover:text-orange-600 dark:group-hover:text-orange-300 transition-colors duration-200">
                                Listen Now →
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Podcasts;
