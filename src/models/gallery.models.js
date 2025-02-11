

import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    file_type: String,
    file_name: String,
    file_size: Number,
    file_url: String,
  },
  { versionKey: false }
);

export const Gallery = mongoose.model('Gallery', gallerySchema);
