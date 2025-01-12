import mongoose, {Schema} from "mongoose";

const likeSchema = new Schema({

        userId: {type: Schema.Types.ObjectId, default: null},
        postId: {type: Schema.Types.ObjectId, default: null},

    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
            writeConcern: {w: 1, wtimeout: 2000},
        }
    }
);
export const likeModel = mongoose.model('likes', likeSchema);