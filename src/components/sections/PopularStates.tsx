"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StateCard from "@/components/ui/StateCard";
import { FiArrowRight } from "react-icons/fi";

interface StateData {
  _id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export default function PopularStates() {
  const [states, setStates] = useState<StateData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/states?featured=true")
      .then((r) => r.json())
      .then((data) => {
        setStates(Array.isArray(data) ? data.slice(0, 8) : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">
          Popular <span className="gradient-text">States</span>
        </h2>
        <p className="section-subtitle">
          Explore India&apos;s most loved destinations across vibrant states
        </p>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-100 rounded-2xl h-64" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {states.map((state, i) => (
              <StateCard key={state._id} {...state} index={i} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link href="/states" className="inline-flex items-center gap-2 text-saffron-600 font-semibold hover:text-saffron-700 transition-colors">
            View All States <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
