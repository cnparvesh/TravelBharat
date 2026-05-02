import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface ITouristPlace extends Document {
  name: string;
  slug: string;
  stateId: Types.ObjectId;
  cityId: Types.ObjectId;
  category: "heritage" | "nature" | "religious" | "adventure";
  images: string[];
  description: string;
  history: string;
  bestTime: string;
  fees: string;
  timings: string;
  mapLink: string;
  nearbyAttractions: string[];
  tips: string[];
  tags: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TouristPlaceSchema = new Schema<ITouristPlace>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    stateId: { type: Schema.Types.ObjectId, ref: "State", required: true, index: true },
    cityId: { type: Schema.Types.ObjectId, ref: "City", required: true, index: true },
    category: {
      type: String,
      required: true,
      enum: ["heritage", "nature", "religious", "adventure"],
      index: true,
    },
    images: [{ type: String }],
    description: { type: String, required: true },
    history: { type: String, default: "" },
    bestTime: { type: String, default: "" },
    fees: { type: String, default: "Free" },
    timings: { type: String, default: "Open 24 hours" },
    mapLink: { type: String, default: "" },
    nearbyAttractions: [{ type: String }],
    tips: [{ type: String }],
    tags: [{ type: String }],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

TouristPlaceSchema.index({ name: "text", description: "text" });

const TouristPlace: Model<ITouristPlace> =
  mongoose.models.TouristPlace || mongoose.model<ITouristPlace>("TouristPlace", TouristPlaceSchema);
export default TouristPlace;
