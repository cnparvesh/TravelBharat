import Link from "next/link";
import { Metadata } from "next";
import dbConnect from "@/lib/db";
import TouristPlace from "@/models/TouristPlace";
import { notFound } from "next/navigation";
import { FiMapPin, FiClock, FiDollarSign, FiCalendar, FiNavigation, FiInfo } from "react-icons/fi";
import ImageGallery from "@/components/ui/ImageGallery";
import { categoryColors } from "@/lib/utils";

interface Props { params: Promise<{ slug: string }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await dbConnect();
  const { slug } = await params;
  const place = await TouristPlace.findOne({ slug }).populate("stateId", "name").populate("cityId", "name");
  if (!place) return { title: "Place Not Found" };
  return {
    title: place.name,
    description: place.description?.substring(0, 160),
    openGraph: { title: `${place.name} – TravelBharat`, description: place.description?.substring(0, 160), images: place.images?.[0] ? [place.images[0]] : [] },
  };
}

export default async function PlaceDetailPage({ params }: Props) {
  await dbConnect();
  const { slug } = await params;
  const place = await TouristPlace.findOne({ slug }).populate("stateId", "name slug").populate("cityId", "name slug").lean();
  if (!place) notFound();

  const stateId = (place as unknown as { stateId: { _id: string } }).stateId?._id;
  const related = stateId ? await TouristPlace.find({ stateId, slug: { $ne: slug } }).limit(4).lean() : [];

  const p = JSON.parse(JSON.stringify(place));
  const r = JSON.parse(JSON.stringify(related));

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6 flex-wrap">
          <Link href="/" className="hover:text-saffron-600">Home</Link><span>/</span>
          <Link href="/states" className="hover:text-saffron-600">States</Link><span>/</span>
          {p.stateId && <><Link href={`/states/${p.stateId.slug}`} className="hover:text-saffron-600">{p.stateId.name}</Link><span>/</span></>}
          {p.cityId && <><Link href={`/cities/${p.cityId.slug}`} className="hover:text-saffron-600">{p.cityId.name}</Link><span>/</span></>}
          <span className="text-gray-700">{p.name}</span>
        </div>

        {/* Gallery */}
        <ImageGallery images={p.images || []} alt={p.name} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <h1 className="text-3xl md:text-4xl font-extrabold font-heading">{p.name}</h1>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${categoryColors[p.category] || "bg-gray-100 text-gray-700"}`}>{p.category}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <FiMapPin className="text-saffron-500" />
                {p.cityId?.name && <span>{p.cityId.name},</span>}
                {p.stateId?.name && <span>{p.stateId.name}</span>}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold font-heading mb-3">About this Place</h2>
              <p className="text-gray-600 leading-relaxed">{p.description}</p>
            </div>

            {p.history && (
              <div>
                <h2 className="text-xl font-bold font-heading mb-3">Historical Significance</h2>
                <p className="text-gray-600 leading-relaxed">{p.history}</p>
              </div>
            )}

            {p.tips?.length > 0 && (
              <div>
                <h2 className="text-xl font-bold font-heading mb-3">Travel Tips</h2>
                <ul className="space-y-2">
                  {p.tips.map((tip: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600 text-sm">
                      <span className="text-saffron-500 mt-0.5">✦</span>{tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {p.nearbyAttractions?.length > 0 && (
              <div>
                <h2 className="text-xl font-bold font-heading mb-3">Nearby Attractions</h2>
                <div className="flex flex-wrap gap-2">
                  {p.nearbyAttractions.map((a: string, i: number) => (
                    <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm">{a}</span>
                  ))}
                </div>
              </div>
            )}

            {p.mapLink && (
              <div>
                <h2 className="text-xl font-bold font-heading mb-3">Location</h2>
                <a href={p.mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 btn-primary text-sm">
                  <FiNavigation /> View on Google Maps
                </a>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="glass-card p-6 space-y-4">
              <h3 className="text-lg font-bold font-heading flex items-center gap-2"><FiInfo className="text-saffron-600" /> Visit Information</h3>
              {p.bestTime && <div className="flex items-center gap-3 text-sm"><FiCalendar className="text-saffron-500" /><div><p className="text-gray-400 text-xs">Best Time</p><p className="font-medium">{p.bestTime}</p></div></div>}
              {p.fees && <div className="flex items-center gap-3 text-sm"><FiDollarSign className="text-saffron-500" /><div><p className="text-gray-400 text-xs">Entry Fees</p><p className="font-medium">{p.fees}</p></div></div>}
              {p.timings && <div className="flex items-center gap-3 text-sm"><FiClock className="text-saffron-500" /><div><p className="text-gray-400 text-xs">Timings</p><p className="font-medium">{p.timings}</p></div></div>}
            </div>

            {p.tags?.length > 0 && (
              <div className="glass-card p-6">
                <h3 className="text-lg font-bold font-heading mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t: string) => <span key={t} className="px-3 py-1 bg-saffron-50 text-saffron-700 rounded-full text-xs font-medium capitalize">{t}</span>)}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {r.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold font-heading mb-6">Related Destinations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {r.map((rel: { _id: string; name: string; slug: string; images: string[]; category: string }) => (
                <Link key={rel._id} href={`/place/${rel.slug}`} className="group glass-card overflow-hidden">
                  <div className="relative h-40 overflow-hidden">
                    <img src={rel.images?.[0] || ""} alt={rel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-sm group-hover:text-saffron-600 transition-colors">{rel.name}</h3>
                    <span className="text-xs text-gray-400 capitalize">{rel.category}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
