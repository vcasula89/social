import {postModel} from "../schema/postSchema.js";
import MongoInternalException from "../exception/MongoInternalException.js";

const add = async (content) => {
    try {
        const res = await new postModel(content).save();
        return res.toJSON({versionKey:false})
    } catch (e) {
        throw new MongoInternalException(e.message, 100101)
    }
}
export default {
    add,
}