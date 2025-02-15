import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    file_name: String,
    file_url: String,
    file_size: Number,
    public_id: String,
  },
  { versionKey: false }
);

export const Gallery = mongoose.model('Gallery', gallerySchema);