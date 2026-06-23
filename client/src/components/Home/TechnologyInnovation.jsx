import { FiArrowUpRight, FiCpu, FiZap, FiCloud, FiBox, FiTrendingUp } from "react-icons/fi";

const icons = [FiCpu, FiZap, FiBox, FiTrendingUp, FiCloud];

const techTopics = [
    {
        id: 1,
        title: "The Rise of AI in Everyday Life",
        description: "Exploring how AI is transforming various industries and our daily routines.",
        link: "https://medium.com/@dixitra20/the-rise-of-ai-in-everyday-life-how-artificial-intelligence-is-transforming-our-daily-experiences-1aa7bce6b9e0",
    },
    {
        id: 2,
        title: "Startups to Watch in 2025",
        description: "A look at the most promising and disruptive startups shaping this year.",
        link: "https://medium.com/@dixitra20/the-rise-of-ai-in-everyday-life-how-artificial-intelligence-is-transforming-our-daily-experiences-1aa7bce6b9e0",
    },
    {
        id: 3,
        title: "Understanding Large Language Models",
        description: "An in-depth guide to LLMs and their real-world applications.",
        link: "https://medium.com/@dixitra20/the-rise-of-ai-in-everyday-life-how-artificial-intelligence-is-transforming-our-daily-experiences-1aa7bce6b9e0",
    },
    {
        id: 4,
        title: "The Future of IoT",
        description: "How IoT is shaping the future of connected devices and smart environments.",
        link: "https://medium.com/@dixitra20/the-rise-of-ai-in-everyday-life-how-artificial-intelligence-is-transforming-our-daily-experiences-1aa7bce6b9e0",
    },
    {
        id: 5,
        title: "Cloud Computing Trends in 2025",
        description: "Emerging trends in cloud computing and their impact on the enterprise.",
        link: "https://medium.com/@dixitra20/the-rise-of-ai-in-everyday-life-how-artificial-intelligence-is-transforming-our-daily-experiences-1aa7bce6b9e0",
    },
];

const TechnologyInnovation = () => {
    return (
        <section className="bg-zinc-950 py-16 sm:py-20">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="text-center mb-10 sm:mb-14">
                    <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-3">Stay ahead</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white">Technology & Innovation</h2>
                    <p className="text-gray-500 mt-3 text-sm max-w-md mx-auto">
                        AI, software, startups, and industry trends — emerging tech topics explored in depth.
                    </p>
                    <div className="mt-4 h-px w-16 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {techTopics.map((topic, index) => {
                        const Icon = icons[index % icons.length];
                        return (
                            <a
                                key={topic.id}
                                href={topic.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-3 hover:border-orange-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-900/20 transition-all duration-300"
                            >
                                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                                    <Icon size={18} className="text-orange-400" />
                                </div>
                                <h3 className="text-white font-semibold text-base leading-snug group-hover:text-orange-100 transition-colors duration-200">
                                    {topic.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed flex-grow">{topic.description}</p>
                                <div className="flex items-center gap-1 text-orange-400 text-sm font-medium group-hover:text-orange-300 transition-colors duration-200 mt-1">
                                    Read More <FiArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
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
