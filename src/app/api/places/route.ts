import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import TouristPlace from "@/models/TouristPlace";
import { slugify } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const stateId = searchParams.get("stateId");
    const cityId = searchParams.get("cityId");
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    const featured = searchParams.get("featured");
    const limit = searchParams.get("limit");

    const filter: Record<string, unknown> = {};
    if (stateId) filter.stateId = stateId;
    if (cityId) filter.cityId = cityId;
    if (category) filter.category = category;
    if (tag) filter.tags = tag;
    if (featured === "true") filter.featured = true;

    let query = TouristPlace.find(filter)
      .populate("stateId", "name slug")
      .populate("cityId", "name slug")
      .sort({ createdAt: -1 });

    if (limit) query = query.limit(parseInt(limit));

    const places = await query;
    return NextResponse.json(places);
  } catch (error) {
    console.error("GET /api/places error:", error);
    return NextResponse.json({ error: "Failed to fetch places" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    if (!body.name || !body.stateId || !body.cityId || !body.category || !body.description) {
      return NextResponse.json(
        { error: "Name, stateId, cityId, category, and description are required" },
        { status: 400 }
      );
    }

    body.slug = body.slug || slugify(body.name);

    const existing = await TouristPlace.findOne({ slug: body.slug });
    if (existing) {
      return NextResponse.json({ error: "Place with this name already exists" }, { status: 409 });
    }

    const place = await TouristPlace.create(body);
    return NextResponse.json(place, { status: 201 });
  } catch (error) {
    console.error("POST /api/places error:", error);
    return NextResponse.json({ error: "Failed to create place" }, { status: 500 });
  }
}
