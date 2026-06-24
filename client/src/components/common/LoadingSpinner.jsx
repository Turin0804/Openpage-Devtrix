const LoadingSpinner = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-white dark:bg-zinc-950 gap-4">
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-zinc-800"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 animate-spin"></div>
            </div>
            <p className="text-gray-400 dark:text-zinc-500 text-sm tracking-widest uppercase animate-pulse">Loading…</p>
        </div>
    );
};

export default LoadingSpinner;
