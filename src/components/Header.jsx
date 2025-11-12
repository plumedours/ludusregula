// src/components/Header.jsx
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaDiscord } from "react-icons/fa";
import { withBase } from "../utils/withBase";

export default function Header() {
  const [open, setOpen] = useState(false);
  const iconUrl = withBase("icon.svg");

  const nav = [
    { to: "/", label: "Accueil", end: true },
    { to: "/about", label: "À propos" },
    { to: "/contribute", label: "Contribuer" },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* Bandeau dégradé animé + léger décor */}
      <div className="relative">
        <div className="bg-linear-to-r from-[#0abde3] via-[#10ac84] to-[#0abde3]">
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
                  className={({ isActive }) =>
                    [
                      "relative px-3 py-2 text-sm font-medium text-white/90",
                      "hover:text-white transition",
                    ]
                      .filter(Boolean)
                      .join(" ")
                  }
                >
                  {({ isActive }) => (
                    <span className="relative inline-flex items-center">
                      {label}
                      {/* Soulignement animé (état actif) */}
                      <span
                        className={[
                          "absolute -bottom-1 left-0 h-0.5 w-full origin-left rounded",
                          "transition-transform duration-300",
                          isActive
                            ? "scale-x-100 bg-white"
                            : "scale-x-0 bg-white/70 group-hover:scale-x-100",
                        ].join(" ")}
                      />
                    </span>
                  )}
                </NavLink>
              ))}

              {/* Discord link */}
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
              className="sm:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl text-white/95 hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/30 transition"
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

        {/* Décors subtils */}
        <div className="pointer-events-none absolute inset-0">
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

      {/* Overlay + panneau mobile */}
      {/* Overlay (cliquable pour fermer) */}
      <div
        className={[
          "sm:hidden fixed inset-0 bg-black/40 transition-opacity",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={() => setOpen(false)}
      />

      {/* Menusheet */}
      <div
        id="mobile-menu"
        className={[
          "sm:hidden fixed top-0 left-0 right-0 z-50",
          "origin-top transform transition-transform duration-300",
          open ? "translate-y-0" : "-translate-y-full",
        ].join(" ")}
      >
        <div className="bg-white rounded-b-2xl shadow-xl border border-slate-200">
          <div className="max-w-6xl mx-auto px-4 pt-4 pb-6">
            {/* En-tête sheet */}
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={iconUrl} alt="" className="h-7 w-7 rounded-lg" />
                <span className="font-semibold text-slate-900">Menu</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
                aria-label="Fermer le menu"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Liens */}
            <nav className="flex flex-col gap-1">
              {nav.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    [
                      "block rounded-xl px-3 py-3 text-base font-medium transition",
                      isActive
                        ? "bg-slate-900 text-white"
                        : "text-slate-800 hover:bg-slate-100",
                    ].join(" ")
                  }
                >
                  {label}
                </NavLink>
              ))}

              {/* Discord link mobile */}
              <a
                href="https://discord.gg/Wffka998Xk"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-3 text-base font-medium text-slate-800 hover:bg-slate-100 transition"
              >
                <FaDiscord className="h-5 w-5" />
                <span>Rejoindre Discord</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
