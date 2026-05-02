import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import dbConnect from "@/lib/db";
import City from "@/models/City";
import State from "@/models/State";
import TouristPlace from "@/models/TouristPlace";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { notFound } from "next/navigation";
import { categoryColors } from "@/lib/utils";

interface Props { params: Promise<{ slug: string }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await dbConnect();
  const { slug } = await params;
  const city = await City.findOne({ slug }).populate("stateId", "name");
  if (!city) return { title: "City Not Found" };
  return { title: `${city.name} – Tourist Places`, description: `Explore tourist destinations in ${city.name}` };
}

export default async function CityDetailPage({ params }: Props) {
  await dbConnect();
  const { slug } = await params;
  const city = await City.findOne({ slug }).populate("stateId", "name slug").lean();
  if (!city) notFound();
  const cityId = (city as unknown as { _id: { toString(): string } })._id.toString();
  const places = await TouristPlace.find({ cityId }).lean();
  const c = JSON.parse(JSON.stringify(city));
  const p = JSON.parse(JSON.stringify(places));

  return (
    <div className="pt-16">
      <div className="relative h-64 md:h-80">
        <Image src={c.image} alt={c.name} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
            <Link href="/states" className="hover:text-white">States</Link><span>/</span>
            <Link href={`/states/${c.stateId?.slug}`} className="hover:text-white">{c.stateId?.name}</Link><span>/</span>
            <span className="text-white">{c.name}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white font-heading">{c.name}</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <span className="flex items-center gap-1.5 text-sm text-gray-500"><FiMapPin className="text-saffron-500" /> {c.stateId?.name}</span>
          {c.bestTime && <span className="flex items-center gap-1.5 text-sm text-gray-500"><FiCalendar className="text-saffron-500" /> Best time: {c.bestTime}</span>}
        </div>
        <p className="text-gray-600 leading-relaxed max-w-3xl mb-10">{c.description}</p>
        <h2 className="text-2xl font-bold font-heading mb-6">Tourist Places in {c.name} <span className="text-gray-400 text-base font-normal ml-2">({p.length})</span></h2>
        {p.length === 0 ? (
          <div className="text-center py-16 text-gray-400"><p>No tourist places added yet</p></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {p.map((place: { _id: string; name: string; slug: string; images: string[]; category: string; description: string; bestTime: string }) => (
              <Link key={place._id} href={`/place/${place.slug}`} className="group">
                <div className="glass-card overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={place.images?.[0] || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400"} alt={place.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="33vw" />
                    <div className="absolute top-3 left-3"><span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${categoryColors[place.category] || "bg-gray-100 text-gray-700"}`}>{place.category}</span></div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 group-hover:text-saffron-600 transition-colors mb-1">{place.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{place.description}</p>
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
