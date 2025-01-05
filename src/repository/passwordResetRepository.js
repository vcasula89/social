import {passwordResetModel} from "../schema/passwordResetSchema.js";
import MongoInternalException from "../exception/MongoInternalException.js";
import NotFoundException from "../exception/NotFoundException.js";


const add = async (content) => {
    try {
        const res = await new passwordResetModel(content).save();
        return res.toJSON({versionKey:false})
    } catch (e) {
        throw new MongoInternalException(e.message, 100101)
    }
}

const getByRestoreToken = async (restoreToken) => {
    const result = await passwordResetModel.findOne({ restoreToken : restoreToken } )
    if(!result) {
        throw new NotFoundException("password reset not found");
    }
    return result.toJSON({versionKey:false})
}

export default {
    add,
    getByRestoreToken,
}