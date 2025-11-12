// src/pages/Contribute.jsx
import { withBase } from "../utils/withBase";

export default function Contribute() {
  const example = `{
  "id": "catan",
  "name": "Les Colons de Catane",
  "summary": "Développez votre colonie...",
  "pdf": "/rules/catan.pdf",
  "thumb": {
    "webp": "/thumbs/catan.webp",
    "jpg": "/thumbs/catan.jpg",
    "png": "/thumbs/catan.png"
  }
}`;

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">Contribuer</h1>
      <p className="text-slate-700">
        Pour ajouter un jeu, déposez votre PDF dans <code>/public/rules/</code>,
        la vignette dans
        <code> /public/thumbs/</code>, puis éditez{" "}
        <code>/public/data/games.json</code>.
      </p>
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="font-semibold mb-2">
          Exemple d’entrée <code>games.json</code>
        </h2>
        <pre className="text-sm text-slate-800 overflow-x-auto">
          <code>{example}</code>
        </pre>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="font-semibold mb-2">Emplacements attendus</h2>
        <ul className="list-disc pl-5 text-slate-700 space-y-1">
          <li>
            <code>{withBase("/rules/catan.pdf")}</code>
          </li>
          <li>
            <code>{withBase("/thumbs/catan.webp")}</code> (optionnel),{" "}
            <code>{withBase("/thumbs/catan.jpg")}</code>,{" "}
            <code>{withBase("/thumbs/catan.png")}</code>
          </li>
        </ul>
      </div>
    </div>
  );
}
