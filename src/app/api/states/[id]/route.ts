import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import State from "@/models/State";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const state = await State.findById(id);
    if (!state) return NextResponse.json({ error: "State not found" }, { status: 404 });
    return NextResponse.json(state);
  } catch (error) {
    console.error("GET /api/states/[id] error:", error);
    return NextResponse.json({ error: "Failed to fetch state" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const state = await State.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!state) return NextResponse.json({ error: "State not found" }, { status: 404 });
    return NextResponse.json(state);
  } catch (error) {
    console.error("PUT /api/states/[id] error:", error);
    return NextResponse.json({ error: "Failed to update state" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const state = await State.findByIdAndDelete(id);
    if (!state) return NextResponse.json({ error: "State not found" }, { status: 404 });
    return NextResponse.json({ message: "State deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/states/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete state" }, { status: 500 });
  }
}
