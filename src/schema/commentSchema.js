import mongoose, {Schema} from "mongoose";

const commentSchema = new Schema({

        userId: {type: Schema.Types.ObjectId, ref: 'users'},
        postId: { type: Schema.Types.ObjectId, ref: 'posts' },
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