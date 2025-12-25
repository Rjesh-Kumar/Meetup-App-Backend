const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    speaker: { type: String }, // optional (can also reference speaker object later if needed)
  },
  { _id: false }
);

const VenueSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  { _id: false }
);

// ✅ New schema for speakers
const SpeakerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: "Speaker" }, // e.g. Keynote Speaker, Panelist, Moderator
    bio: { type: String }, // optional (future extension)
    photoUrl: { type: String }, // optional (if not provided, fallback to avatar API)
    isHost: { type: Boolean, default: false } // ✅ NEW
  },
  { _id: false }
);

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    type: {
      type: String,
      enum: ["Online", "Offline"],
      required: true,
    },
    thumbnailUrl: { type: String },

    sessions: [SessionSchema], // allows multiple sessions
    speakers: [SpeakerSchema], // ✅ updated to store objects with roles

    price: {
      currency: { type: String, default: "USD" },
      amount: { type: Number, default: 0 }, // 0 means free
    },
    venue: VenueSchema,
    tags: { type: [String] },
    dressCode: { type: String },
    ageRestriction: { type: String },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
