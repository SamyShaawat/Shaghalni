import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenuOnMaximize = () => {
    if (window.innerWidth > 768 && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", closeMenuOnMaximize);
    return () => {
      window.removeEventListener("resize", closeMenuOnMaximize);
    };
  }, [isMenuOpen]);

  const navItems = [
    { path: "/", title: "Start a search" },
    { path: "/my-job", title: "My Jobs" },
    { path: "/salary", title: "Salary Estimate" },
    { path: "/post-job", title: "Post A Job" },
  ];

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-center py-6">
        {/* logo */}
        <a href="/" className="flex items-center gap-2 text-2xl text-black">
          <img src="../images/Logo.png" alt="" />
          <span>Shaghalni</span>
        </a>

        {/* nav items for large devices */}
        <ul className="hidden lg:flex gap-12">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-primary">
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* signup and login btn */}
        <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
          <Link to="/login" className="py-2 px-5 border rounded">
            Log in
          </Link>
          <Link
            to="/sign-up"
            className="py-2 px-5 border rounded bg-blue text-white"
          >
            Sign up
          </Link>
        </div>

        {/* mobile menu */}
        <div className="lg:hidden block">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-primary" />
            ) : (
              <FaBarsStaggered className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>
      </nav>

      {/* mobile menu items */}
      <div
        className={`px-4 bg-black py-5 rounded-sm ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <ul>
          {navItems.map(({ path, title }) => (
            <li
              key={path}
              className="text-base text-white first:text-white py-1"
            >
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
          <li className="text-base text-white first:text-white py-1">
            <Link to="/login" className="">
              Log in
            </Link>
          </li>
          <li className="text-base text-white first:text-white py-1">
            <Link to="/sign-up" className="">
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
