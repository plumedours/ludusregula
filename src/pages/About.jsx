// src/pages/About.jsx
import { Link } from "react-router-dom";
import { withBase } from "../utils/withBase";

export default function About() {
  const iconUrl = withBase("icon.svg");

  return (
    <div className="mx-auto w-full max-w-4xl">
      {/* Hero */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <img
            src={iconUrl}
            alt="LudusRegula"
            className="h-12 w-12 rounded-xl"
            loading="eager"
            fetchPriority="high"
          />
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              À propos de <span className="text-[#0abde3]">LudusRegula</span>
            </h1>
            <p className="mt-2 text-slate-600">
              Bienvenue ! Je suis{" "}
              <span className="font-semibold">Maxime Bory</span> — ce site
              rassemble vos <strong>règles de jeux</strong> dans une interface
              rapide, claire et agréable à utiliser.
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href="https://github.com/plumedours"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
            title="Ouvrir mon GitHub"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              className="opacity-80"
            >
              <path
                fill="currentColor"
                d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49c0-.24-.01-.87-.01-1.71c-2.78.62-3.37-1.21-3.37-1.21c-.45-1.18-1.11-1.5-1.11-1.5c-.91-.64.07-.63.07-.63c1 .07 1.53 1.06 1.53 1.06c.9 1.57 2.36 1.12 2.94.86c.09-.67.35-1.12.63-1.38c-2.22-.26-4.55-1.14-4.55-5.08c0-1.12.39-2.03 1.03-2.75c-.1-.26-.45-1.3.1-2.71c0 0 .85-.28 2.8 1.05c.81-.23 1.68-.35 2.54-.36c.86.01 1.73.13 2.54.36c1.95-1.33 2.8-1.05 2.8-1.05c.55 1.41.2 2.45.1 2.71c.64.72 1.03 1.63 1.03 2.75c0 3.95-2.33 4.82-4.56 5.08c.36.32.67.94.67 1.9c0 1.37-.01 2.47-.01 2.81c0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
              />
            </svg>
            Mon GitHub (@plumedours)
          </a>
        </div>
      </section>

      {/* Grille d’infos */}
      <section className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Qu’est-ce que c’est ?
          </h2>
          <p className="mt-2 text-slate-600">
            <strong>LudusRegula</strong> est une bibliothèque personnelle de
            règles de jeux. Elle vous permet de{" "}
            <span className="font-medium">rechercher</span>,{" "}
            <span className="font-medium">prévisualiser</span> et{" "}
            <span className="font-medium">télécharger</span> des PDF en quelques
            clics.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-600">
            <li>
              Interface claire et moderne (thème clair, couleurs du logo).
            </li>
            <li>Vignettes d’aperçu pour chaque jeu (WebP/JPG/PNG).</li>
            <li>
              Visionneuse PDF intégrée : zoom, rotation, miniatures, pagination.
            </li>
            <li>
              Chemins compatibles dev/prod via <code>withBase()</code>.
            </li>
            <li>
              100% front-end (Vite + React + Tailwind) — rapide et simple à
              héberger.
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Ce que le site propose
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <FeatureChip color="#0abde3" label="Recherche instantanée" />
            <FeatureChip color="#10ac84" label="Prévisualisation PDF" />
            <FeatureChip color="#ff9f43" label="Vignettes optimisées" />
            <FeatureChip color="#ee5253" label="Navigation mobile" />
            <FeatureChip color="#0abde3" label="Raccourcis clavier" />
            <FeatureChip color="#10ac84" label="Sans back-end" />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-2">
          <h2 className="text-xl font-semibold text-slate-900">Bienvenue !</h2>
          <p className="mt-2 text-slate-600">
            L’objectif est simple :{" "}
            <em>retrouver vos règles de jeux sans chercher partout</em>. Déposez
            vos PDFs, ajoutez une vignette, et le tour est joué. Tout se fait
            côté client, sans base de données ni serveur compliqué.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Comment ajouter un jeu ?
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-slate-600">
            <li>
              Placez le PDF dans <code>/public/rules/</code> (ex.{" "}
              <code>catan.pdf</code>).
            </li>
            <li>
              Placez la vignette dans <code>/public/thumbs/</code> (WebP
              recommandé, JPG/PNG en fallback).
            </li>
            <li>
              Ajoutez une entrée dans <code>/public/data/games.json</code> :
              <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-50 p-3 text-xs text-slate-800">
                {`{
  "id": "catan",
  "name": "Les Colons de Catane",
  "summary": "Développez votre colonie, échangez et construisez pour gagner.",
  "pdf": "/rules/catan.pdf",
  "thumb": {
    "webp": "/thumbs/catan.webp",
    "jpg": "/thumbs/catan.jpg",
    "png": "/thumbs/catan.png"
  }
}`}
              </pre>
            </li>
          </ol>
          <p className="mt-3 text-sm text-slate-600">
            Astuce : utilisez{" "}
            <a
              className="text-[#0abde3] underline-offset-2 hover:underline"
              href="https://squoosh.app/"
              target="_blank"
              rel="noreferrer"
            >
              squoosh.app
            </a>{" "}
            pour compresser vos vignettes au format WebP.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Contact & liens
          </h2>
          <div className="mt-3 space-y-2 text-slate-700">
            <p>
              <span className="font-semibold">Auteur :</span> Maxime Bory
            </p>
            <p>
              <span className="font-semibold">GitHub :</span>{" "}
              <a
                href="https://github.com/plumedours"
                target="_blank"
                rel="noreferrer"
                className="text-[#0abde3] underline-offset-2 hover:underline"
              >
                github.com/plumedours
              </a>
            </p>
            <p className="text-sm text-slate-500">
              Vous pouvez proposer des idées, signaler un bug, ou suggérer des
              améliorations.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to="/contribute"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0abde3] px-3 py-2 text-sm font-semibold text-white hover:brightness-110"
            >
              Contribuer
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              Accueil
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureChip({ label, color }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-lg px-2.5 py-1 font-semibold"
      style={{ backgroundColor: hexToRgba(color, 0.12), color }}
    >
      {label}
    </span>
  );
}

function hexToRgba(hex, alpha = 1) {
  const h = hex.replace("#", "");
  const bigint = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16
  );
  // eslint-disable-next-line no-bitwise
  const r = (bigint >> 16) & 255;
  // eslint-disable-next-line no-bitwise
  const g = (bigint >> 8) & 255;
  // eslint-disable-next-line no-bitwise
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
