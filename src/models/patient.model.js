import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    email: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    dateOut: {
      type: mongoose.Schema.Types.Date,
      required: true,
      default: Date.now(),
    },
    symptoms: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    veterinary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vet",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("patient", PatientSchema, "patient");
