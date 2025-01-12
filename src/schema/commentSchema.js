import mongoose, {Schema} from "mongoose";

const commentSchema = new Schema({

        userId: {type: Schema.Types.ObjectId, default: null},
        postId: {type: Schema.Types.ObjectId, default: null},
        commentText: String,

    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
            writeConcern: {w: 1, wtimeout: 2000},
        }
    }
);
export const commentModel = mongoose.model('comments', commentSchema);