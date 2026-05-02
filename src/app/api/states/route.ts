import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import State from "@/models/State";
import { slugify } from "@/lib/utils";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");

    const filter: Record<string, unknown> = {};
    if (featured === "true") filter.featured = true;

    const states = await State.find(filter).sort({ name: 1 });
    return NextResponse.json(states);
  } catch (error) {
    console.error("GET /api/states error:", error);
    return NextResponse.json({ error: "Failed to fetch states" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();

    if (!body.name || !body.description || !body.image) {
      return NextResponse.json({ error: "Name, description, and image are required" }, { status: 400 });
    }

    body.slug = body.slug || slugify(body.name);

    const existing = await State.findOne({ slug: body.slug });
    if (existing) {
      return NextResponse.json({ error: "State with this name already exists" }, { status: 409 });
    }

    const state = await State.create(body);
    return NextResponse.json(state, { status: 201 });
  } catch (error) {
    console.error("POST /api/states error:", error);
    return NextResponse.json({ error: "Failed to create state" }, { status: 500 });
  }
}
