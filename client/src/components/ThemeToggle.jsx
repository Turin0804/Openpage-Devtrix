import { useEffect, useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";

const ThemeToggle = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <button
            onClick={toggleTheme}
            className="bg-indigo-500 text-white p-2 rounded-full flex items-center gap-2"
        >
            {theme === "light" ? <IoMoon size={20} /> : <IoSunny size={20} />}
        </button>
    );
};

export default ThemeToggle;
