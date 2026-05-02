"use client";

import Link from "next/link";
import SearchBar from "@/components/ui/SearchBar";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] gradient-hero flex items-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-saffron-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-trigreen-500/5 rounded-full blur-3xl" />
        {/* Decorative Dots */}
        <div className="absolute top-32 right-1/4 w-2 h-2 bg-saffron-400 rounded-full opacity-60" />
        <div className="absolute top-48 right-1/3 w-1.5 h-1.5 bg-white rounded-full opacity-40" />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-trigreen-400 rounded-full opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-trigreen-400 animate-pulse" />
            Discover 28 States & 8 Union Territories
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white font-heading mb-6 leading-tight"
        >
          Explore the Magic of{" "}
          <span className="bg-gradient-to-r from-saffron-400 via-white to-trigreen-400 bg-clip-text text-transparent">
            Incredible India
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Your ultimate travel encyclopedia — discover breathtaking destinations, heritage sites, sacred temples, and thrilling adventures across every corner of India.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-10"
        >
          <SearchBar variant="hero" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/states" className="btn-primary text-base">
            Explore India <FiArrowRight />
          </Link>
          <Link href="/about" className="btn-secondary text-base">
            Learn More
          </Link>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { label: "States", value: "28+", icon: "🗺️" },
            { label: "Cities", value: "100+", icon: "🏙️" },
            { label: "Destinations", value: "500+", icon: "📍" },
            { label: "Categories", value: "4", icon: "🏷️" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-white font-heading">{stat.value}</div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
