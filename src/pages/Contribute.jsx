// src/pages/Contribute.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { withBase } from "../utils/withBase";

const GITHUB_ISSUE_URL =
  "https://github.com/plumedours/ludusregula/issues/new?template=proposer-une-regle.yml";
const GOOGLE_FORM_URL = "https://forms.gle/LePSjkMjRGj9MQFc8"; // ← remplace par ton vrai formulaire

export default function Contribute() {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Chargement JSON (avec petite mise en cache sessionStorage)
  useEffect(() => {
    const cacheKey = "contributors-cache";
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      try {
        setContributors(JSON.parse(cached));
        setLoading(false);
        // on continue quand même à rafraîchir en arrière-plan
      } catch {}
    }
    fetch(withBase("/data/contributors.json"))
      .then((r) => r.json())
      .then((list) => {
        const safe = Array.isArray(list) ? list : [];
        setContributors(safe);
        sessionStorage.setItem(cacheKey, JSON.stringify(safe));
      })
      .catch(() => setContributors([]))
      .finally(() => setLoading(false));
  }, []);

  const sorted = useMemo(() => {
    return [...contributors].sort((a, b) =>
      String(a.name || "").localeCompare(String(b.name || ""), "fr")
    );
  }, [contributors]);

  return (
    <div className="space-y-8">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <Decor />
        <div className="relative z-10 p-6 md:p-7">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Contribuer à LudusRegula
          </h1>
          <p className="mt-2 text-slate-700">
            Deux façons simples d’ajouter une règle : via un formulaire GitHub
            ou, pour les non-initiés, via un Google Forms qui
            m’enverra votre proposition par e-mail.
          </p>
        </div>
      </section>

      {/* OPTION A — GitHub Issue Form */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <Decor colorA="#0abde3" colorB="#10ac84" />
        <div className="relative z-10 p-6 md:p-7 space-y-4">
          <HeaderPill title="Option A — Recommandée" color="#10ac84" />
          <h2 className="text-xl font-semibold tracking-tight">
            Proposer une règle via GitHub
          </h2>
          <p className="text-slate-700">
            Le formulaire guidé crée automatiquement une issue bien structurée.
            Déposez <strong>exactement 2 fichiers</strong> : 1 image
            (webp/jpg/png, ≤ 200 KB, ratio ~3:2) et 1 PDF (≤ 20 MB). Laissez l’
            <em>Identifiant</em> vide si besoin : un bot vous proposera une
            suggestion <em>kebab-case</em>.
          </p>

          <ol className="list-decimal pl-5 space-y-1 text-slate-700">
            <li>Cliquez sur le bouton ci-dessous.</li>
            <li>Remplissez les champs requis (Nom + Résumé).</li>
            <li>Déposez 1 image et 1 PDF dans la zone prévue.</li>
            <li>Soumettez — on s’occupe du reste !</li>
          </ol>

          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href={GITHUB_ISSUE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#10ac84] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
            >
              <ExternalIcon />
              Ouvrir le formulaire GitHub
            </a>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50 transition"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </section>

      {/* OPTION B — Google Form */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <Decor colorA="#ff9f43" colorB="#ee5253" />
        <div className="relative z-10 p-6 md:p-7 space-y-4">
          <HeaderPill title="Option B — Formulaire simplifié" color="#ff9f43" />
          <h2 className="text-xl font-semibold tracking-tight">
            Formulaire Google Forms (sans compte GitHub)
          </h2>
          <p className="text-slate-700">
            Si vous préférez une voie plus simple, utilisez ce formulaire ; je
            recevrai votre proposition par e-mail et l’intégrerai au site.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#ff9f43] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
            >
              <ExternalIcon />
              Ouvrir le Google Forms
            </a>
            <a
              href="mailto:contact@example.com?subject=Proposition%20de%20r%C3%A8gle%20de%20jeu"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50 transition"
            >
              Ou m’écrire par e-mail
            </a>
          </div>
        </div>
      </section>

      {/* CONTRIBUTORS */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <Decor colorA="#0abde3" colorB="#ff9f43" />
        <div className="relative z-10 p-6 md:p-7">
          <h2 className="text-xl font-semibold tracking-tight">
            Contributeurs
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Merci à toutes les personnes qui aident à enrichir la bibliothèque !
          </p>

          {loading ? (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 rounded-xl border border-slate-200 bg-slate-100 animate-pulse"
                />
              ))}
            </div>
          ) : sorted.length ? (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {sorted.map((c, idx) => (
                <ContributorCard key={idx} contributor={c} />
              ))}
            </div>
          ) : (
            <div className="mt-3 text-sm text-slate-600">
              Aucun contributeur listé pour le moment.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Sub-components */

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

function HeaderPill({ title, color }) {
  return (
    <span
      className="inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold"
      style={{ backgroundColor: `${color}20`, color }}
    >
      {title}
    </span>
  );
}

function ContributorCard({ contributor }) {
  const {
    name = "Anonyme",
    handle,
    website,
    github,
    avatar,
    role,
  } = contributor;

  const initials = name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const Content = () => (
    <div className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:shadow-md transition">
      {avatar ? (
        <img
          src={avatar}
          alt=""
          className="h-10 w-10 rounded-lg object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white text-sm font-bold">
          {initials}
        </div>
      )}
      <div className="min-w-0">
        <div className="truncate font-semibold text-slate-900">{name}</div>
        <div className="truncate text-sm text-slate-600">
          {handle || github ? handle || `@${github}` : "Contributeur"}
          {role ? ` · ${role}` : ""}
        </div>
      </div>
    </div>
  );

  return website ? (
    <a href={website} target="_blank" rel="noreferrer" className="block">
      <Content />
    </a>
  ) : (
    <Content />
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
