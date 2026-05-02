"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface SearchResult {
  states: Array<{ _id: string; name: string; slug: string }>;
  cities: Array<{ _id: string; name: string; slug: string; stateId?: { name: string } }>;
  places: Array<{ _id: string; name: string; slug: string; category: string }>;
}

export default function SearchBar({ variant = "default" }: { variant?: "default" | "hero" }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (query.length < 2) { setResults(null); return; }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
        setIsOpen(true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  const hasResults = results && (results.states.length > 0 || results.cities.length > 0 || results.places.length > 0);

  const isHero = variant === "hero";

  return (
    <div ref={ref} className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className={`relative flex items-center ${isHero ? "bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl" : "bg-white border border-gray-200 rounded-xl shadow-sm"}`}>
          <FiSearch className={`absolute left-4 text-lg ${isHero ? "text-white/70" : "text-gray-400"}`} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search states, cities, or places..."
            className={`w-full pl-12 pr-12 py-4 rounded-2xl bg-transparent outline-none text-base ${isHero ? "text-white placeholder-white/60" : "text-gray-900 placeholder-gray-400"}`}
          />
          {query && (
            <button type="button" onClick={() => { setQuery(""); setResults(null); }} className={`absolute right-4 ${isHero ? "text-white/70" : "text-gray-400"}`}>
              <FiX />
            </button>
          )}
        </div>
      </form>

      <AnimatePresence>
        {isOpen && results && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 max-h-96 overflow-y-auto"
          >
            {loading ? (
              <div className="p-6 text-center text-gray-400">Searching...</div>
            ) : !hasResults ? (
              <div className="p-6 text-center text-gray-400">No results found for &quot;{query}&quot;</div>
            ) : (
              <div className="py-2">
                {results.states.length > 0 && (
                  <div>
                    <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">States</p>
                    {results.states.map((s) => (
                      <button key={s._id} onClick={() => { router.push(`/states/${s.slug}`); setIsOpen(false); }} className="w-full text-left px-4 py-3 hover:bg-saffron-50 transition-colors flex items-center gap-3">
                        <span className="text-lg">🏛️</span>
                        <span className="text-sm font-medium text-gray-700">{s.name}</span>
                      </button>
                    ))}
                  </div>
                )}
                {results.cities.length > 0 && (
                  <div>
                    <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Cities</p>
                    {results.cities.map((c) => (
                      <button key={c._id} onClick={() => { router.push(`/cities/${c.slug}`); setIsOpen(false); }} className="w-full text-left px-4 py-3 hover:bg-saffron-50 transition-colors flex items-center gap-3">
                        <span className="text-lg">🏙️</span>
                        <div>
                          <span className="text-sm font-medium text-gray-700">{c.name}</span>
                          {c.stateId && <span className="text-xs text-gray-400 ml-2">{c.stateId.name}</span>}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {results.places.length > 0 && (
                  <div>
                    <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase">Places</p>
                    {results.places.map((p) => (
                      <button key={p._id} onClick={() => { router.push(`/place/${p.slug}`); setIsOpen(false); }} className="w-full text-left px-4 py-3 hover:bg-saffron-50 transition-colors flex items-center gap-3">
                        <span className="text-lg">📍</span>
                        <span className="text-sm font-medium text-gray-700">{p.name}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 capitalize">{p.category}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
