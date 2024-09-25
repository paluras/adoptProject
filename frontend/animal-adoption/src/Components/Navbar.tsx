import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <>
            {/* Skip Navigation Link */}
            <a href="#main-content" className="sr-only focus:not-sr-only">
                Skip to content
            </a>
            <header className="bg-gray-800 p-4 flex gap-4 items-center">
                <h1 className="text-white text-2xl">Big Bongos</h1>

                <nav aria-label="Main navigation">
                    <ul className="flex space-x-4">
                        <li>
                            <Link
                                to="/"
                                className="text-white hover:underline focus:outline-none focus:ring-2 focus:ring-rose-400">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/add-animal"
                                className="text-white hover:underline focus:outline-none focus:ring-2 focus:ring-rose-400">
                                Add a Animal
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    );
}

export default Navbar;
