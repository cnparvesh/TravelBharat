"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiMapPin, FiClock } from "react-icons/fi";
import { categoryColors } from "@/lib/utils";

interface PlaceCardProps {
  name: string;
  slug: string;
  image: string;
  category: string;
  stateName?: string;
  cityName?: string;
  bestTime?: string;
  fees?: string;
  index?: number;
}

export default function PlaceCard({ name, slug, image, category, stateName, cityName, bestTime, fees, index = 0 }: PlaceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
    >
      <Link href={`/place/${slug}`} className="group block">
        <div className="glass-card overflow-hidden">
          <div className="relative h-52 overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-3 left-3">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${categoryColors[category] || "bg-gray-100 text-gray-700"}`}>
                {category}
              </span>
            </div>
            {fees && fees.toLowerCase() === "free" && (
              <div className="absolute top-3 right-3">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">Free Entry</span>
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-base font-bold font-heading text-gray-900 mb-2 group-hover:text-saffron-600 transition-colors">{name}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              {(stateName || cityName) && (
                <span className="flex items-center gap-1">
                  <FiMapPin className="text-xs" />
                  {cityName}{cityName && stateName ? ", " : ""}{stateName}
                </span>
              )}
              {bestTime && (
                <span className="flex items-center gap-1">
                  <FiClock className="text-xs" />
                  {bestTime}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
