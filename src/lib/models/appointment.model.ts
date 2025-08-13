import mongoose from "mongoose";
import moment from "moment-timezone";

const AppointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PatientOf2025",
      required: true,
    },
    patientName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    appointmentDate: {
      type: String,
      required: true,
    },
    appointmentTime: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    status: {
      type: String,
      default: "Pending",
    },
    reportStatus: {
      type: String,
      enum: ["pending", "ready"],
      default: "pending",
    },
    payment: {
      type: Number,
      default: 0,
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
    bookingCount: {
      type: Number,
    },
    doctorName: {
      type: String,
    },
    lastDate: {
      type: String,
    },
    reportUrl: {
      type: [String],
      default: [],
    },
    patientReport: {
      Scan: { type: String },
      ClinicalHistory: { type: String },
      Findings: {
        type: [String],
        default: [],
      },
      Impression: {
        type: [String],
        default: [],
      },
      ImageUrls: {
        type: [String],
        default: [],
      },
    },
    bookingTime: {
      type: String,
    },
  },
  { timestamps: true }
);

// Pre-save hook for IST
AppointmentSchema.pre("save", function (next) {
  const istNow = moment().tz("Asia/Kolkata").toDate();
  if (!this.createdAt) {
    this.createdAt = istNow;
  }
  this.updatedAt = istNow;
  next();
});

export const AppointmentOf2025 =
  mongoose.models.AppointmentOf2025 ||
  mongoose.model("AppointmentOf2025", AppointmentSchema);
