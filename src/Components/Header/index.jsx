import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/0b75a56a-bd3c-4a1d-93d7-447a4991d96b.png';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-indigo-700 h-[60px] w-full text-white font-[Blinker] fixed top-0 z-50">
            <div className="flex max-w-[90%] mx-auto w-full h-full justify-between items-center">
                <img
                    src={Logo}
                    alt="logo"
                    className="w-[80px] sm:w-[8%] lg:w-[5%] transition-all duration-300"
                />

                {/* Hamburger Button for Mobile */}
                <button
                    className="lg:hidden flex flex-col justify-center items-center w-10 h-10 relative z-50"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span className={`bg-white h-0.5 w-6 mb-1 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`bg-white h-0.5 w-6 mb-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`bg-white h-0.5 w-6 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>

                {/* Navigation Menu */}
                <nav className={`
                    ${isMenuOpen ? 'flex' : 'hidden'} 
                    lg:flex absolute lg:static top-[60px] left-0 w-full lg:w-auto 
                    bg-indigo-700 lg:bg-transparent flex-col lg:flex-row 
                    items-center gap-6 lg:gap-12 py-4 lg:py-0
                    transition-all duration-300
                `}>
                    <ul className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12 text-white">
                        <li>
                            <Link
                                to="/"
                                className="text-white hover:underline text-lg"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Início
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/loja"
                                className="text-white hover:underline text-lg"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Loja
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/Cosmeticos"
                                className="text-white hover:underline text-lg"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Cosméticos
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/Diario"
                                className="text-white hover:underline text-lg"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Diário
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}