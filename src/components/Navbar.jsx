import React, { useContext, useEffect, useState } from "react";

import { FiMenu } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";

const unAuthorizedNavlinks = [
  {
    label: "Registration",
    link: "/registration",
  },
  {
    label: "Login",
    link: "/login",
  },
];

const authorizedNavlinks = [
  {
    label: "About",
    link: "/about",
  },
  {
    label: "Setting",
    link: "/settings",
  },
];

export default function Navbar() {
  const [isSideMenuOpen, setMenu] = useState(false);
  const { isAuthenticated } = useContext(authContext);
  const [navLinks, setNavLinks] = useState([]);

  useEffect(() => {
    setNavLinks(isAuthenticated ? authorizedNavlinks : unAuthorizedNavlinks);
  }, [isAuthenticated]);

  return (
    <main>
      <nav className="flex justify-between px-8 items-center py-6 bg-blue-800">
        <div className="flex items-center gap-8">
          <section className="flex items-center gap-4">
            {/* menu */}
            <FiMenu
              onClick={() => setMenu(true)}
              className="text-3xl cursor-pointer lg:hidden"
            />
            {/* logo */}
            <Link to={"/"} className="text-white text-4xl font-mono">
              Todos-App
            </Link>
          </section>
          {navLinks?.length > 0 &&
            navLinks.map((d, i) => (
              <Link
                key={i}
                className="hidden lg:block text-white font-bold"
                to={d.link}
              >
                {d.label}
              </Link>
            ))}
        </div>

        {/* sidebar mobile menu */}
        <div
          className={clsx(
            " fixed h-full w-screen lg:hidden bg-black/50  backdrop-blur-sm top-0 right-0  -translate-x-full  transition-all ",
            isSideMenuOpen && "translate-x-0"
          )}
        >
          <section className="text-black bg-white flex-col absolute left-0 top-0 h-screen p-8 gap-8 z-50 w-56 flex  ">
            <IoCloseOutline
              onClick={() => setMenu(false)}
              className="mt-0 mb-8 text-3xl cursor-pointer"
            />

            {navLinks?.length > 0 &&
              navLinks.map((d, i) => (
                <Link key={i} className="font-bold" to={d.link}>
                  {d.label}
                </Link>
              ))}
          </section>
        </div>

        {/* last section */}
        <section className="flex items-center gap-4">
          {/* cart icon */}
          <AiOutlineShoppingCart className="text-3xl text-white" />
          <img
            width={40}
            height={40}
            className="h-8 w-8 rounded-full "
            src="https://i.pravatar.cc/150?img=52"
            alt="avatar-img"
          />
          {/* avtar img */}
        </section>
      </nav>
      {/* <hr className="" /> */}
    </main>
  );
}
