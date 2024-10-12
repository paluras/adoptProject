import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/index";
import LogOutButton from "./NavBarComponents/LogOutButton";


const Navbar: React.FC = () => {

    const username: string | null = useSelector((state: RootState) => state.user.username);
    return (
        <>
            {/* Skip Navigation Link */}
            <a href="#main-content" className="sr-only focus:not-sr-only">
                Skip to content
            </a>
            <header className=" z-50 w-full sticky top-0 text-main p-4 flex gap-4 bg-background items-center">
                <h1 className=" custom-font text-2xl">Big Bongos</h1>

                <nav aria-label="Main navigation">
                    <ul className="flex space-x-4  items-center">
                        <li>
                            <Link
                                to="/"
                                className=" text-center hover:underline focus:outline-none focus:ring-2 focus:ring-rose-400">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/add-animal"
                                className="text-center hover:underline focus:outline-none focus:ring-2 focus:ring-rose-400 inline-block">
                                Add a Animal
                            </Link>
                        </li>
                        {username ?
                            <LogOutButton />
                            :
                            <>
                                <li>
                                    <Link
                                        to="/login"
                                        className=" hover:underline focus:outline-none focus:ring-2 focus:ring-rose-400">
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/register"
                                        className=" hover:underline focus:outline-none focus:ring-2 focus:ring-rose-400">
                                        Register
                                    </Link>
                                </li></>}
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
