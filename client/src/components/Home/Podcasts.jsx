const Podcasts = () => {
    const podcasts = [
        {
            id: 1,
            title: "Tech Innovations",
            description: "Exploring the latest in technology and innovation.",
            link: "https://youtu.be/y8NtMZ7VGmU?si=0WY9jOLheWqLGstB",
        },
        {
            id: 2,
            title: "Business Insights",
            description: "In-depth discussions with industry leaders.",
            link: "https://youtu.be/bNpx7gpSqbY?si=H8y1swCjyTASCuvP",
        },
        {
            id: 3,
            title: "Political Analysis",
            description: "Analyzing the latest political developments.",
            link: "https://youtu.be/yqc9zX04DXs?si=0OsfBEhN5FI05yHo",
        },
    ];

    return (
        <div className="bg-indigo-50 py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-2">
                    Interviews & Podcasts
                </h2>
                <p className="text-center text-gray-600 mb-8">
                    Expanding our media beyond text-based news.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {podcasts.map((podcast) => (
                        <div
                            key={podcast.id}
                            className="bg-white p-6 rounded-lg shadow-md flex flex-col"
                        >
                            <h3 className="text-xl font-semibold mb-2">
                                {podcast.title}
                            </h3>
                            <p className="text-gray-600 mb-4 flex-grow">
                                {podcast.description}
                            </p>
                            <a
                                href={podcast.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-600 hover:text-indigo-800"
                            >
                                Listen Now
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Podcasts;
