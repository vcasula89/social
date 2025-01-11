import {postModel} from "../schema/postSchema.js";
import MongoInternalException from "../exception/MongoInternalException.js";
import {passwordResetModel} from "../schema/passwordResetSchema.js";
import NotFoundException from "../exception/NotFoundException.js";

const add = async (content) => {
    try {
        const res = await new postModel(content).save();
        return res.toJSON({versionKey:false})
    } catch (e) {
        throw new MongoInternalException(e.message, 100101)
    }
}

const getPostList = async (pageSize, filter) => {
    const result = await postModel.find(filter).sort({ createdAt: -1 }).limit(pageSize);
    return result;
}

export default {
    add,
    getPostList
}