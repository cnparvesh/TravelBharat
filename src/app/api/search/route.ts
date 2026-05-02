import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import State from "@/models/State";
import City from "@/models/City";
import TouristPlace from "@/models/TouristPlace";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";
    const category = searchParams.get("category");
    const state = searchParams.get("state");

    if (!q && !category && !state) {
      return NextResponse.json({ states: [], cities: [], places: [] });
    }

    const regex = new RegExp(q, "i");

    const placeFilter: Record<string, unknown> = {};
    if (q) placeFilter.$or = [{ name: regex }, { description: regex }];
    if (category) placeFilter.category = category;

    let stateIds: string[] = [];
    if (state) {
      const stateDoc = await State.findOne({ slug: state });
      if (stateDoc) {
        stateIds = [stateDoc._id.toString()];
        placeFilter.stateId = stateDoc._id;
      }
    }

    const [states, cities, places] = await Promise.all([
      q ? State.find({ $or: [{ name: regex }, { description: regex }] }).limit(5) : [],
      q ? City.find({ $or: [{ name: regex }, { description: regex }] }).populate("stateId", "name slug").limit(5) : [],
      TouristPlace.find(placeFilter)
        .populate("stateId", "name slug")
        .populate("cityId", "name slug")
        .limit(20),
    ]);

    return NextResponse.json({ states, cities, places });
  } catch (error) {
    console.error("GET /api/search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
