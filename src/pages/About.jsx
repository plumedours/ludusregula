// src/pages/About.jsx
import { Link } from "react-router-dom";
import { withBase } from "../utils/withBase";
import { IoIosSearch } from "react-icons/io";
import { BsStars } from "react-icons/bs";
import { GrDocumentText } from "react-icons/gr";
import { FaRegHandshake } from "react-icons/fa6";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { SiGoogleforms } from "react-icons/si";
import { CgMoreO } from "react-icons/cg";

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
            className="h-12 w-12 rounded-md ring-1 ring-slate-200"
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
              <div className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-[#0abde3]/15 text-[#0abde3] text-sm">
                <IoIosSearch />
              </div>
              <div>
                <strong>Rechercher</strong> un jeu par son nom, filtrer par{" "}
                <em>tags</em> (famille, stratégie, cartes…).
              </div>
            </li>
            <li className="flex gap-3">
              <div className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-[#0abde3]/15 text-[#0abde3] text-sm">
                <GrDocumentText />
              </div>
              <div>
                <strong>Prévisualiser le PDF</strong> des règles directement
                dans le navigateur, puis le télécharger si besoin.
              </div>
            </li>
            <li className="flex gap-3">
              <div className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-[#0abde3]/15 text-[#0abde3] text-sm">
                <BsStars />
              </div>
              <div>
                Interface <strong>simple et lisible</strong> (mobile/desktop),
                avec pagination (application PWA à venir).
              </div>
            </li>
            <li className="flex gap-3">
              <div className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-[#0abde3]/15 text-[#0abde3] text-sm">
                <FaRegHandshake />
              </div>
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
              className="inline-flex items-center gap-2 rounded-md bg-[#10ac84] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
            >
              <FaGithub /> Formulaire GitHub (recommandé)
            </a>
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#ff9f43] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
            >
              <SiGoogleforms /> Google Forms (simple)
            </a>
            <Link
              to="/contribute"
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50 transition"
            >
              <CgMoreO /> Plus de détails
            </Link>
          </div>
          <div className="rounded-md border border-slate-200 bg-slate-50/60 p-4 text-sm text-slate-700">
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
                className="inline-flex items-center gap-2 rounded-md bg-[#5865F2] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
              >
                <FaDiscord /> Rejoindre le Discord
              </a>
              <a
                href="https://github.com/plumedours/ludusregula"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50 transition"
              >
                <FaGithub /> Voir le projet sur GitHub
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
