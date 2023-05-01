import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: false,
  },
  isImportant: {
    type: Boolean,
  },
});

export default mongoose.model('Notes', noteSchema);
