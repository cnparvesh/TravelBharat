import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import City from "@/models/City";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const city = await City.findById(id).populate("stateId", "name slug");
    if (!city) return NextResponse.json({ error: "City not found" }, { status: 404 });
    return NextResponse.json(city);
  } catch (error) {
    console.error("GET /api/cities/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch city" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const city = await City.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!city) return NextResponse.json({ error: "City not found" }, { status: 404 });
    return NextResponse.json(city);
  } catch (error) {
    console.error("PUT /api/cities/[id] error:", error);
    return NextResponse.json({ error: "Failed to update city" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const city = await City.findByIdAndDelete(id);
    if (!city) return NextResponse.json({ error: "City not found" }, { status: 404 });
    return NextResponse.json({ message: "City deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/cities/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete city" }, { status: 500 });
  }
}
