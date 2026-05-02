"use client";

import { motion } from "framer-motion";
import { FiShield, FiGlobe, FiSmartphone, FiHeart } from "react-icons/fi";

const features = [
  { icon: FiGlobe, title: "Complete Coverage", desc: "Every state, city, and tourist destination across India in one platform" },
  { icon: FiSmartphone, title: "Mobile Friendly", desc: "Explore seamlessly on any device — phone, tablet, or desktop" },
  { icon: FiShield, title: "Verified Info", desc: "Accurate timings, fees, and tips curated by travel enthusiasts" },
  { icon: FiHeart, title: "Handpicked Gems", desc: "Discover hidden gems and offbeat destinations beyond the mainstream" },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">
          Why <span className="gradient-text">TravelBharat</span>?
        </h2>
        <p className="section-subtitle">
          Your trusted companion for exploring the wonders of India
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-saffron-50 flex items-center justify-center group-hover:bg-saffron-100 transition-colors">
                <f.icon className="text-2xl text-saffron-600" />
              </div>
              <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
