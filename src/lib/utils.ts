export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatCategory(cat: string): string {
  return cat.charAt(0).toUpperCase() + cat.slice(1);
}

export const categories = [
  { name: "Heritage", slug: "heritage", icon: "🏛️", color: "from-amber-500 to-orange-600", description: "Explore India's rich historical monuments, forts, and palaces" },
  { name: "Nature", slug: "nature", icon: "🌿", color: "from-emerald-500 to-green-600", description: "Discover breathtaking landscapes, hills, and waterfalls" },
  { name: "Religious", slug: "religious", icon: "🕌", color: "from-purple-500 to-indigo-600", description: "Visit sacred temples, mosques, churches, and gurudwaras" },
  { name: "Adventure", slug: "adventure", icon: "🏔️", color: "from-red-500 to-rose-600", description: "Experience thrilling treks, sports, and outdoor activities" },
];

export const categoryColors: Record<string, string> = {
  heritage: "bg-amber-100 text-amber-800",
  nature: "bg-emerald-100 text-emerald-800",
  religious: "bg-purple-100 text-purple-800",
  adventure: "bg-red-100 text-red-800",
};
