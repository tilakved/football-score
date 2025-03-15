import { useState, useEffect } from "react";
import {
    Home,
    Trophy,
    Bell,
    Users,
    Settings,
    Download,
    Sun,
    Moon,
    Search,
    Shield,
    LogOut,
    User,
    Speaker,
    MessageCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function Sidebar() {
    const [darkMode, setDarkMode] = useState(false);

    // Apply theme on first load
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        
        if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
            document.documentElement.classList.add("dark");
            setDarkMode(true);
        } else {
            document.documentElement.classList.remove("dark");
            setDarkMode(false);
        }
    }, []);

    // Toggle Dark Mode
    const toggleTheme = (mode: "light" | "dark") => {
        if (mode === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setDarkMode(true);
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setDarkMode(false);
        }
    };

    return (
        <aside className="text-black dark:text-white w-64 p-4 flex flex-col bg-gray-100 dark:bg-gray-900 rounded-2xl">
            {/* Logo */}
            <h2 className="text-2xl font-bold mb-4">
                FOOTBALL<span className="text-primary">SHURU</span>
            </h2>

            {/* Search Bar */}
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                    type="text"
                    placeholder="Search"
                    className="pl-10 bg-gray-200 dark:bg-darker text-black dark:text-white border-none h-10 rounded-lg text-center placeholder:text-gray-500"
                />
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
                <SidebarItem icon={<Home size={22} />} label="Home" active />
                <SidebarItem icon={<Users size={22} />} label="Leader Board" />
                <SidebarItem icon={<Speaker size={22} />} label="Ground" />
                <SidebarItem icon={<MessageCircle size={22} />} label="Chat" />
                <SidebarItem icon={<Bell size={22} />} label="Notification" />
            </nav>

            <Separator className="my-2 bg-gray-300 dark:bg-darker" />

            {/* Followed Sections */}
            <SidebarItem icon={<Shield size={22} />} label="Followed Team" />
            <SidebarItem icon={<User size={22} />} label="Followed Players" />
            <SidebarItem icon={<Speaker size={22} />} label="Followed Ground" />

            <Separator className="my-2 bg-gray-300 dark:bg-darker" />

            {/* Settings & Download */}
            <SidebarItem icon={<Settings size={22} />} label="Settings" />
            <SidebarItem icon={<Download size={22} />} label="Download The App" />

            {/* Light/Dark Mode Toggle */}
            <div className="flex items-center justify-between bg-gray-600 p-1 rounded-full my-4">
                <button
                    className={`flex items-center space-x-2 px-4 py-1 rounded-full transition-all ${
                        !darkMode ? "bg-black text-white" : "text-gray-400"
                    }`}
                    onClick={() => toggleTheme("light")}
                >
                    <Sun size={18} className="text-yellow-400" />
                    <span>Light</span>
                </button>

                <button
                    className={`flex items-center space-x-2 px-4 py-1 rounded-full transition-all ${
                        darkMode ? "bg-black text-white" : "text-gray-400"
                    }`}
                    onClick={() => toggleTheme("dark")}
                >
                    <Moon size={18} className="text-gray-400" />
                    <span>Dark</span>
                </button>
            </div>

            <Separator className="my-2 bg-gray-300 dark:bg-darker" />

            {/* Profile Section */}
            <div className="mt-auto flex items-center bg-gray-800 dark:bg-gray-700 p-3 rounded-xl">
                {/* User Avatar */}
                <div className="w-10 h-10 flex items-center justify-center bg-primary rounded-lg">
                    <User size={20} className="text-black dark:text-gray-900" />
                </div>

                {/* User Details */}
                <div className="ml-3 flex-1">
                    <p className="text-sm font-semibold text-white">Varun_kubal</p>
                    <p className="text-xs text-gray-400">varun_kubal@gmail.com</p>
                </div>

                {/* Logout Button */}
                <button className="ml-2 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-primary transition">
                    <LogOut size={20} />
                </button>
            </div>
        </aside>
    );
}

// Sidebar Item Component
const SidebarItem = ({
    icon,
    label,
    active,
    onClick,
}: {
    icon: JSX.Element;
    label: string;
    active?: boolean;
    onClick?: () => void;
}) => (
    <div
        className={`relative flex items-center space-x-2 px-3 py-2 rounded-md cursor-pointer transition ${
            active ? "text-primary font-bold dark:text-white dark:bg-gray-700" : "hover:bg-gray-200 dark:hover:bg-gray-800"
        }`}
        onClick={onClick}
    >
        {active && <div className="absolute left-0 w-2 h-full bg-primary rounded-r-full"></div>}
        {icon}
        <span className="text-sm">{label}</span>
    </div>
);
