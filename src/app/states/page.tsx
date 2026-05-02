"use client";

import { useEffect, useState } from "react";
import StateCard from "@/components/ui/StateCard";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";
import { FiSearch } from "react-icons/fi";

interface StateData {
  _id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export default function StatesPage() {
  const [states, setStates] = useState<StateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/states")
      .then((r) => r.json())
      .then((data) => {
        setStates(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = states.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading mb-4">
            Explore All <span className="gradient-text">States</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            India&apos;s 28 states and 8 union territories, each with unique culture, cuisine, and charm
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Filter states..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/30 focus:border-saffron-500"
            />
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <LoadingSkeleton count={12} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((state, i) => (
              <StateCard key={state._id} {...state} index={i} />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">No states found matching &quot;{search}&quot;</p>
          </div>
        )}
      </div>
    </div>
  );
}
