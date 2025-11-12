// src/pages/Home.jsx
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchHero from "../components/SearchHero";
import TagFilter from "../components/TagFilter";
import GameCard from "../components/GameCard";
import Pagination from "../components/Pagination";
import { normalizeText } from "../utils/normalizeText";
import { withBase } from "../utils/withBase";

const PAGE_SIZE = 12;

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [games, setGames] = useState([]);
  const [q, setQ] = useState("");
  const [activeTags, setActiveTags] = useState([]);
  const [page, setPage] = useState(1);

  // Charger + DÉDUPLIQUER par id (évite doublons JSON / double fetch en dev)
  useEffect(() => {
    fetch(withBase("/data/games.json"))
      .then((r) => r.json())
      .then((list) => {
        const map = new Map();
        for (const g of Array.isArray(list) ? list : []) {
          if (!g?.id) continue;
          // le dernier remplace les précédents en cas de doublon
          map.set(String(g.id), g);
        }
        setGames([...map.values()]);
      })
      .catch(() => setGames([]));
  }, []);

  // Lire l'état depuis l'URL
  useEffect(() => {
    const urlQ = searchParams.get("q") ?? "";
    const urlTags = (searchParams.get("tags") ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const urlPage = parseInt(searchParams.get("page") ?? "1", 10) || 1;

    if (q !== urlQ) setQ(urlQ);
    if (!arraysEqual(activeTags, urlTags)) setActiveTags(urlTags);
    if (page !== urlPage) setPage(urlPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Tags uniques
  const allTags = useMemo(() => {
    const set = new Set();
    for (const g of games) (g.tags || []).forEach((t) => set.add(t));
    return Array.from(set).sort((a, b) => a.localeCompare(b, "fr"));
  }, [games]);

  // Filtrage
  const filtered = useMemo(() => {
    const nq = normalizeText(q);
    return games.filter((g) => {
      const matchText =
        normalizeText(g.name).includes(nq) ||
        normalizeText(g.summary || "").includes(nq);
      const tags = g.tags || [];
      const matchTags = activeTags.every((t) => tags.includes(t));
      return matchText && matchTags;
    });
  }, [q, activeTags, games]);

  // Pagination (toujours max 12 via slice)
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageSafe = Math.min(Math.max(1, page), pageCount);

  const paged = useMemo(() => {
    const start = (pageSafe - 1) * PAGE_SIZE;
    // 👇 garantie dure : on ne rend QUE PAGE_SIZE éléments
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, pageSafe]);

  // Reset page si recherche/tags changent
  useEffect(() => setPage(1), [q, activeTags]);

  // Pousser l'état vers l'URL
  useEffect(() => {
    const params = {};
    if (q) params.q = q;
    if (activeTags.length) params.tags = activeTags.join(",");
    if (pageSafe > 1) params.page = String(pageSafe);
    setSearchParams(params, { replace: true });
  }, [q, activeTags, pageSafe, setSearchParams]);

  // Raccourci Ctrl+K
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        document
          .querySelector('input[aria-label="Rechercher un jeu"]')
          ?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleTag = (t) =>
    setActiveTags((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  const clearTags = () => setActiveTags([]);

  return (
    <div className="space-y-6">
      <SearchHero
        q={q}
        onChange={setQ}
        total={games.length}
        filtered={filtered.length}
      />
      <TagFilter
        allTags={allTags}
        active={activeTags}
        onToggle={toggleTag}
        onClear={clearTags}
      />

      {/* Grille (une seule) */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paged.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </section>

      {/* Debug visuel rapide (peut être retiré) */}
      <div className="text-xs text-slate-500">
        Affichés: {paged.length} / Page {pageSafe} sur {pageCount}
      </div>

      {filtered.length === 0 && (
        <div className="text-slate-600 text-sm">
          Aucun résultat pour « {q} »
          {activeTags.length ? ` avec les tags ${activeTags.join(", ")}` : ""}.
        </div>
      )}

      <Pagination page={pageSafe} pageCount={pageCount} onPage={setPage} />
    </div>
  );
}

function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  const sa = [...a].sort();
  const sb = [...b].sort();
  for (let i = 0; i < sa.length; i++) if (sa[i] !== sb[i]) return false;
  return true;
}
