import mongoose, { Schema, models } from "mongoose";

const adminSchema = new Schema({
  adminName: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Admin = models.Admin || mongoose.model("Admin", adminSchema);

export default Admin;
