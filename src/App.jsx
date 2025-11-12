// src/App.jsx  (mise à jour pour utiliser le nouveau Header + routes)
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import GameDetail from "./pages/GameDetail";
import About from "./pages/About";
import Contribute from "./pages/Contribute";
import "./index.css";

export default function App() {
  const base = import.meta.env.BASE_URL;

  return (
    <BrowserRouter basename={base}>
      <div className="min-h-screen flex flex-col bg-[#f6f7fb] text-slate-900">
        <Header />

        <main className="max-w-6xl mx-auto px-4 py-8 w-full flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game/:id" element={<GameDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contribute" element={<Contribute />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
