import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import TouristPlace from "@/models/TouristPlace";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const place = await TouristPlace.findById(id)
      .populate("stateId", "name slug")
      .populate("cityId", "name slug");
    if (!place) return NextResponse.json({ error: "Place not found" }, { status: 404 });
    return NextResponse.json(place);
  } catch (error) {
    console.error("GET /api/places/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch place" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const place = await TouristPlace.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!place) return NextResponse.json({ error: "Place not found" }, { status: 404 });
    return NextResponse.json(place);
  } catch (error) {
    console.error("PUT /api/places/[id] error:", error);
    return NextResponse.json({ error: "Failed to update place" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const place = await TouristPlace.findByIdAndDelete(id);
    if (!place) return NextResponse.json({ error: "Place not found" }, { status: 404 });
    return NextResponse.json({ message: "Place deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/places/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete place" }, { status: 500 });
  }
}
