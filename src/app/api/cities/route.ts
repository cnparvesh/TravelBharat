import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import City from "@/models/City";
import { slugify } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const stateId = searchParams.get("stateId");

    const filter: Record<string, unknown> = {};
    if (stateId) filter.stateId = stateId;

    const cities = await City.find(filter).populate("stateId", "name slug").sort({ name: 1 });
    return NextResponse.json(cities);
  } catch (error) {
    console.error("GET /api/cities error:", error);
    return NextResponse.json({ error: "Failed to fetch cities" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    if (!body.name || !body.stateId || !body.image) {
      return NextResponse.json({ error: "Name, stateId, and image are required" }, { status: 400 });
    }

    body.slug = body.slug || slugify(body.name);
    body.description = body.description || "";

    const existing = await City.findOne({ slug: body.slug });
    if (existing) {
      return NextResponse.json({ error: "City with this name already exists" }, { status: 409 });
    }

    const city = await City.create(body);
    return NextResponse.json(city, { status: 201 });
  } catch (error) {
    console.error("POST /api/cities error:", error);
    return NextResponse.json({ error: "Failed to create city" }, { status: 500 });
  }
}
