import { FiArrowUpRight, FiCpu, FiZap, FiCloud, FiBox, FiTrendingUp } from "react-icons/fi";

const icons = [FiCpu, FiZap, FiBox, FiTrendingUp, FiCloud];

const techTopics = [
    { id: 1, title: "The Rise of AI in Everyday Life", description: "Exploring how AI is transforming various industries and our daily routines.", link: "https://medium.com/@dixitra20/the-rise-of-ai-in-everyday-life-how-artificial-intelligence-is-transforming-our-daily-experiences-1aa7bce6b9e0", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200" },
    { id: 2, title: "Startups to Watch in 2025", description: "A look at the most promising and disruptive startups shaping this year.", link: "https://medium.com/@dixitra20/the-rise-of-ai-in-everyday-life-how-artificial-intelligence-is-transforming-our-daily-experiences-1aa7bce6b9e0", image: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1200" },
    { id: 3, title: "Understanding Large Language Models", description: "An in-depth guide to LLMs and their real-world applications.", link: "https://medium.com/@dixitra20/the-rise-of-ai-in-everyday-life-how-artificial-intelligence-is-transforming-our-daily-experiences-1aa7bce6b9e0", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200" },
    { id: 4, title: "The Future of IoT", description: "How IoT is shaping the future of connected devices and smart environments.", link: "https://medium.com/@dixitra20/the-rise-of-ai-in-everyday-life-how-artificial-intelligence-is-transforming-our-daily-experiences-1aa7bce6b9e0", image: "https://images.unsplash.com/photo-1550684376-ef3b2f11465b?auto=format&fit=crop&q=80&w=1200" },
    { id: 5, title: "Cloud Computing Trends in 2025", description: "Emerging trends in cloud computing and their impact on the enterprise.", link: "https://medium.com/@dixitra20/the-rise-of-ai-in-everyday-life-how-artificial-intelligence-is-transforming-our-daily-experiences-1aa7bce6b9e0", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200" },
];

const TechnologyInnovation = () => {
    return (
        <section className="bg-gray-50 dark:bg-zinc-900/50 py-16 sm:py-24 relative overflow-hidden">
            {/* Background glowing orb */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 dark:bg-orange-500/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
                    <div>
                        <p className="text-orange-500 dark:text-orange-400 text-xs font-semibold uppercase tracking-widest mb-3">Stay ahead</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight">Technology & Innovation</h2>
                    </div>
                    <div className="h-px md:h-12 w-full md:w-px bg-gradient-to-r md:bg-gradient-to-b from-transparent via-orange-500/50 to-transparent hidden sm:block" />
                    <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm font-medium">Deep dives into AI, cloud computing, and the startups shaping tomorrow's digital landscape.</p>
                </div>

                {/* Bento Box Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 sm:gap-6 min-h-[600px]">
                    {techTopics.map((topic, index) => {
                        const Icon = icons[index % icons.length];
                        
                        // Assigning specific grid spans for the Bento layout
                        let bentoClasses = "";
                        if (index === 0) bentoClasses = "md:col-span-2 md:row-span-1"; // Wide top
                        else if (index === 1) bentoClasses = "md:col-span-1 md:row-span-2"; // Tall right
                        else if (index === 2) bentoClasses = "md:col-span-1 md:row-span-1"; // Bottom left
                        else if (index === 3) bentoClasses = "md:col-span-1 md:row-span-1"; // Bottom mid
                        else if (index === 4) bentoClasses = "hidden md:hidden"; // Hide 5th for perfect 3x2 grid, or show on mobile.

                        return (
                            <a key={topic.id} href={topic.link} target="_blank" rel="noopener noreferrer"
                                className={`group relative rounded-3xl p-6 sm:p-8 flex flex-col gap-4 hover:-translate-y-1 hover:shadow-2xl shadow-lg transition-all duration-500 overflow-hidden ${bentoClasses}`}
                            >
                                {/* Vector/3D Background Image */}
                                <div className="absolute inset-0 bg-zinc-900">
                                    <img 
                                        src={topic.image} 
                                        alt={topic.title} 
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-in-out"
                                    />
                                    {/* Gradient overlay for text legibility */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/95 transition-colors duration-500"></div>
                                </div>

                                {/* Icon */}
                                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md shadow-sm border border-white/20 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-300">
                                    <Icon size={20} className="text-white drop-shadow-md" />
                                </div>
                                
                                {/* Content */}
                                <div className="mt-auto relative z-10 pt-8">
                                    <h3 className={`${index === 0 ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-xl sm:text-2xl'} font-bold text-white leading-[1.2] transition-colors duration-300 mb-3 drop-shadow-lg`}>
                                        {topic.title}
                                    </h3>
                                    <p className="text-gray-200 text-sm leading-relaxed drop-shadow-md font-medium">
                                        {topic.description}
                                    </p>
                                </div>
                                
                                {/* Arrow Button */}
                                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md shadow-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    <FiArrowUpRight size={18} className="text-white" />
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TechnologyInnovation;
