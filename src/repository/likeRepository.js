import {likeModel} from "../schema/likeSchema.js";
import MongoInternalException from "../exception/MongoInternalException.js";
import {passwordResetModel} from "../schema/passwordResetSchema.js";

const getByUserIdAndPostId = async (userId, postId)=>{
    try {
        const res = await likeModel.findOne({userId: userId, postId: postId});
        return res
    } catch (e) {
        throw new MongoInternalException(e.message, 100101)
    }
}

const add = async (content) => {
    try {
        const res = await new likeModel(content).save();
        return res.toJSON({versionKey:false})
    } catch (e) {
        throw new MongoInternalException(e.message, 100101)
    }
}

const deleteRecord = async (likeId) => {
    try {
        const res = await likeModel.deleteOne({_id: likeId});
        return res
    } catch (e) {
        throw new MongoInternalException(e.message, 100101)
    }
}


export default {
    getByUserIdAndPostId,
    add,
    deleteRecord,
}