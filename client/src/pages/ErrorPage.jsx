import { useNavigate } from "react-router-dom";
import { FiHome, FiArrowLeft } from "react-icons/fi";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                {/* Error code */}
                <p className="text-8xl sm:text-9xl font-bold text-zinc-800 select-none">404</p>

                {/* Icon */}
                <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6 -mt-6">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7 text-orange-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">Page Not Found</h1>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-gray-300 text-sm font-medium rounded-xl transition-all duration-200 w-full sm:w-auto justify-center"
                    >
                        <FiArrowLeft size={15} /> Go back
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25 w-full sm:w-auto justify-center"
                    >
                        <FiHome size={15} /> Take me home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
