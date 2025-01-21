import {postModel} from "../schema/postSchema.js";
import MongoInternalException from "../exception/MongoInternalException.js";
import {passwordResetModel} from "../schema/passwordResetSchema.js";
import NotFoundException from "../exception/NotFoundException.js";
import {userModel} from "../schema/userSchema.js";
import {userStatus} from "../const/const.js";

const add = async (content) => {
    try {
        const res = await new postModel(content).save();
        return res.toJSON({versionKey:false})
    } catch (e) {
        throw new MongoInternalException(e.message, 100101)
    }
}

const getPostList = async (pageSize, filter) => {
    const result = await postModel
        .find(filter)
        .select('+image')
        .populate([
            {
                path:'userId',
                select:'displayName createdAt',
            },
            {
                path: 'comments',
                populate: {
                    path: 'userId',
                    select: 'displayName',
            },
        }])
        .sort({ createdAt: -1 })
        .limit(pageSize)
        .lean();

    return result.map(post => ({
        ...post,
        image: post.image !== null ? "/post/image/"+post._id:null,
    }));

}

const getById = async (id) => {
    const result = await postModel.findOne({_id:id});
    return result;
}

const modify = async (id, props) => {
    try {
        const result = await postModel.findOneAndUpdate(
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
    getPostList,
    getById,
    modify
}