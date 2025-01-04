import { Schema } from "mongoose";
import mongoose from "mongoose";

const passwordResetSchema = new Schema({
        userId: {type: Schema.Types.ObjectId, default: null},
        expirationDateTime: Date,
        restoreToken: String,

    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
            writeConcern: {w: 1, wtimeout: 2000},
        }
    }
);
export const passwordResetModel = mongoose.model('password_resets', passwordResetSchema);