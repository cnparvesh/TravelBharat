"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PlaceCard from "@/components/ui/PlaceCard";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import EmptyState from "@/components/ui/EmptyState";
import { FiSearch } from "react-icons/fi";
import { categories } from "@/lib/utils";

interface Place {
  _id: string; name: string; slug: string; images: string[]; category: string;
  bestTime: string; fees: string; stateId?: { name: string }; cityId?: { name: string };
}

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQ);
  const [category, setCategory] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);

  const doSearch = async (q: string, cat: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (cat) params.set("category", cat);
      const res = await fetch(`/api/search?${params.toString()}`);
      const data = await res.json();
      setPlaces(data.places || []);
    } catch { setPlaces([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { if (initialQ || category) doSearch(initialQ, category); }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    doSearch(query, category);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold font-heading mb-4">Search <span className="gradient-text">Destinations</span></h1>
          <p className="text-gray-500 max-w-xl mx-auto">Find your perfect Indian destination by name, state, or category</p>
        </div>

        <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search places, cities, states..." className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/30 focus:border-saffron-500" />
            </div>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/30">
              <option value="">All Categories</option>
              {categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
            <button type="submit" className="btn-primary whitespace-nowrap">Search</button>
          </div>
        </form>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {["popular", "family-friendly", "free-entry"].map((tag) => (
            <button key={tag} onClick={() => { setCategory(""); doSearch("", ""); }} className="px-4 py-2 rounded-full text-sm bg-gray-100 text-gray-600 hover:bg-saffron-50 hover:text-saffron-600 transition-colors capitalize">
              {tag.replace("-", " ")}
            </button>
          ))}
        </div>

        {loading ? <LoadingSkeleton count={6} /> : places.length === 0 ? (
          <EmptyState title="No destinations found" message="Try a different search term or explore by category" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place, i) => (
              <PlaceCard key={place._id} name={place.name} slug={place.slug} image={place.images?.[0] || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400"} category={place.category} stateName={place.stateId?.name} cityName={place.cityId?.name} bestTime={place.bestTime} fees={place.fees} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return <Suspense fallback={<LoadingSkeleton count={6} />}><SearchContent /></Suspense>;
}
