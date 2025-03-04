import { userStatus } from "../const/const.js";
import { Schema } from "mongoose";
import mongoose from "mongoose";
import randomAvatar from '../utils/randomAvatar.js';

const userSchema = new Schema({
    email: {type: String, index: { unique: true }},
    displayName: String,
    password: String,
    salt: String,
    registrationToken: String,
    status: { type: String, default: userStatus.pending },
    avatar: { 
      type: String, 
      default: randomAvatar()  // Genera un avatar casuale di default
    }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      writeConcern: {w: 1, wtimeout: 2000},
    }
  }
);
export const userModel = mongoose.model('users', userSchema);