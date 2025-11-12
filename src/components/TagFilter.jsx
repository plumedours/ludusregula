// src/components/TagFilter.jsx
export default function TagFilter({ allTags, active = [], onToggle, onClear }) {
  if (!allTags.length) return null;

  return (
    <div className="relative rounded-2xl p-4 bg-white border border-slate-200 shadow-sm overflow-hidden">
      {/* Décor subtil en arrière-plan */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-16 -left-10 h-40 w-40 rounded-full opacity-15 blur-2xl"
          style={{
            background: "radial-gradient(circle, #0abde3 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute -bottom-16 -right-10 h-48 w-48 rounded-full opacity-10 blur-2xl"
          style={{
            background: "radial-gradient(circle, #10ac84 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative z-10 flex items-center justify-between gap-2 mb-3">
        <h3 className="text-sm font-semibold text-slate-900">
          Filtrer par tags
        </h3>
        {active.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-slate-600 hover:text-slate-900 underline underline-offset-2"
          >
            Réinitialiser
          </button>
        )}
      </div>

      <div className="relative z-10 flex flex-wrap gap-2">
        {allTags.map((t) => {
          const on = active.includes(t);
          return (
            <button
              key={t}
              onClick={() => onToggle(t)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                on
                  ? "bg-[#0abde3]/15 text-[#0abde3] border-[#0abde3]/30"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              }`}
            >
              #{t}
            </button>
          );
        })}
      </div>
    </div>
  );
}
