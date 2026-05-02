import { Metadata } from "next";
import { FiMapPin, FiGlobe, FiUsers, FiHeart } from "react-icons/fi";

export const metadata: Metadata = { title: "About TravelBharat", description: "Learn about TravelBharat - India's most comprehensive tourism platform" };

const values = [
  { icon: FiGlobe, title: "Comprehensive", desc: "Every state, every city, every hidden gem — all in one place" },
  { icon: FiUsers, title: "Community Driven", desc: "Built with inputs from travelers and local tourism enthusiasts" },
  { icon: FiHeart, title: "Passion for India", desc: "We celebrate India's incredible diversity and cultural heritage" },
  { icon: FiMapPin, title: "Accurate Info", desc: "Verified timings, fees, and travel tips you can trust" },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading mb-4">About <span className="gradient-text">TravelBharat</span></h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">Your ultimate digital travel encyclopedia for exploring the incredible diversity of India</p>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <div className="glass-card p-8 md:p-12">
            <h2 className="text-2xl font-bold font-heading mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-6">TravelBharat was born from a simple idea: India&apos;s tourism information is scattered across hundreds of websites, making it difficult for travelers to plan their perfect trip. We set out to create a single, beautifully designed platform that brings together every tourist destination in India — organized state by state, city by city.</p>
            <p className="text-gray-600 leading-relaxed mb-6">Whether you&apos;re planning a heritage tour through Rajasthan, a spiritual journey to Varanasi, a nature escape to Kerala&apos;s backwaters, or an adventure trek in Uttarakhand — TravelBharat is your trusted companion.</p>
            <p className="text-gray-600 leading-relaxed">Our team of travel enthusiasts curates every destination with care, providing accurate timings, entry fees, best seasons to visit, and insider travel tips that help you make the most of your Indian adventures.</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold font-heading text-center mb-10">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((v) => (
            <div key={v.title} className="glass-card p-6 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-saffron-50 flex items-center justify-center">
                <v.icon className="text-2xl text-saffron-600" />
              </div>
              <h3 className="font-bold font-heading text-gray-900 mb-2">{v.title}</h3>
              <p className="text-sm text-gray-500">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center glass-card p-10 bg-gradient-to-br from-saffron-50 to-orange-50">
          <h2 className="text-2xl font-bold font-heading mb-4">India in Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[{ n: "28+", l: "States" }, { n: "8", l: "Union Territories" }, { n: "500+", l: "Tourist Spots" }, { n: "4", l: "Categories" }].map((s) => (
              <div key={s.l}><p className="text-3xl font-extrabold text-saffron-600 font-heading">{s.n}</p><p className="text-sm text-gray-500">{s.l}</p></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
