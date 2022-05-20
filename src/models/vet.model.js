import mongoose from "mongoose";
import { comparePassword } from "./methods/vet.methods.model.js";
import { encryptPassword } from "./middleware/vet.middleware.model.js";

const VetSchema = mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
      trim: true,
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    email: {
      type: mongoose.Schema.Types.String,
      required: true,
      trim: true,
      unique: true,
    },
    phone: {
      type: mongoose.Schema.Types.String,
      trim: true,
      default: null,
    },
    token: {
      type: mongoose.Schema.Types.String,
      default: null,
    },
    confirmed: {
      type: mongoose.Schema.Types.Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

VetSchema.pre("save", encryptPassword);

VetSchema.methods.comparePassword = comparePassword;

export default mongoose.model("vet", VetSchema, "vet");
