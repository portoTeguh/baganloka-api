import mongoose from "mongoose";

import timezone from 'mongoose-timezone';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: String
  },
  updatedAt : {
    type: String
  }
});

UserSchema.plugin(timezone, { paths: ['createdAt', 'updatedAt'], defaultTimezone: 'Asia/Jakarta' })

export default mongoose.model("User", UserSchema);
