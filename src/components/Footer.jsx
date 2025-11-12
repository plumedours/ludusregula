import { FaGithub, FaDiscord, FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-linear-to-b from-slate-100 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Section principale */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* À propos */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">LudusRegula</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Votre plateforme communautaire pour partager et découvrir
              des règles de jeux de société.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/"
                  className="text-slate-600 hover:text-[#0abde3] transition"
                >
                  Accueil
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-slate-600 hover:text-[#0abde3] transition"
                >
                  À propos
                </a>
              </li>
              <li>
                <a
                  href="/contribute"
                  className="text-slate-600 hover:text-[#0abde3] transition"
                >
                  Contribuer
                </a>
              </li>
            </ul>
          </div>

          {/* Communauté */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">Communauté</h3>
            <div className="flex gap-3">
              <a
                href="https://github.com/plumedours"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href="https://discord.gg/Wffka998Xk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#5865F2] text-white hover:bg-[#4752C4] transition-colors"
                aria-label="Discord"
              >
                <FaDiscord className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-slate-200 pt-6">
          <p className="flex items-center justify-center gap-1.5 text-sm text-slate-600">
            © {new Date().getFullYear()} LudusRegula — Créé avec{" "}
            <FaHeart className="h-3.5 w-3.5 text-red-500" /> par Maxime Bory
          </p>
        </div>
      </div>
    </footer>
  );
}
