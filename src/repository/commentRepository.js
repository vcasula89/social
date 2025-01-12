import {commentModel} from "../schema/commentSchema.js";
import MongoInternalException from "../exception/MongoInternalException.js";
import NotFoundException from "../exception/NotFoundException.js";


const add = async (content) => {
    try {
        const res = await new commentModel(content).save();
        return res.toJSON({versionKey:false})
    } catch (e) {
        throw new MongoInternalException(e.message, 100101)
    }
}

const getById = async (id) => {
    const result = await commentModel.findOne({_id:id});
    return result;
}

const deleteRecord = async (commentId) => {
    try {
        const res = await commentModel.deleteOne({_id: commentId});
        return res
    } catch (e) {
        throw new MongoInternalException(e.message, 100101)
    }
}

const modify = async (id, props) => {
    try {
        const result = await commentModel.findOneAndUpdate(
            {_id: id},
            props,
            {new: true}
        )
        if(!result) {
            throw new NotFoundException('post not found', 100102)
        }


        return result.toJSON({versionKey:false})


    } catch (e) {
        if(e.code === 100102) {
            throw e
        }
        throw new MongoInternalException(e.message, 100103)
    }
}

export default {
    add,
    deleteRecord,
    getById,
    modify,

}