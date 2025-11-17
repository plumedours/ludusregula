// src/components/Header.jsx
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaDiscord } from "react-icons/fa";
import { withBase } from "../utils/withBase";

export default function Header() {
  const [open, setOpen] = useState(false);
  const iconUrl = withBase("icon.svg");

  // Empêche le scroll de la page et tout débordement quand le menu est ouvert
  useEffect(() => {
    if (open) {
      document.documentElement.style.overflowX = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflowX = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflowX = "";
      document.body.style.overflow = "";
    };
  }, [open]);

  const nav = [
    { to: "/", label: "Accueil", end: true },
    { to: "/about", label: "À propos" },
    { to: "/contribute", label: "Contribuer" },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Bandeau */}
      <div className="relative">
        <div className="bg-gradient-to-r from-[#0abde3] via-[#10ac84] to-[#0abde3]">
          <div className="max-w-6xl mx-auto h-16 px-4 flex items-center justify-between">
            {/* Logo + titre */}
            <Link to="/" className="group flex items-center gap-2">
              <img
                src={iconUrl}
                alt="LudusRegula"
                className="h-8 w-8 rounded-lg ring-1 ring-white/20 group-hover:ring-white/40 transition"
                loading="eager"
                fetchPriority="high"
              />
              <span className="text-white/95 font-semibold tracking-tight text-lg">
                LudusRegula
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden sm:flex items-center gap-2">
              {nav.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className="relative px-3 py-2 text-sm font-medium text-white/90 hover:text-white transition"
                >
                  {({ isActive }) => (
                    <span className="relative inline-flex items-center">
                      {label}
                      <span
                        className={[
                          "absolute -bottom-1 left-0 h-0.5 w-full origin-left rounded",
                          "transition-transform duration-300",
                          isActive
                            ? "scale-x-100 bg-white"
                            : "scale-x-0 bg-white/70",
                        ].join(" ")}
                      />
                    </span>
                  )}
                </NavLink>
              ))}
              <a
                href="https://discord.gg/Wffka998Xk"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-lg text-white/90 hover:bg-white/15 hover:text-white transition"
                aria-label="Rejoindre notre Discord"
              >
                <FaDiscord className="h-5 w-5" />
              </a>
            </nav>

            {/* Burger mobile */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Ouvrir le menu"
              className="sm:hidden inline-flex h-10 w-10 items-center justify-center rounded-md text-white/95 hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/30 transition"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Décors */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -top-16 -left-10 h-40 w-40 rounded-full opacity-20 blur-2xl"
            style={{
              background:
                "radial-gradient(circle, #0abde3 0%, transparent 60%)",
            }}
          />
          <div
            className="absolute -bottom-16 -right-10 h-48 w-48 rounded-full opacity-15 blur-2xl"
            style={{
              background:
                "radial-gradient(circle, #10ac84 0%, transparent 60%)",
            }}
          />
        </div>
      </div>

      {/* Overlay + Sheet */}
      <div
        className={`fixed inset-0 z-[60] transition ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/30"
          onClick={() => setOpen(false)}
        />

        {/* Panel centré, largeur bornée */}
        <div
          id="mobile-menu"
          className="absolute top-3 left-1/2 -translate-x-1/2 w-[min(92vw,560px)] max-w-full rounded-2xl bg-white shadow-xl border border-slate-200 overflow-hidden"
          role="dialog"
          aria-modal="true"
        >
          {/* Header du menu */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-sm bg-[#10ac84]" />
              <span className="font-semibold text-slate-900">Menu</span>
            </div>
            <button
              type="button"
              className="rounded-md p-2 hover:bg-slate-100"
              onClick={() => setOpen(false)}
              aria-label="Fermer le menu"
            >
              ✕
            </button>
          </div>

          {/* Liens */}
          <nav className="p-2">
            <ul className="space-y-1">
              <li>
                <NavLink
                  to="/"
                  className="block rounded-lg px-3 py-3 text-slate-900 hover:bg-slate-50"
                  onClick={() => setOpen(false)}
                >
                  Accueil
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="block rounded-lg px-3 py-3 text-slate-900 hover:bg-slate-50"
                  onClick={() => setOpen(false)}
                >
                  À propos
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contribute"
                  className="block rounded-lg px-3 py-3 text-slate-900 hover:bg-slate-50"
                  onClick={() => setOpen(false)}
                >
                  Contribuer
                </NavLink>
              </li>
              <li>
                <a
                  href="https://discord.gg/Wffka998Xk"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-lg px-3 py-3 hover:bg-slate-50"
                  onClick={() => setOpen(false)}
                >
                  <span className="text-slate-900">Rejoindre Discord</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
