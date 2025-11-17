// src/components/Footer.jsx
import { FaGithub, FaDiscord, FaHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-gradient-to-b from-slate-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Bloc intro */}
          <section className="min-w-0">
            <h3 className="font-semibold text-slate-900 mb-3">LudusRegula</h3>
            <p className="text-sm leading-relaxed text-slate-600 break-words">
              Votre plateforme communautaire pour partager et découvrir des
              règles de jeux de société.
            </p>
          </section>

          {/* Navigation interne */}
          <section className="min-w-0">
            <h3 className="font-semibold text-slate-900 mb-3">Navigation</h3>
            <nav>
              <ul className="rounded-md overflow-hidden space-y-2 md:bg-transparent">
                <li className="">
                  <NavLink
                    to="/"
                    className="block px-3 text-sm text-slate-700 hover:text-[#0abde3] transition"
                  >
                    Accueil
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className="block px-3 text-sm text-slate-700 hover:text-[#0abde3] transition"
                  >
                    À propos
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contribute"
                    className="block px-3 text-sm text-slate-700 hover:text-[#0abde3] transition"
                  >
                    Contribuer
                  </NavLink>
                </li>
              </ul>
            </nav>
          </section>

          {/* Communauté / Réseaux */}
          <section className="min-w-0">
            <h3 className="font-semibold text-slate-900 mb-3">Communauté</h3>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/plumedours"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-sm bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98] transition"
                aria-label="GitHub"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href="https://discord.gg/Wffka998Xk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-sm bg-[#5865F2] text-white hover:bg-[#4752C4] active:scale-[0.98] transition"
                aria-label="Discord"
              >
                <FaDiscord className="h-5 w-5" />
              </a>
            </div>
          </section>
        </div>

        {/* Bas de page */}
        <div className="mt-8 border-t border-slate-200 pt-6">
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-slate-600">
            <span>© {new Date().getFullYear()} LudusRegula</span>
            <span className="hidden sm:inline">—</span>
            <span className="inline-flex items-center gap-1">
              Créé avec <FaHeart className="h-3.5 w-3.5 text-red-500" /> par{" "}
              <a
                className="underline decoration-[#0abde3]/40 hover:decoration-[#0abde3]"
                href="https://github.com/plumedours"
                target="_blank"
                rel="noreferrer"
              >
                Maxime Bory
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
