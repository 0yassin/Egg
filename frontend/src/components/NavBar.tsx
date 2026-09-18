import { NavLink } from "react-router-dom";
import type { NavLinkRenderProps } from "react-router-dom";
import Button from "./botton";

const getNavLinkClass = ({ isActive }: NavLinkRenderProps): string =>
  `relative inline-block py-1 transition-colors before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:h-[2px] before:w-full before:bg-black before:-translate-x-1/2 before:scale-x-0 before:transition-transform before:duration-300 before:ease-out hover:before:scale-x-100 ${
    isActive ? "font-semibold text-[var(--hightlight-text-color)] " : "text-[var(--text-color)]"
  }`;

export function NavBar() {
  return (
    <nav className="flex items-center justify-between border-b border-[var(--border-color)] px-10 py-4 bg-[var(--bg-color)]">
      <span className="font-semibold text-2xl tracking-tight upper inline-block ">Egg</span>
      <div className="flex items-center justify-center gap-20">
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
      <div className="flex items-center justify-center gap-5">
        <NavLink to="/register">
        <Button variant="secondary">Start To Plant</Button>
        </NavLink>
        {/* <Button variant="secondary">Login</Button> */}
      </div>
    </nav>
  );
}
