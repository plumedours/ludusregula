// src/components/Pagination.jsx
export default function Pagination({ page, pageCount, onPage }) {
  if (pageCount <= 1) return null;

  const pages = makePages(page, pageCount);

  return (
    <nav
      className="flex items-center justify-between mt-4"
      aria-label="Pagination"
    >
      <button
        onClick={() => onPage(Math.max(1, page - 1))}
        disabled={page <= 1}
        className="px-3 py-2 rounded-md text-sm font-medium border border-slate-300 bg-white disabled:opacity-40 hover:bg-slate-50"
      >
        ← Précédent
      </button>

      <div className="flex items-center gap-1">
        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`dots-${i}`} className="px-2 text-slate-500">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPage(p)}
              className={`h-9 min-w-9 px-3 rounded-lg text-sm font-medium border ${
                p === page
                  ? "bg-[#0abde3] text-white border-[#0abde3]"
                  : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50"
              }`}
            >
              {p}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onPage(Math.min(pageCount, page + 1))}
        disabled={page >= pageCount}
        className="px-3 py-2 rounded-md text-sm font-medium border border-slate-300 bg-white disabled:opacity-40 hover:bg-slate-50"
      >
        Suivant →
      </button>
    </nav>
  );
}

function makePages(current, total) {
  const res = new Set([
    1,
    total,
    current,
    current - 1,
    current + 1,
    2,
    total - 1,
  ]);
  const arr = [...res]
    .filter((n) => n >= 1 && n <= total)
    .sort((a, b) => a - b);
  const withDots = [];
  for (let i = 0; i < arr.length; i++) {
    withDots.push(arr[i]);
    if (i < arr.length - 1 && arr[i + 1] - arr[i] > 1) withDots.push("…");
  }
  return withDots;
}
