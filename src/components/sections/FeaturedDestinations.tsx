"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PlaceCard from "@/components/ui/PlaceCard";
import { FiArrowRight } from "react-icons/fi";

interface PlaceData {
  _id: string;
  name: string;
  slug: string;
  images: string[];
  category: string;
  bestTime: string;
  fees: string;
  stateId?: { name: string; slug: string };
  cityId?: { name: string; slug: string };
}

export default function FeaturedDestinations() {
  const [places, setPlaces] = useState<PlaceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/places?featured=true&limit=6")
      .then((r) => r.json())
      .then((data) => {
        setPlaces(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">
          Featured <span className="gradient-text">Destinations</span>
        </h2>
        <p className="section-subtitle">
          Handpicked tourist attractions you simply can&apos;t miss
        </p>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-2xl h-72 shadow-sm" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place, i) => (
              <PlaceCard
                key={place._id}
                name={place.name}
                slug={place.slug}
                image={place.images?.[0] || "/images/placeholder.jpg"}
                category={place.category}
                stateName={place.stateId?.name}
                cityName={place.cityId?.name}
                bestTime={place.bestTime}
                fees={place.fees}
                index={i}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link href="/search" className="inline-flex items-center gap-2 text-saffron-600 font-semibold hover:text-saffron-700 transition-colors">
            Explore All Destinations <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
