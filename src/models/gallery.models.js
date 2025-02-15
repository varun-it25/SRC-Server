import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const gallerySchema = new Schema(
  {
    // The Cloudinary URL string
    cloudinaryUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Gallery = model('Gallery', gallerySchema);
