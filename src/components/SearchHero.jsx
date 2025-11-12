// src/components/SearchHero.jsx
import { useId } from "react";

export default function SearchHero({ q, onChange, total = 0, filtered = 0 }) {
  const id = useId();
  const hasQuery = (q ?? "").length > 0;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Décors (légers gradients aux couleurs du logo) */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-24 -left-16 h-56 w-56 rounded-full opacity-20 blur-2xl"
          style={{
            background: "radial-gradient(circle, #0abde3 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full opacity-15 blur-2xl"
          style={{
            background: "radial-gradient(circle, #10ac84 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rotate-12 opacity-10 blur-2xl"
          style={{
            background: "linear-gradient(135deg, #ff9f43 0%, #ee5253 100%)",
          }}
        />
      </div>

      <div className="relative z-10 p-6 md:p-7">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="h-7 w-7 rounded-md"
              style={{ background: "linear-gradient(90deg,#0abde3,#10ac84)" }}
            />
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Trouvez vos règles en un clin d’œil
            </h2>
          </div>

          {/* Stat : nombre total de règles */}
          <div className="inline-flex items-center rounded-full bg-slate-900/90 px-3 py-1 text-xs font-semibold text-white">
            {total} règle{total > 1 ? "s" : ""} disponible{total > 1 ? "s" : ""}
          </div>
        </div>

        {/* Barre de recherche pro */}
        <label htmlFor={id} className="sr-only">
          Rechercher un jeu
        </label>
        <div className="flex items-stretch gap-2">
          <div className="group relative flex-1">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              {/* Icône loupe */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="transition opacity-80 group-focus-within:opacity-100"
              >
                <path
                  d="M21 21l-4.2-4.2m1.2-5A7 7 0 1 1 5 5a7 7 0 0 1 13 6.8Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <input
              id={id}
              value={q}
              onChange={(e) => onChange?.(e.target.value)}
              placeholder="Rechercher par nom, description…"
              aria-label="Rechercher un jeu"
              className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-10 outline-none ring-0 transition placeholder:text-slate-400 focus:border-[#0abde3] focus:ring-4 focus:ring-[#0abde3]/25"
            />
            {/* Bouton effacer */}
            {hasQuery && (
              <button
                type="button"
                onClick={() => onChange?.("")}
                className="absolute inset-y-0 right-0 mr-2 inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                title="Effacer"
                aria-label="Effacer la recherche"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Raccourci Ctrl+K (desktop) */}
          <div className="hidden md:flex items-center gap-1 rounded-xl border border-slate-300 bg-white px-2">
            <kbd className="rounded-md border border-slate-300 bg-slate-50 px-1.5 py-0.5 text-xs text-slate-600">
              Ctrl
            </kbd>
            <kbd className="rounded-md border border-slate-300 bg-slate-50 px-1.5 py-0.5 text-xs text-slate-600">
              K
            </kbd>
          </div>
        </div>

        {/* Ligne d’info résultats */}
        <p className="mt-3 text-sm text-slate-600">
          {filtered} résultat{filtered > 1 ? "s" : ""} sur {total}
        </p>
      </div>
    </section>
  );
}
