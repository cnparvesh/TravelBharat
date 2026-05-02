"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { categories } from "@/lib/utils";

export default function Categories() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">
          Explore by <span className="gradient-text">Category</span>
        </h2>
        <p className="section-subtitle">
          Find destinations that match your travel style
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link href={`/categories/${cat.slug}`} className="group block">
                <div className={`relative p-8 rounded-2xl bg-gradient-to-br ${cat.color} text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                  <div className="relative z-10">
                    <span className="text-4xl mb-4 block">{cat.icon}</span>
                    <h3 className="text-xl font-bold font-heading mb-2">{cat.name}</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{cat.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
