import { Sighting } from '../models/sightings.js';
import { sanitizeInput } from '../utils/sanitizeInput.js'

export async function getAllSightings(req, res) {
  try {
    const sightings = await Sighting.find().sort({createdAt: -1 });
    res.json(sightings)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to fetch sightings" })
  }
}

export async function createSighting(req, res) {
  try {
    const sanitized = sanitizeInput(req.body);
    const { title, text, location,timeStamp } = sanitized;

    if (!title || !text || !location || !timeStamp) {
      return res.status(500).json({ message: "All fields are required"})
    }

    const sighting = new Sighting({
      title,
      text, 
      location,
      timeStamp: new Date(timeStamp),
    });

    await sighting.save();
    res.status(201).json(sighting)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Failed to create sighting"})
  }
}

export async function updateSighting(req, res) {
  try {
    const {id} = req.params;
    const sanitized = sanitizeInput(req.body);
    const { title, text, location, timeStamp } = sanitized;

    if (!title || !text || !location || !timeStamp ) {
      return res.status(500).json({ message: "All fields are required"})
    }

    const updated = await Sighting.findByIdAndUpdate(
      id,
      { title, text, location, timeStamp: new Date(timeStamp) },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Sighting not found" })
    }

    res.json(updated)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to update sighting" })
  }
}

export async function deleteSighting(req, res) {
  try {
    const { id } = req.params;

    const deleted = await Sighting.findByIdAndDelete(id)

    if (!deleted) {
      return res.status(404).json({ message: "Sighting not found" })
    }

    res.status(204).send()
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete sighting" })
  }
}

