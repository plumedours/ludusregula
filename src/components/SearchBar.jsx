// src/components/SearchBar.jsx
import { useState } from "react";

export default function SearchBar({
  onChange,
  placeholder = "Rechercher un jeu...",
}) {
  const [q, setQ] = useState("");

  return (
    <div className="w-full">
      <div className="rounded-xl border border-slate-300 bg-white shadow-sm">
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            onChange?.(e.target.value);
          }}
          placeholder={placeholder}
          className="h-12 w-full rounded-xl bg-transparent px-4 outline-none placeholder:text-slate-400 focus:ring-4 focus:ring-[#0abde3]/30"
          aria-label="Rechercher un jeu"
        />
      </div>
      <p className="text-xs text-slate-500 mt-2">
        Tape quelques lettres pour filtrer la liste.
      </p>
    </div>
  );
}
