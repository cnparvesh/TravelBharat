import Link from "next/link";
import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";

const footerLinks = {
  explore: [
    { name: "All States", href: "/states" },
    { name: "Heritage Sites", href: "/categories/heritage" },
    { name: "Nature & Wildlife", href: "/categories/nature" },
    { name: "Religious Places", href: "/categories/religious" },
    { name: "Adventure", href: "/categories/adventure" },
  ],
  popular: [
    { name: "Rajasthan", href: "/states/rajasthan" },
    { name: "Kerala", href: "/states/kerala" },
    { name: "Goa", href: "/states/goa" },
    { name: "Himachal Pradesh", href: "/states/himachal-pradesh" },
    { name: "Uttarakhand", href: "/states/uttarakhand" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Search", href: "/search" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg gradient-saffron flex items-center justify-center">
                <FiMapPin className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold font-heading">
                <span className="text-saffron-400">Travel</span>
                <span className="text-white">Bharat</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your ultimate digital travel encyclopedia for exploring India state by state, city by city. Discover the incredible diversity of Indian tourism.
            </p>
            <div className="space-y-2">
              <a href="mailto:info@travelbharat.com" className="flex items-center gap-2 text-gray-400 text-sm hover:text-saffron-400 transition-colors">
                <FiMail className="text-sm" />
                info@travelbharat.com
              </a>
              <a href="tel:+911234567890" className="flex items-center gap-2 text-gray-400 text-sm hover:text-saffron-400 transition-colors">
                <FiPhone className="text-sm" />
                +91 12345 67890
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Explore</h3>
            <ul className="space-y-2.5">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 text-sm hover:text-saffron-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular States */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Popular States</h3>
            <ul className="space-y-2.5">
              {footerLinks.popular.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 text-sm hover:text-saffron-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">Company</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 text-sm hover:text-saffron-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} TravelBharat. All rights reserved.
            </p>
            <div className="flex items-center gap-1">
              <span className="text-gray-500 text-sm">Made with</span>
              <span className="text-red-500">❤️</span>
              <span className="text-gray-500 text-sm">in India</span>
              <span className="ml-1">🇮🇳</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
