import { Schema } from "mongoose";
import mongoose from "mongoose";

const postSchema = new Schema({
        userId: {type: Schema.Types.ObjectId, default: null},
        title: String,
        image: Buffer,
        body: String,
        likesCounter: Number,
        commentsCounter: Number,

    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
            writeConcern: {w: 1, wtimeout: 2000},
        }
    }
);
export const postModel = mongoose.model('posts', postSchema);