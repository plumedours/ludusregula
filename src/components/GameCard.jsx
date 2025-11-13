// src/components/GameCard.jsx
import { Link } from "react-router-dom";
import { withBase } from "../utils/withBase";
import ImageWithFallback from "./ImageWithFallback";
import { FiEye, FiDownload, FiYoutube, FiGlobe } from "react-icons/fi";

export default function GameCard({ game }) {
  const sources = [game.thumb?.webp, game.thumb?.jpg, game.thumb?.png].filter(
    Boolean
  );
  const tags = game.tags || [];
  const has = (s) => typeof s === "string" && s.trim().length > 0;
  const siteUrl = game?.rules?.official?.site_url || "";
  const isHosted = game?.rules?.type === "hosted" && has(game?.rules?.pdf);
  const pdfUrl = isHosted ? withBase(game.rules.pdf) : "";
  const videoUrl = game?.rules?.links?.video_url || "";
  const publisher = game?.rules?.official?.publisher || "";

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
      <div className="relative aspect-3/2 w-full bg-slate-100 z-10">
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
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                {game.name}
              </h3>
              <p className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-[#10ac84]/15 text-[#10ac84]">
                {publisher}
              </p>
            </div>
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

        <div className="mt-4 flex flex-wrap gap-4 justify-center">
          {/* Voir (toujours) */}
          <Link
            to={`/game/${game.id}`}
            className="btn-action-primary relative group"
            aria-label="Voir la fiche"
          >
            <FiEye className="h-6 w-6" />
            <span
              className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 
                     bg-gray-800 text-white text-xs rounded px-2 py-1 
                     opacity-0 group-hover:opacity-100 transition-opacity 
                     pointer-events-none whitespace-nowrap shadow-lg"
            >
              Voir la fiche
            </span>
          </Link>

          {/* Télécharger (si PDF hébergé) */}
          {isHosted && (
            <a
              href={pdfUrl}
              download
              className="btn-action relative group"
              aria-label="Télécharger le PDF"
            >
              <FiDownload className="h-6 w-6" />
              <span
                className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 
                       bg-gray-800 text-white text-xs rounded px-2 py-1 
                       opacity-0 group-hover:opacity-100 transition-opacity 
                       pointer-events-none whitespace-nowrap shadow-lg"
              >
                Télécharger le PDF
              </span>
            </a>
          )}

          {/* Vidéo (si lien) */}
          {has(videoUrl) && (
            <a
              href={videoUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-action relative group"
              aria-label="Voir la vidéo d’explication"
            >
              <FiYoutube className="h-6 w-6" />
              <span
                className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 
                       bg-gray-800 text-white text-xs rounded px-2 py-1 
                       opacity-0 group-hover:opacity-100 transition-opacity 
                       pointer-events-none whitespace-nowrap shadow-lg"
              >
                Voir la vidéo
              </span>
            </a>
          )}

          {/* Site officiel (toujours) */}
          <a
            href={siteUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-action relative group"
            aria-label="Aller au site officiel"
          >
            <FiGlobe className="h-6 w-6" />
            <span
              className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 
                     bg-gray-800 text-white text-xs rounded px-2 py-1 
                     opacity-0 group-hover:opacity-100 transition-opacity 
                     pointer-events-none whitespace-nowrap shadow-lg"
            >
              Site officiel
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}
