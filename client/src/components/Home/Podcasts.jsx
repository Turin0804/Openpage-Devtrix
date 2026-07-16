import { FiPlay } from "react-icons/fi";

const podcasts = [
    { id: 1, title: "Tech Innovations", description: "Exploring the latest in technology and innovation with industry pioneers.", link: "https://youtu.be/y8NtMZ7VGmU?si=0WY9jOLheWqLGstB", tag: "Technology" },
    { id: 2, title: "Business Insights", description: "In-depth discussions with top industry leaders and entrepreneurs.", link: "https://youtu.be/bNpx7gpSqbY?si=H8y1swCjyTASCuvP", tag: "Business" },
    { id: 3, title: "Political Analysis", description: "Analyzing the latest political developments and global affairs.", link: "https://youtu.be/yqc9zX04DXs?si=0OsfBEhN5FI05yHo", tag: "Politics" },
];

const Podcasts = () => {
    return (
        <section className="bg-zinc-950 py-16 sm:py-24 relative overflow-hidden border-y border-white/[0.06]">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            
            {/* Subtle Grid Pattern overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] opacity-30 pointer-events-none"></div>

            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center mb-12 sm:mb-16">
                    <p className="text-orange-400 text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center justify-center gap-2">
                        <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-orange-500/50"></span>
                        Listen & Watch
                        <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-orange-500/50"></span>
                    </p>
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">Interviews & Podcasts</h2>
                    <p className="text-zinc-400 text-sm sm:text-base max-w-lg mx-auto font-medium">Expanding our media beyond text-based news. Dive into exclusive conversations with industry leaders.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    {podcasts.map((podcast, idx) => (
                        <a key={podcast.id} href={podcast.link} target="_blank" rel="noopener noreferrer"
                            className="group relative bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col hover:bg-zinc-800/80 hover:border-orange-500/30 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.15)] transition-all duration-500 overflow-hidden"
                        >
                            {/* Accent Glow on Hover */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="flex items-start justify-between mb-8 relative z-10">
                                <div className="relative w-16 h-16 flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                                    <div className="absolute inset-0 rounded-2xl bg-orange-500/20 animate-pulse"></div>
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/25">
                                        <FiPlay size={24} className="text-white ml-1" />
                                    </div>
                                </div>
                                <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] font-bold text-zinc-300 uppercase tracking-widest backdrop-blur-sm">
                                    {podcast.tag}
                                </div>
                            </div>
                            
                            <div className="relative z-10 flex-grow flex flex-col">
                                <p className="text-orange-400 font-mono text-[10px] mb-2 uppercase tracking-widest opacity-80">Episode 0{idx + 1}</p>
                                <h3 className="text-white font-bold text-xl sm:text-2xl leading-snug mb-3 group-hover:text-orange-300 transition-colors duration-300">
                                    {podcast.title}
                                </h3>
                                <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
                                    {podcast.description}
                                </p>
                                
                                <div className="mt-auto flex items-center gap-2 text-white text-sm font-semibold group-hover:text-orange-400 transition-colors duration-300">
                                    <span className="w-8 h-[1px] bg-current group-hover:w-12 transition-all duration-300"></span>
                                    Listen Now
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Podcasts;