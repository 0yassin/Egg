import { NavLink } from "react-router-dom";
import type { NavLinkRenderProps } from "react-router-dom";
import Button from "./botton";
import { useState } from "react";

const getNavLinkClass = ({ isActive }: NavLinkRenderProps): string =>
  `relative inline-block py-1 transition-colors text-md before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:h-[2px] before:w-full before:bg-black before:-translate-x-1/2 before:scale-x-0 before:transition-transform before:duration-300 before:ease-out hover:before:scale-x-100 ${
    isActive ? "font-semibold text-[var(--hightlight-text-color)] " : "text-[var(--text-color)]"
  }`;

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav className="relative font-poppins flex items-center justify-between border-b border-(--border-color) px-6 md:px-10 py-4 bg-(--bg-color)">
      <span className="font-semibold text-2xl tracking-tight uppercase inline-block text-(--accent-blue)">
        Egg
      </span>
      <div className="hidden md:flex items-center justify-center md:gap-10 lg:gap-20">
        <NavLink to="/" className={getNavLinkClass}>
          Home
        </NavLink>
        <NavLink to="/farm" className={getNavLinkClass}>
          My Farm
        </NavLink>
        <NavLink to="/account" className={getNavLinkClass}>
          Account
        </NavLink>
      </div>
      <div className="hidden md:flex items-center justify-center gap-5">
        <NavLink to="/register">
          <Button variant="secondary">Start To Plant</Button>
        </NavLink>
      </div>
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className="text-(--text-color) focus:outline-none p-2 cursor-pointer"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>
      {isMenuOpen && (
        <div className="absolute text-[20px] top-full left-0 w-full bg-(--bg-color) border border-(--border-color) rounded-b-2xl flex flex-col items-center py-4 md:hidden z-50 shadow-lg">
            <NavLink to="/" onClick={()=>toggleMenu()} className="border-t border-(--light-brown) text-(--light-brown) hover:bg-(--light-brown) hover:text-(--bg-color) transition-all p-4 w-full cursor-pointer  px-6">
              Home
            </NavLink>
            <NavLink to="/farm" onClick={()=>toggleMenu()} className="border-t border-(--light-brown) text-(--light-brown) hover:bg-(--light-brown) hover:text-(--bg-color) transition-all p-4 w-full cursor-pointer  px-6">
              My Farm
            </NavLink>
          <NavLink to="/account" onClick={()=>toggleMenu()} className="border-b border-t border-(--light-brown) text-(--light-brown) hover:bg-(--light-brown) hover:text-(--bg-color) transition-all p-4 w-full cursor-pointer px-6">
            Account
          </NavLink>
          <NavLink to="/register" onClick={()=>toggleMenu()} className="mt-4">
            <Button variant="secondary">Start To Plant</Button>
          </NavLink>
        </div>
      )}
    </nav>
  );
}
