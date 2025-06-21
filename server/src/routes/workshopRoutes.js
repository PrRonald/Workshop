import express from 'express';
import {
  getWorkshops,
  getWorkshop,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop
} from '../controllers/workshopController.js';

const router = express.Router();

// Workshop routes
router.get('/', getWorkshops);
router.get('/:id', getWorkshop);
router.post('/', createWorkshop);
router.patch('/:id', updateWorkshop);
router.delete('/:id', deleteWorkshop);

export default router;