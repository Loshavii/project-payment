const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProfileSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  phone: { type: String, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  bloodType: { type: String },
  allergies: { type: String },
  chronicConditions: { type: String },
  medications: { type: String },
  dietaryPreferences: { type: String },
  exerciseRoutine: { type: String },
  sleepPattern: { type: Number },
  targetWeight: { type: Number },
  fitnessObjectives: { type: String },
  bloodPressure: { type: String },
  heartRate: { type: Number },
  bloodSugarLevels: { type: String },
  contactOption: { type: String, enum: ['chat', 'video'], required: true },
  coachEmail: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'declined'], default: 'pending' }
}, { timestamps: true });

const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile; // Change export to CommonJS
