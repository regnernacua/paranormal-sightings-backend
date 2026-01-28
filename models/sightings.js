import mongoose from "mongoose";

const { Schema, model } = mongoose;

const sightingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    timeStamp: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Sighting = model("Sighting", sightingSchema);