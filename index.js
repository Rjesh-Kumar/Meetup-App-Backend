const express = require("express");
const cors = require("cors");
const app = express();

const { initializeDatabase } = require("./db/db.connect");
const Event = require("./models/events.models"); // Assuming you have this model

// Middleware
const corsOption = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOption));
app.use(express.json());

// Initialize the database connection
initializeDatabase();

// --- API Helper Functions (Best practice: keep business logic separate from routes) ---

// Create a new event
async function createNewEvent(newEvent) {
  try {
    const event = new Event(newEvent);
    const saveEvent = await event.save();
    return saveEvent;
  } catch (error) {
    throw error;
  }
}

// Get all events
async function getAllEvents() {
  try {
    const events = await Event.find();
    return events;
  } catch (error) {
    throw error;
  }
}

// Get a single event by ID
async function getEventById(eventId) {
  try {
    const event = await Event.findById(eventId);
    return event;
  } catch (error) {
    throw error;
  }
}

// Update an event by ID
async function updateEventById(eventId, dataToUpdate) {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(eventId, dataToUpdate, { new: true });
    return updatedEvent;
  } catch (error) {
    throw error;
  }
}

// Delete an event by ID
async function deleteEvent(eventId) {
  try {
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    return deletedEvent;
  } catch (error) {
    throw error;
  }
}

// Search and filter events
async function searchEvents(type = "Both", query = "") {
  try {
    let filter = {};

    // Filter by type (Online / Offline / Both)
    if (type && type !== "Both") {
      filter.type = type;
    }

    // Search by title or tags
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } }, // case-insensitive
        { tags: { $regex: query, $options: "i" } },
      ];
    }

    const events = await Event.find(filter);
    return events;
  } catch (error) {
    throw error;
  }
}

// --- API Routes ---

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to Meetup App Backend 🚀");
});

// GET all events
app.get("/events", async (req, res) => {
  try {
    const events = await getAllEvents();
    res.json({ events });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch events." });
  }
});

// IMPORTANT: The specific `/events/search` route MUST come BEFORE the dynamic `/events/:id` route.
// This prevents Express from mistaking "search" as a valid ID.
app.get("/events/search", async (req, res) => {
  try {
    const { type, q } = req.query; // type=Online/Offline/Both, q=search term
    const events = await searchEvents(type, q);
    res.json({ events });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to search/filter events." });
  }
});

// GET a single event by ID
app.get("/events/:id", async (req, res) => {
  try {
    const event = await getEventById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found." });
    res.json({ event });
  } catch (error) {
    // This handles invalid MongoDB ID format
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch event." });
  }
});

// POST a new event
app.post("/events", async (req, res) => {
  try {
    const savedEvent = await createNewEvent(req.body);
    res.status(201).json({ message: "Event added successfully.", event: savedEvent });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to add Event." });
  }
});

// POST to update an event by ID (Using POST for update is non-standard; PUT/PATCH is preferred)
app.post("/events/:eventId", async (req, res) => {
  try {
    const updatedEvent = await updateEventById(req.params.eventId, req.body);
    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found." });
    }
    res.status(200).json({ message: "Event is updated successfully.", event: updatedEvent });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to update event." });
  }
});

// DELETE an event by ID
app.delete("/events/:eventId", async (req, res) => {
  try {
    const deletedEvent = await deleteEvent(req.params.eventId);

    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found." });
    }

    res.status(200).json({
      message: "Event deleted successfully.",
      deletedEvent: deletedEvent,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to delete event." });
  }
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});