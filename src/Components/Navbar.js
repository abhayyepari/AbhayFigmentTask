import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBarsStaggered, FaBlog, FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSticky, setSticky] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const location = useLocation();

  // Toggle Menu
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  //Navigation Items
  const navItems = [
    { path: "/", link: "News" },
    { path: "/stocks", link: "Stocks" },
    { path: "/market", link: "Market" },
    { path: "/screener", link: "Screener" },
  ];

  return (
    <header className="w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300">
      <nav className={`py-4 lg:px-24 px-4 ${isSticky ? "sticky top-0 left-0 right-0 bg-blue-300" : "bg-blue-100"}`}>
        <div className="flex justify-between items-center text-base gap-8">
          <Link to='/' className="text-2xl font-bold text-blue-700 flex items-center gap-2">Yahoo Finance</Link>
          <ul className="md:flex space-x-12 hidden">
            {navItems.map(({ link, path }) => (
              <Link
                key={path}
                to={path}
                className={`block text-base uppercase cursor-pointer hover:text-blue-700 ${activeLink === path ? 'text-blue-700 font-bold' : 'text-black'}`}
              >
                {link}
              </Link>
            ))}
          </ul>

          {/* Menu btn For Mobile */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-black focus:outline-none">
              {isMenuOpen ? (
                <FaXmark className="h-5 w-5 text-black" />
                ) : (
                  <FaBarsStaggered className="h-5 w-5 text-black" />
                )}
            </button>
          </div>
        </div>

        {/* navItems For mobile */}
        <div className={`space-y-4 px-4 mt-16 py-7 bg-blue-700 ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
          {
            navItems.map(({ link, path }) => (
              <Link
                key={path}
                to={path}
                className={`block text-base uppercase cursor-pointer ${activeLink === path ? 'text-blue-300' : 'text-white'}`}
              >
                {link}
              </Link>
            ))
          }
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
