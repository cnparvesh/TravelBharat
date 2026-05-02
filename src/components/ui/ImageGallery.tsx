"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const navigate = (dir: "prev" | "next") => {
    if (selectedIndex === null) return;
    if (dir === "prev") setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : images.length - 1);
    else setSelectedIndex(selectedIndex < images.length - 1 ? selectedIndex + 1 : 0);
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Main Image */}
        <div
          className="md:col-span-3 relative h-72 md:h-96 rounded-2xl overflow-hidden cursor-pointer group"
          onClick={() => setSelectedIndex(0)}
        >
          <Image src={images[0]} alt={alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 75vw" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="hidden md:grid grid-rows-3 gap-3">
            {images.slice(1, 4).map((img, i) => (
              <div
                key={i}
                className="relative rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => setSelectedIndex(i + 1)}
              >
                <Image src={img} alt={`${alt} ${i + 2}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="25vw" />
                {i === 2 && images.length > 4 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">+{images.length - 4}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedIndex(null)}
          >
            <button onClick={() => setSelectedIndex(null)} className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl z-10">
              <FiX />
            </button>
            <button onClick={(e) => { e.stopPropagation(); navigate("prev"); }} className="absolute left-4 text-white/80 hover:text-white text-3xl z-10">
              <FiChevronLeft />
            </button>
            <button onClick={(e) => { e.stopPropagation(); navigate("next"); }} className="absolute right-4 text-white/80 hover:text-white text-3xl z-10">
              <FiChevronRight />
            </button>
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-5xl h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={images[selectedIndex]} alt={`${alt} ${selectedIndex + 1}`} fill className="object-contain" sizes="100vw" />
            </motion.div>
            <div className="absolute bottom-6 text-white/60 text-sm">
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
