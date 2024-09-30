import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/index";

const Navbar: React.FC = () => {

    const username = useSelector((state: RootState) => state.user.username)

    console.log(username);
    return (
        <>
            {/* Skip Navigation Link */}
            <a href="#main-content" className="sr-only focus:not-sr-only">
                Skip to content
            </a>
            <header className="bg-slate-100 p-4 flex gap-4 items-center">
                <h1 className=" text-2xl">Big Bongos</h1>

                <nav aria-label="Main navigation">
                    <ul className="flex space-x-4">
                        <li>
                            <Link
                                to="/"
                                className=" hover:underline focus:outline-none focus:ring-2 focus:ring-rose-400">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/add-animal"
                                className=" hover:underline focus:outline-none focus:ring-2 focus:ring-rose-400">
                                Add a Animal
                            </Link>
                        </li>
                        {username ?
                            <li>
                                <button className=" hover:underline focus:outline-none focus:ring-2 focus:ring-rose-400">Logout</button>
                            </li> :
                            <li>
                                <Link
                                    to="/login"
                                    className=" hover:underline focus:outline-none focus:ring-2 focus:ring-rose-400">
                                    Login
                                </Link>
                            </li>}
                        {username ? <li>
                            {username}
                        </li> : null}

                    </ul>
                </nav>
            </header>
        </>
    );
}

export default Navbar;
