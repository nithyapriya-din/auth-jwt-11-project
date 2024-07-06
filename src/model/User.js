import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 150,
    min: 4,
  },
  email: {
    type: String,
    required: true,
    max: 40,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const UserModel = mongoose.model("User", userSchema);
