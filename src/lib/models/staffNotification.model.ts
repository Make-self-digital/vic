import mongoose from "mongoose";

const StaffNotificationSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PatientOf2025",
    required: true,
  },
  notifications: [
    {
      type: {
        type: String,
        enum: ["appointment_confirmation", "general"],
        required: true,
      },
      title: { type: String, required: true },
      message: { type: String, required: true },
      url: { type: String },
      read: { type: Boolean, default: false },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.StaffNotification ||
  mongoose.model("StaffNotification", StaffNotificationSchema);
