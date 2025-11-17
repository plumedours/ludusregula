// src/components/PdfViewer.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  IoGlobeOutline,
  IoLogoYoutube,
  IoBookOutline,
  IoDownloadOutline,
  IoOpenOutline,
  IoPrintOutline,
  IoArrowBackOutline,
  IoArrowForwardOutline,
  IoRemoveOutline,
  IoAddOutline,
  IoRefreshOutline,
  IoResizeOutline,
} from "react-icons/io5";

// Worker PDFJS (⚠️ doit correspondre à ta version installée de pdfjs-dist)
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PdfViewer({
  file, // URL du PDF
  links = {}, // { site, video, quickstart } → nouveaux liens
  initialScale = 0.5,
  minScale = 0.5,
  maxScale = 2.0,
  step = 0.1,
}) {
  const containerRef = useRef(null);
  const [numPages, setNumPages] = useState(null);
  const [page, setPage] = useState(1);
  const [scale, setScale] = useState(initialScale);
  const [rotate, setRotate] = useState(0);
  const [containerWidth, setContainerWidth] = useState(800);
  const [pageInput, setPageInput] = useState("1");

  // Responsive
  useEffect(() => {
    const update = () => {
      const w = Math.min(
        1200,
        Math.max(320, containerRef.current?.clientWidth ?? 800)
      );
      setContainerWidth(w);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!numPages) return;
    setPage((p) => Math.min(Math.max(1, p), numPages));
  }, [numPages]);

  const canPrev = page > 1;
  const canNext = numPages ? page < numPages : false;

  const onDocLoad = ({ numPages }) => {
    setNumPages(numPages);
    setPage(1);
    setPageInput("1");
  };

  const goPrev = () =>
    canPrev && (setPage(page - 1), setPageInput(String(page - 1)));
  const goNext = () =>
    canNext && (setPage(page + 1), setPageInput(String(page + 1)));

  const zoomIn = () =>
    setScale((s) => Math.min(maxScale, +(s + step).toFixed(2)));
  const zoomOut = () =>
    setScale((s) => Math.max(minScale, +(s - step).toFixed(2)));
  const zoomFit = () => setScale(1.0);
  const rotate90 = () => setRotate((r) => (r + 90) % 360);

  // Raccourcis
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" && canNext) goNext();
      if (e.key === "ArrowLeft" && canPrev) goPrev();
      if ((e.ctrlKey || e.metaKey) && e.key === "+") {
        e.preventDefault();
        zoomIn();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "-") {
        e.preventDefault();
        zoomOut();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "0") {
        e.preventDefault();
        zoomFit();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "r") {
        e.preventDefault();
        rotate90();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [canNext, canPrev]);

  // Aller à la page
  const submitPage = (e) => {
    e.preventDefault();
    const n = parseInt(pageInput, 10);
    if (!Number.isNaN(n) && n >= 1 && n <= (numPages ?? 1)) setPage(n);
    else setPageInput(String(page));
  };

  // const has = (s) => typeof s === "string" && s.trim().length > 0;

  // Toolbar principale
  const Toolbar = useMemo(
    () => (
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 border border-slate-200 bg-white rounded-md">
        <div className="flex items-center gap-2">
          {/* Navigation */}
          <button
            onClick={goPrev}
            disabled={!canPrev}
            className="relative group p-2 rounded-lg border border-slate-300 bg-white disabled:opacity-40 hover:bg-slate-50"
            aria-label="Page précédente"
          >
            <IoArrowBackOutline className="h-5 w-5" />
            <span className="tooltip">Page précédente</span>
          </button>

          <form onSubmit={submitPage} className="flex items-center gap-2">
            <span className="text-sm text-slate-600">Page</span>
            <input
              value={pageInput}
              onChange={(e) =>
                setPageInput(e.target.value.replace(/[^\d]/g, ""))
              }
              className="w-16 text-center h-9 rounded-lg border border-slate-300 bg-white outline-none focus:ring-4 focus:ring-[#0abde3]/30"
              inputMode="numeric"
            />
            {numPages && (
              <span className="text-sm text-slate-600">/ {numPages}</span>
            )}
          </form>

          <button
            onClick={goNext}
            disabled={!canNext}
            className="relative group p-2 rounded-lg border border-slate-300 bg-white disabled:opacity-40 hover:bg-slate-50"
            aria-label="Page suivante"
          >
            <IoArrowForwardOutline className="h-5 w-5" />
            <span className="tooltip">Page suivante</span>
          </button>
        </div>

        {/* Contrôles PDF */}
        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            className="relative group p-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50"
            aria-label="Zoom -"
          >
            <IoRemoveOutline className="h-5 w-5" />
            <span className="tooltip">Zoom -</span>
          </button>

          <div className="w-16 text-center text-sm tabular-nums text-slate-700">
            {Math.round(scale * 100)}%
          </div>

          <button
            onClick={zoomIn}
            className="relative group p-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50"
            aria-label="Zoom +"
          >
            <IoAddOutline className="h-5 w-5" />
            <span className="tooltip">Zoom +</span>
          </button>

          <button
            onClick={zoomFit}
            className="relative group p-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50"
            aria-label="Ajuster à la largeur"
          >
            <IoResizeOutline className="h-5 w-5" />
            <span className="tooltip">Ajuster à la largeur</span>
          </button>

          <button
            onClick={rotate90}
            className="relative group p-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50"
            aria-label="Pivoter 90°"
          >
            <IoRefreshOutline className="h-5 w-5" />
            <span className="tooltip">Pivoter 90°</span>
          </button>

          {/* Actions PDF */}
          <a
            href={file}
            download
            className="relative group p-2 rounded-lg bg-[#0abde3] text-white hover:brightness-110"
            aria-label="Télécharger le PDF"
          >
            <IoDownloadOutline className="h-5 w-5" />
            <span className="tooltip">Télécharger le PDF</span>
          </a>

          <a
            href={file}
            target="_blank"
            rel="noreferrer"
            className="relative group p-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50"
            aria-label="Ouvrir dans un onglet"
          >
            <IoOpenOutline className="h-5 w-5" />
            <span className="tooltip">Ouvrir dans un onglet</span>
          </a>

          <a
            href={file}
            target="_blank"
            rel="noreferrer"
            className="relative group p-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50"
            aria-label="Imprimer"
          >
            <IoPrintOutline className="h-5 w-5" />
            <span className="tooltip">Imprimer</span>
          </a>
        </div>
      </div>
    ),
    [page, pageInput, numPages, scale, canPrev, canNext, file, links]
  );

  const Thumbs = useMemo(
    () => (
      <div className="w-28 shrink-0 overflow-auto border border-slate-200 rounded-md bg-white p-2 max-h-[70vh]">
        <Document
          file={file}
          loading={
            <div className="text-xs text-slate-500 p-2">Miniatures…</div>
          }
        >
          {Array.from(new Array(numPages || 0), (_, i) => (
            <button
              key={`t_${i + 1}`}
              onClick={() => {
                setPage(i + 1);
                setPageInput(String(i + 1));
              }}
              className={`block w-full mb-2 rounded-lg overflow-hidden border ${
                page === i + 1 ? "border-[#0abde3]" : "border-slate-200"
              } hover:border-[#0abde3]`}
              title={`Aller à la page ${i + 1}`}
            >
              <Page
                pageNumber={i + 1}
                width={92}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            </button>
          ))}
        </Document>
      </div>
    ),
    [file, numPages, page]
  );

  return (
    <div className="space-y-3">
      {Toolbar}
      <div className="flex items-start gap-3">
        {numPages ? Thumbs : null}
        <div
          ref={containerRef}
          className="rounded-2xl p-3 bg-white border border-slate-200 shadow-sm overflow-x-auto w-full self-start"
        >
          <Document
            file={file}
            onLoadSuccess={onDocLoad}
            loading={
              <div className="p-6 text-slate-600">Chargement du document…</div>
            }
            error={
              <div className="p-6 text-[#ee5253]">
                Impossible de charger le PDF.
              </div>
            }
          >
            <Page
              pageNumber={page}
              width={Math.round(containerWidth * scale)}
              rotate={rotate}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          </Document>
        </div>
      </div>

      {/* CSS tooltip inline */}
      <style>{`
        .tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          background-color: #1f2937;
          color: #fff;
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          opacity: 0;
          pointer-events: none;
          white-space: nowrap;
          transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;
          margin-bottom: 0.25rem;
        }
        .group:hover .tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(-2px);
        }
      `}</style>
    </div>
  );
}
