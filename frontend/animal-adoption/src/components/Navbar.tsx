import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/index";
import LogOutButton from "./NavBarComponents/LogOutButton";

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const username: string | null = useSelector((state: RootState) => state.user.username);
    const navRef = useRef<HTMLDivElement>(null);
    // const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <a href="#main-content" className="sr-only focus:not-sr-only">
                Skip to content
            </a>
            <header className="z-50 w-full sticky top-0 text-main p-4 bg-background" ref={navRef}>
                <div className="container mx-auto flex justify-between items-center">
                    <Link to="/" onClick={closeMenu} className="hover:opacity-80 transition-opacity duration-300">
                        <h1 className="custom-font text-2xl">Big Bongos</h1>
                    </Link>

                    <button
                        className="lg:hidden transition-transform duration-300 ease-in-out"
                        onClick={toggleMenu}
                        aria-expanded={isMenuOpen}
                        aria-controls="main-menu"
                    >
                        <span className="sr-only">Toggle menu</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className={`w-6 h-6 transform ${isMenuOpen ? 'rotate-90' : ''}`}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>

                    <nav
                        aria-label="Main navigation"
                        className={`
                            lg:static lg:block
                            absolute left-0 right-0 top-full bg-background  shadow-md lg:shadow-none
                            transition-all duration-300 ease-in-out
                            ${isMenuOpen ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 lg:opacity-100 lg:max-h-full'}
                            overflow-hidden
                        `}
                        id="main-menu"
                    >
                        <ul className="flex flex-col lg:flex-row lg:space-x-4 space-y-2 lg:space-y-0 items-center py-4 lg:py-0">
                            <li>
                                <Link to="/" onClick={closeMenu} className="block text-center hover:underline focus:outline-none focus:ring-2 focus:ring-rose-400 px-4 py-2">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/add-animal" onClick={closeMenu} className="block text-center hover:underline focus:outline-none focus:ring-2 focus:ring-rose-400 px-4 py-2">
                                    Add an Animal
                                </Link>
                            </li>
                            {username ? (
                                <>
                                    <LogOutButton />
                                    <li className="px-4 py-2">{username}</li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/login" onClick={closeMenu} className="block hover:underline focus:outline-none focus:ring-2 focus:ring-rose-400 px-4 py-2">
                                            Login
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/register" onClick={closeMenu} className="block hover:underline focus:outline-none focus:ring-2 focus:ring-rose-400 px-4 py-2">
                                            Register
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
}

export default Navbar;