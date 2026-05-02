"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiGrid, FiMap, FiMapPin, FiCompass, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin/dashboard", icon: FiGrid },
  { name: "States", href: "/admin/states", icon: FiMap },
  { name: "Cities", href: "/admin/cities", icon: FiMapPin },
  { name: "Places", href: "/admin/places", icon: FiCompass },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-navy-900 text-white rounded-lg shadow-lg"
      >
        {collapsed ? <FiX /> : <FiMenu />}
      </button>

      <aside
        className={`fixed left-0 top-0 h-full bg-navy-900 text-white transition-all duration-300 z-40 ${
          collapsed ? "w-64 translate-x-0" : "w-64 -translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6">
          <Link href="/admin/dashboard" className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg gradient-saffron flex items-center justify-center">
              <FiMapPin className="text-white text-sm" />
            </div>
            <div>
              <span className="text-lg font-bold font-heading">TravelBharat</span>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </Link>

          <nav className="space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setCollapsed(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-saffron-600 text-white shadow-lg shadow-saffron-600/30"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="text-lg" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <FiLogOut className="text-lg" />
            Back to Site
          </Link>
        </div>
      </aside>
    </>
  );
}
