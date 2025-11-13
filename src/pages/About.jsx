// src/pages/About.jsx
import { Link } from "react-router-dom";
import { withBase } from "../utils/withBase";

const GITHUB_ISSUE_URL =
  "https://github.com/plumedours/ludusregula/issues/new?template=proposer-une-regle.yml";
const GOOGLE_FORM_URL = "https://forms.gle/LePSjkMjRGj9MQFc8"; // ← remplace par ton vrai formulaire
const DISCORD_INVITE = "https://discord.gg/Wffka998Xk";

export default function About() {
  const iconUrl = withBase("icon.svg");

  return (
    <div className="space-y-8">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <Decor />
        <div className="relative z-10 p-6 md:p-8 flex items-start gap-5">
          <img
            src={iconUrl}
            alt="LudusRegula"
            className="h-12 w-12 rounded-xl ring-1 ring-slate-200"
            loading="eager"
          />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
              À propos de <span className="text-[#0abde3]">LudusRegula</span>
            </h1>
            <p className="mt-2 text-slate-700 max-w-3xl">
              LudusRegula est une <strong>bibliothèque communautaire</strong> de
              règles de jeux de société. L’objectif : retrouver rapidement les
              règles, les consulter en ligne, les télécharger, et découvrir de
              nouveaux jeux grâce aux vignettes, aux tags et à la recherche.
            </p>
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE (grand public) */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <Decor colorA="#0abde3" colorB="#10ac84" />
        <div className="relative z-10 p-6 md:p-8">
          <h2 className="text-xl font-semibold tracking-tight">
            Comment ça marche ?
          </h2>
          <ul className="mt-3 grid gap-3 md:grid-cols-2 text-slate-700">
            <li className="flex gap-3">
              <Bullet>🔎</Bullet>
              <div>
                <strong>Rechercher</strong> un jeu par son nom, filtrer par{" "}
                <em>tags</em> (famille, stratégie, cartes…).
              </div>
            </li>
            <li className="flex gap-3">
              <Bullet>📄</Bullet>
              <div>
                <strong>Prévisualiser le PDF</strong> des règles directement
                dans le navigateur, puis le télécharger si besoin.
              </div>
            </li>
            <li className="flex gap-3">
              <Bullet>✨</Bullet>
              <div>
                Interface <strong>simple et lisible</strong> (mobile/desktop),
                avec pagination (application PWA à venir).
              </div>
            </li>
            <li className="flex gap-3">
              <Bullet>🤝</Bullet>
              <div>
                Projet <strong>ouvert</strong> : chacun peut proposer une règle
                de jeu et enrichir la bibliothèque.
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* AJOUTER UNE RÈGLE */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <Decor colorA="#ff9f43" colorB="#0abde3" />
        <div className="relative z-10 p-6 md:p-8 space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Ajouter une règle
          </h2>
          <p className="text-slate-700">
            Deux options simples. Si vous avez un compte GitHub, utilisez le
            formulaire guidé. Sinon, choisissez le Google Forms : je reçois
            votre proposition par e-mail.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={GITHUB_ISSUE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#10ac84] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
            >
              <ExternalIcon /> Formulaire GitHub (recommandé)
            </a>
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#ff9f43] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
            >
              <ExternalIcon /> Google Forms (simple)
            </a>
            <Link
              to="/contribute"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50 transition"
            >
              Plus de détails
            </Link>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 text-sm text-slate-700">
            <strong>Fichiers attendus :</strong> 1 image (webp/jpg/png, ≤
            200&nbsp;KB, ~3:2) + 1 PDF des règles (≤ 20&nbsp;MB). En proposant
            du contenu, vous confirmez disposer des droits de diffusion.
          </div>
        </div>
      </section>

      {/* RESPECT / CONTACT */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <Decor colorA="#ee5253" colorB="#10ac84" />
        <div className="relative z-10 p-6 md:p-8 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">
              Respect des éditeurs & auteurs
            </h3>
            <p className="mt-2 text-slate-700">
              LudusRegula référence des règles pour faciliter la vie des
              joueurs. Si un éditeur ou un auteur souhaite la mise à jour ou le
              retrait d’un document, il suffit de nous le signaler : nous
              intervenons rapidement.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold tracking-tight">
              Rejoindre la communauté
            </h3>
            <p className="mt-2 text-slate-700">
              Échanger, proposer des idées, suivre les nouveautés :
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <a
                href={DISCORD_INVITE}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#5865F2] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
              >
                <ExternalIcon /> Rejoindre le Discord
              </a>
              <a
                href="https://github.com/plumedours/ludusregula"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50 transition"
              >
                <ExternalIcon /> Voir le projet sur GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- Décor & petits composants ---------- */
function Decor({ colorA = "#0abde3", colorB = "#10ac84" }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute -top-16 -left-10 h-40 w-40 rounded-full opacity-15 blur-2xl"
        style={{
          background: `radial-gradient(circle, ${colorA} 0%, transparent 60%)`,
        }}
      />
      <div
        className="absolute -bottom-16 -right-10 h-48 w-48 rounded-full opacity-10 blur-2xl"
        style={{
          background: `radial-gradient(circle, ${colorB} 0%, transparent 60%)`,
        }}
      />
    </div>
  );
}
function Bullet({ children }) {
  return (
    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white text-sm">
      {children}
    </span>
  );
}
function ExternalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 3h7v7m0-7L10 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M21 14v5a2 2 0 0 1-2 2h-5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}