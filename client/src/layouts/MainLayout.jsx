import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const MainLayout = () => {

    useEffect(() => {
        Aos.init({
            duration: 1200,
            easing: "ease-in-out",
            once: true,
        });
    }, []);


    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default MainLayout;
