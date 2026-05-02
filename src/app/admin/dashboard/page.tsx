"use client";

import { useEffect, useState } from "react";
import { FiMap, FiMapPin, FiCompass, FiTrendingUp } from "react-icons/fi";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ states: 0, cities: 0, places: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/states").then((r) => r.json()),
      fetch("/api/cities").then((r) => r.json()),
      fetch("/api/places").then((r) => r.json()),
    ]).then(([s, c, p]) => {
      setStats({ states: Array.isArray(s) ? s.length : 0, cities: Array.isArray(c) ? c.length : 0, places: Array.isArray(p) ? p.length : 0 });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const cards = [
    { label: "States", value: stats.states, icon: FiMap, color: "bg-blue-50 text-blue-600", href: "/admin/states" },
    { label: "Cities", value: stats.cities, icon: FiMapPin, color: "bg-green-50 text-green-600", href: "/admin/cities" },
    { label: "Places", value: stats.places, icon: FiCompass, color: "bg-orange-50 text-orange-600", href: "/admin/places" },
    { label: "Total Records", value: stats.states + stats.cities + stats.places, icon: FiTrendingUp, color: "bg-purple-50 text-purple-600", href: "#" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold font-heading">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome to TravelBharat admin panel</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="glass-card p-6 group">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center`}>
                <card.icon className="text-xl" />
              </div>
            </div>
            <p className="text-3xl font-extrabold font-heading">{loading ? "—" : card.value}</p>
            <p className="text-sm text-gray-500">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="glass-card p-6">
        <h2 className="text-xl font-bold font-heading mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/admin/states" className="p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors text-center">
            <FiMap className="text-2xl text-blue-600 mx-auto mb-2" />
            <p className="font-medium text-sm">Manage States</p>
          </Link>
          <Link href="/admin/cities" className="p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors text-center">
            <FiMapPin className="text-2xl text-green-600 mx-auto mb-2" />
            <p className="font-medium text-sm">Manage Cities</p>
          </Link>
          <Link href="/admin/places" className="p-4 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors text-center">
            <FiCompass className="text-2xl text-orange-600 mx-auto mb-2" />
            <p className="font-medium text-sm">Manage Places</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
