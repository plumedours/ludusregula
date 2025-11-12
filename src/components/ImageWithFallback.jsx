// src/components/ImageWithFallback.jsx
import { useEffect, useState } from "react";
import { withBase } from "../utils/withBase";

/**
 * Essaie les sources dans l'ordre (webp, jpg, png), en pré-chargement,
 * et ne rend qu'une seule <img> avec la première qui fonctionne.
 */
export default function ImageWithFallback({
  alt,
  sources = [], // ex: ["/thumbs/catan.webp", "/thumbs/catan.jpg", "/thumbs/catan.png"]
  className = "",
  onFailPlaceholder = null,
}) {
  const [resolved, setResolved] = useState(null); // URL finale qui marche
  const [tried, setTried] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const tryLoad = async () => {
      for (const s of sources.filter(Boolean)) {
        const url = withBase(s);
        try {
          const ok = await preload(url);
          if (!cancelled && ok) {
            setResolved(url);
            return;
          }
        } catch {
          // continue
        }
      }
      if (!cancelled) {
        setResolved(null);
        setTried(true);
      }
    };
    tryLoad();
    return () => {
      cancelled = true;
    };
  }, [sources]);

  if (resolved) {
    return (
      <img src={resolved} alt={alt} loading="lazy" className={className} />
    );
  }
  if (!tried) {
    // état de chargement rapide (squelette)
    return (
      <div className={`animate-pulse bg-slate-200 ${className}`} aria-hidden />
    );
  }
  return onFailPlaceholder;
}

function preload(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}
