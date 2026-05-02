import { Metadata } from "next";
import dbConnect from "@/lib/db";
import TouristPlace from "@/models/TouristPlace";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { categories, categoryColors } from "@/lib/utils";

interface Props { params: Promise<{ slug: string }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return { title: "Category Not Found" };
  return { title: `${cat.name} Destinations`, description: cat.description };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();

  await dbConnect();
  const places = await TouristPlace.find({ category: slug }).populate("stateId", "name slug").populate("cityId", "name slug").lean();
  const p = JSON.parse(JSON.stringify(places));

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 p-10 rounded-3xl bg-gradient-to-br ${cat.color} text-white`}>
          <span className="text-5xl mb-4 block">{cat.icon}</span>
          <h1 className="text-4xl font-extrabold font-heading mb-3">{cat.name} Destinations</h1>
          <p className="text-white/80 max-w-xl mx-auto">{cat.description}</p>
        </div>

        {/* Category Nav */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((c) => (
            <Link key={c.slug} href={`/categories/${c.slug}`} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${c.slug === slug ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {c.icon} {c.name}
            </Link>
          ))}
        </div>

        {p.length === 0 ? (
          <div className="text-center py-16 text-gray-400"><p>No {cat.name.toLowerCase()} destinations found</p></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {p.map((place: { _id: string; name: string; slug: string; images: string[]; category: string; description: string; stateId?: { name: string }; cityId?: { name: string } }) => (
              <Link key={place._id} href={`/place/${place.slug}`} className="group">
                <div className="glass-card overflow-hidden">
                  <div className="relative h-52 overflow-hidden">
                    <Image src={place.images?.[0] || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400"} alt={place.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="33vw" />
                    <div className="absolute top-3 left-3"><span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${categoryColors[place.category]}`}>{place.category}</span></div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 group-hover:text-saffron-600 transition-colors mb-1">{place.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{place.description}</p>
                    <p className="text-xs text-gray-400 mt-2">{place.cityId?.name}, {place.stateId?.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
