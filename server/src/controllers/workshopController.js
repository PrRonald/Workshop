import Workshop from '../models/Workshop.js';

// Get all workshops
export const getWorkshops = async (req, res) => {
  try {
    const workshops = await Workshop.find().sort({ date: 1 });
    res.status(200).json(workshops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single workshop
export const getWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);
    if (!workshop) {
      return res.status(404).json({ message: 'Workshop not found' });
    }
    res.status(200).json(workshop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new workshop
export const createWorkshop = async (req, res) => {
  const workshop = new Workshop(req.body);
  try {
    const newWorkshop = await workshop.save();
    res.status(201).json(newWorkshop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a workshop
export const updateWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);
    if (!workshop) {
      return res.status(404).json({ message: 'Workshop not found' });
    }
    
    Object.assign(workshop, req.body);
    const updatedWorkshop = await workshop.save();
    res.status(200).json(updatedWorkshop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a workshop
export const deleteWorkshop = async (req, res) => {
  try {
    const workshop = await Workshop.findByIdAndDelete(req.params.id);
    if (!workshop) {
      return res.status(404).json({ message: 'Workshop not found' });
    }

    res.status(200).json({ message: 'Workshop deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};