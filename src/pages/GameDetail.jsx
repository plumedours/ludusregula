// src/pages/GameDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PdfViewer from "../components/PdfViewer";
import { withBase } from "../utils/withBase";
import {
  IoShareSocialSharp,
  IoArrowBack,
  IoDocumentText,
  IoGlobeOutline,
  IoLogoYoutube,
  IoBookOutline,
} from "react-icons/io5";

export default function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(withBase("/data/games.json"))
      .then((r) => r.json())
      .then((list) => setGame(list.find((g) => g.id === id) || null));
  }, [id]);

  if (!game) return <div className="p-4">Chargement…</div>;

  const has = (s) => typeof s === "string" && s.trim().length > 0;

  const shareGame = async () => {
    const shareUrl = window.location.href;
    const title = game.name;
    const text = `Découvrez les règles de "${game.name}" sur LudusRegula !`;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
      } catch {
        /* utilisateur a annulé */
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (err) {
        console.error("Erreur lors de la copie :", err);
      }
    }
  };

  return (
    <div className="space-y-5">
      {/* Header fiche */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-semibold rounded-md bg-[#10ac84]/15 text-[#10ac84]">
            PDF
          </span>
          <h1 className="text-2xl font-bold tracking-tight">{game.name}</h1>
        </div>

        {/* Boutons d’action */}
        <div className="flex items-center gap-2">
          <button
            onClick={shareGame}
            className="relative group inline-flex items-center justify-center rounded-md border border-slate-300 bg-white p-2 text-slate-700 hover:bg-slate-50 transition"
            aria-label="Partager cette fiche"
          >
            <IoShareSocialSharp className="h-5 w-5" />
            <span className="tooltip">
              {copied ? "Lien copié !" : "Partager"}
            </span>
          </button>

          <Link
            to="/"
            className="relative group inline-flex items-center justify-center rounded-md border border-slate-300 bg-white p-2 hover:bg-slate-50 transition"
            aria-label="Retour à la liste"
          >
            <IoArrowBack className="h-5 w-5" />
            <span className="tooltip">Retour</span>
          </Link>
        </div>
      </div>

      {/* Description */}
      <div className="rounded-2xl p-5 bg-white border border-slate-200 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-900">Description</h3>
        <div>{game.summary}</div>

        {/* Liens externes affichés tout le temps */}
        <div className="mt-3 flex flex-wrap gap-2">
          {has(game.rules?.official.site_url) && (
            <a
              href={game.rules.external_url}
              target="_blank"
              rel="noreferrer"
              className="relative group inline-flex items-center justify-center rounded-md bg-[#10ac84] p-2 text-white hover:brightness-110 transition"
              aria-label="Site officiel"
            >
              <IoGlobeOutline className="h-5 w-5" />
              <span className="tooltip">Site officiel</span>
            </a>
          )}

          {has(game.rules?.links?.rules_url) && (
            <a
              href={game.rules.links.rules_url}
              target="_blank"
              rel="noreferrer"
              className="relative group inline-flex items-center justify-center rounded-md border border-slate-300 bg-white p-2 hover:bg-slate-50 transition"
              aria-label="Page officielle des règles"
            >
              <IoDocumentText className="h-5 w-5" />
              <span className="tooltip">Page des règles</span>
            </a>
          )}

          {has(game.rules?.links?.video_url) && (
            <a
              href={game.rules.links.video_url}
              target="_blank"
              rel="noreferrer"
              className="relative group inline-flex items-center justify-center rounded-md border border-slate-300 bg-white p-2 hover:bg-slate-50 transition"
              aria-label="Vidéo d’explication"
            >
              <IoLogoYoutube className="h-5 w-5" />
              <span className="tooltip">Vidéo d’explication</span>
            </a>
          )}
        </div>

        {/* Mention source */}
        {(has(game.rules?.official?.publisher) ||
          has(game.rules?.official?.site_url)) && (
          <p className="mt-3 text-xs text-slate-500">
            Source : {game.rules.official.publisher || "Éditeur"} ·{" "}
            {has(game.rules.official.site_url) ? (
              <a
                className="underline"
                href={game.rules.official.site_url}
                target="_blank"
                rel="noreferrer"
              >
                {game.rules.official.site_url}
              </a>
            ) : (
              "Site éditeur"
            )}
          </p>
        )}
      </div>

      {/* Section règle — hébergée ou non */}
      {game.rules?.type === "hosted" && has(game.rules?.pdf) ? (
        <PdfViewer
          file={withBase(game.rules.pdf)}
          links={{
            site: game.rules.offical?.site_url,
            video: game.rules.links?.video_url,
            quickstart: game.rules.links?.quickstart_url,
          }}
        />
      ) : (
        <div className="rounded-2xl p-5 bg-white border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">
            Règle indisponible
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Nous n’avons pas l’autorisation de diffuser cette règle ici.
          </p>
        </div>
      )}

      {/* Style tooltip */}
      <style>{`
        .tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background-color: #1f2937;
          color: #fff;
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          opacity: 0;
          pointer-events: none;
          white-space: nowrap;
          transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;
          margin-bottom: 0.25rem;
        }
        .group:hover .tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(-2px);
        }
      `}</style>
    </div>
  );
}
