import { NavLink } from "react-router-dom";
import type { NavLinkRenderProps } from "react-router-dom";

const getNavLinkClass = ({ isActive }: NavLinkRenderProps): string => (isActive ? "font-semibold text-[var(--accent-color)]" : "text-[var(--text-color)]");

export function NavBar() {
  return (
    <nav className="flex items-center justify-between border-b border-[var(--border-color)] px-8 py-4">
      <NavLink to="/" className={getNavLinkClass}>
        Home
      </NavLink>
    </nav>
  );
}
