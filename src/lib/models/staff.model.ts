import mongoose, { Schema, models } from "mongoose";

const staffSchema = new Schema({
  staffName: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Staff = models.Staff || mongoose.model("Staff", staffSchema);

export default Staff;
