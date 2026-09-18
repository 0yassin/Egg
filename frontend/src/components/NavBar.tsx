import { NavLink } from "react-router-dom";
import type { NavLinkRenderProps } from "react-router-dom";

const getNavLinkClass = ({ isActive }: NavLinkRenderProps): string => (` " relative before:absolute  before:content-[''] before:block before-W-1 before:bg-black "   ${isActive} ? "font-semibold text-[var(--hightlight-text-color)]" : "text-[var(--text-color)]"`);

export function NavBar() {
  return (
    <nav className="flex items-center justify-between border-b border-[var(--border-color)] px-10 py-4 bg-[var(--bg-color)]">
      <span className="font-semibold text-2xl tracking-tight upper">Egg</span>
      <div className="flex items-center gap-20 ">
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
    </nav>
  );
}
