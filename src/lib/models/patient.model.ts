import mongoose from "mongoose";
import moment from "moment-timezone";

const patientSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

// Pre-save hook for IST
patientSchema.pre("save", function (next) {
  const istNow = moment().tz("Asia/Kolkata").toDate();
  if (!this.createdAt) {
    this.createdAt = istNow;
  }
  this.updatedAt = istNow;
  next();
});

export const PatientOf2025 =
  mongoose.models.PatientOf2025 ||
  mongoose.model("PatientOf2025", patientSchema);
