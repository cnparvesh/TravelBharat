import mongoose, { Schema, Document, Model } from "mongoose";

export interface IState extends Document {
  name: string;
  slug: string;
  image: string;
  description: string;
  capital: string;
  bestSeason: string;
  quickFacts: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const StateSchema = new Schema<IState>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    capital: { type: String, required: true },
    bestSeason: { type: String, required: true },
    quickFacts: [{ type: String }],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const State: Model<IState> = mongoose.models.State || mongoose.model<IState>("State", StateSchema);
export default State;
