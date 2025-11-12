// src/pages/GameDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PdfViewer from "../components/PdfViewer";
import { withBase } from "../utils/withBase";
import { IoShareSocialSharp } from "react-icons/io5";

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

  const fileUrl = withBase(game.pdf);

  const shareGame = async () => {
    const shareUrl = window.location.href;
    const title = game.name;
    const text = `Découvrez les règles de "${game.name}" sur LudusRegula !`;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
      } catch {
        /* user canceled */
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
        <div>{game.summary}</div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-semibold rounded-md bg-[#10ac84]/15 text-[#10ac84]">
            PDF
          </span>
          <h1 className="text-2xl font-bold tracking-tight">{game.name}</h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={shareGame}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
            title="Partager cette fiche"
          >
            <IoShareSocialSharp />
            {copied ? "Lien copié !" : "Partager"}
          </button>

          <Link
            to="/"
            className="inline-flex items-center justify-center px-3 py-2 rounded-xl text-sm font-medium border border-slate-300 bg-white hover:bg-slate-50 transition"
          >
            ← Retour
          </Link>
        </div>
      </div>

      {/* PDF */}
      <PdfViewer file={fileUrl} />

      {/* Actions secondaires */}
      {/* <div className="flex gap-2">
        <a
          className="inline-flex items-center justify-center px-3 py-2 rounded-xl text-sm font-semibold text-white bg-[#0abde3] hover:brightness-110 transition"
          href={fileUrl}
          download
        >
          Télécharger le PDF
        </a>
        <a
          className="inline-flex items-center justify-center px-3 py-2 rounded-xl text-sm font-medium border border-slate-300 bg-white hover:bg-slate-50 transition"
          href={fileUrl}
          target="_blank"
          rel="noreferrer"
        >
          Ouvrir dans un onglet
        </a>
      </div> */}
    </div>
  );
}