import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import dbConnect from "@/lib/db";
import State from "@/models/State";
import City from "@/models/City";
import TouristPlace from "@/models/TouristPlace";
import { FiCalendar, FiMapPin, FiInfo } from "react-icons/fi";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await dbConnect();
  const { slug } = await params;
  const state = await State.findOne({ slug });
  if (!state) return { title: "State Not Found" };
  return {
    title: state.name,
    description: state.description?.substring(0, 160),
    openGraph: { title: `${state.name} – TravelBharat`, description: state.description?.substring(0, 160), images: [state.image] },
  };
}

export default async function StateDetailPage({ params }: Props) {
  await dbConnect();
  const { slug } = await params;
  const state = await State.findOne({ slug }).lean();
  if (!state) notFound();

  const stateId = (state as unknown as { _id: { toString(): string } })._id.toString();
  const [cities, places] = await Promise.all([
    City.find({ stateId }).lean(),
    TouristPlace.find({ stateId }).populate("cityId", "name slug").limit(12).lean(),
  ]);

  const s = JSON.parse(JSON.stringify(state));
  const c = JSON.parse(JSON.stringify(cities));
  const p = JSON.parse(JSON.stringify(places));

  return (
    <div className="pt-16">
      {/* Banner */}
      <div className="relative h-72 md:h-96">
        <Image src={s.image} alt={s.name} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
            <Link href="/states" className="hover:text-white">States</Link>
            <span>/</span>
            <span className="text-white">{s.name}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white font-heading">{s.name}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-2xl font-bold font-heading mb-4">About {s.name}</h2>
              <p className="text-gray-600 leading-relaxed">{s.description}</p>
            </div>

            {/* Cities */}
            {c.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold font-heading mb-6">Famous Cities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {c.map((city: { _id: string; name: string; slug: string; image: string }) => (
                    <Link key={city._id} href={`/cities/${city.slug}`} className="group">
                      <div className="glass-card overflow-hidden">
                        <div className="relative h-32">
                          <Image src={city.image} alt={city.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="33vw" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-3 left-3">
                            <p className="text-white font-semibold text-sm">{city.name}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Top Attractions */}
            {p.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold font-heading mb-6">Top Attractions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {p.map((place: { _id: string; name: string; slug: string; images: string[]; category: string; cityId?: { name: string } }) => (
                    <Link key={place._id} href={`/place/${place.slug}`} className="group flex gap-4 p-4 glass-card">
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={place.images?.[0] || "/images/placeholder.jpg"} alt={place.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="96px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 group-hover:text-saffron-600 transition-colors">{place.name}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                          <FiMapPin className="text-xs" />
                          {place.cityId?.name || s.name}
                        </p>
                        <span className="inline-block mt-2 text-xs px-2.5 py-0.5 rounded-full bg-saffron-50 text-saffron-700 capitalize">{place.category}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold font-heading mb-4 flex items-center gap-2">
                <FiInfo className="text-saffron-600" /> Quick Facts
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Capital</span>
                  <span className="font-medium">{s.capital}</span>
                </div>
                {s.quickFacts?.map((fact: string, i: number) => (
                  <div key={i} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-saffron-500 mt-0.5">•</span>
                    {fact}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-bold font-heading mb-4 flex items-center gap-2">
                <FiCalendar className="text-saffron-600" /> Best Season
              </h3>
              <p className="text-gray-600 text-sm">{s.bestSeason}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
