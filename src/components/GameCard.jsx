// src/components/GameCard.jsx
import { Link } from "react-router-dom";
import { withBase } from "../utils/withBase";
import ImageWithFallback from "./ImageWithFallback";

export default function GameCard({ game }) {
  const sources = [game.thumb?.webp, game.thumb?.jpg, game.thumb?.png].filter(
    Boolean
  );
  const tags = game.tags || [];

  return (
    <article className="relative rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden">
      {/* Décor subtil sur la carte (derrière le contenu) */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-24 left-1/3 h-56 w-56 rounded-full opacity-10 blur-2xl"
          style={{
            background: "radial-gradient(circle, #ff9f43 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute -bottom-24 right-0 h-64 w-64 rounded-full opacity-10 blur-2xl"
          style={{
            background: "radial-gradient(circle, #ee5253 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Vignette */}
      <div className="relative aspect-[3/2] w-full bg-slate-100 z-10">
        {sources.length ? (
          <ImageWithFallback
            alt={game.name}
            sources={sources}
            className="h-full w-full object-cover"
            onFailPlaceholder={
              <div className="h-full w-full flex items-center justify-center text-slate-400 text-sm">
                Image introuvable
              </div>
            }
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-slate-400 text-sm">
            Aucune image
          </div>
        )}
      </div>

      {/* Contenu */}
      <div className="relative z-10 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-slate-900">
              {game.name}
            </h3>
            <p className="text-sm text-slate-600 mt-1 line-clamp-3">
              {game.summary}
            </p>
          </div>
        </div>

        {!!tags.length && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#0abde3]/15 text-[#0abde3]"
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex gap-2">
          <Link
            className="inline-flex items-center justify-center px-3 py-2 rounded-xl text-sm font-semibold text-white bg-[#0abde3] hover:brightness-110 transition"
            to={`/game/${game.id}`}
          >
            Ouvrir
          </Link>
          <a
            className="inline-flex items-center justify-center px-3 py-2 rounded-xl text-sm font-medium border border-slate-300 bg-white hover:bg-slate-50 transition"
            href={withBase(game.pdf)}
            download
          >
            Télécharger
          </a>
        </div>
      </div>
    </article>
  );
}
