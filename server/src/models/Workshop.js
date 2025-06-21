import mongoose from 'mongoose';

const workshopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['complete', 'in-progress', 'waiting-for-parts', 'cancelled'],
    default: 'waiting-for-parts'
  }
}, {
  timestamps: true
});

export default mongoose.model('Workshop', workshopSchema);