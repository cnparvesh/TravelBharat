"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface StateCardProps {
  name: string;
  slug: string;
  image: string;
  description?: string;
  index?: number;
}

export default function StateCard({ name, slug, image, description, index = 0 }: StateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
    >
      <Link href={`/states/${slug}`} className="group block">
        <div className="glass-card overflow-hidden">
          <div className="relative h-52 overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white text-lg font-bold font-heading">{name}</h3>
            </div>
          </div>
          {description && (
            <div className="p-4">
              <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
