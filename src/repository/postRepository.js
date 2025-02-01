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
    const result = await postModel.aggregate([
        { $match: filter },
        { $sort: { createdAt: -1 } },
        { $limit: pageSize },
        {
            $lookup: {
                from: 'users', // Join con la collezione utenti per l'autore del post
                localField: 'userId',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $lookup: {
                from: 'comments', // Join con la collezione dei commenti
                localField: '_id',
                foreignField: 'postId',
                as: 'comments'
            }
        },
        { $unwind: '$user' }, // Estrai il singolo utente collegato al post
        {
            $lookup: {
                from: 'users', // Join con la collezione utenti per ottenere i dettagli dell'utente che ha scritto il commento
                localField: 'comments.userId',
                foreignField: '_id',
                as: 'commentUsers'
            }
        },
        {
            $addFields: {
                comments: {
                    $map: {
                        input: '$comments',
                        as: 'comment',
                        in: {
                            $mergeObjects: [
                                '$$comment',
                                {
                                    user: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: '$commentUsers',
                                                    as: 'user',
                                                    cond: { $eq: ['$$user._id', '$$comment.userId'] }
                                                }
                                            },
                                            0
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        },
        {
            $project: {
                image: 1,
                userId: 1,
                title: 1,
                body: 1,
                likesCounter: 1,
                commentsCounter: 1,
                createdAt: 1,
                'user.displayName': 1,
                'user.avatar': 1,
                'user.createdAt': 1,
                'comments._id': 1,
                'comments.commentText': 1,
                'comments.createdAt': 1,
                'comments.userId': 1,
                'comments.user.displayName': 1,
                'comments.user.avatar': 1
            }
        }
    ]);

    return result.map(post => ({
        ...post,
        image: post.image !== null ? "/post/image/"+post._id:null,
    }));

}

const getById = async (id) => {
    const result = await postModel.findOne({_id:id}).populate("userId", "displayName avatar");
    return result;
}

const modify = async (id, props) => {
    try {
        const updatedPost = await postModel.findOneAndUpdate(
            { _id: id },
            props,
            { new: true }
        );

        if (!updatedPost) {
            throw new Error("Post non trovato");
        }

        // 2️⃣ Recupera il post aggiornato con i dettagli dei commenti e utenti
        const result = await postModel.aggregate([
            { $match: { _id: updatedPost._id } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $unwind: '$user' },
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'postId',
                    as: 'comments'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'comments.userId',
                    foreignField: '_id',
                    as: 'commentUsers'
                }
            },
            {
                $addFields: {
                    comments: {
                        $map: {
                            input: '$comments',
                            as: 'comment',
                            in: {
                                $mergeObjects: [
                                    '$$comment',
                                    {
                                        user: {
                                            $arrayElemAt: [
                                                {
                                                    $filter: {
                                                        input: '$commentUsers',
                                                        as: 'user',
                                                        cond: { $eq: ['$$user._id', '$$comment.userId'] }
                                                    }
                                                },
                                                0
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    image: 1,
                    userId: 1,
                    title: 1,
                    body: 1,
                    likesCounter: 1,
                    commentsCounter: 1,
                    createdAt: 1,
                    'user.displayName': 1,
                    'user.avatar': 1,
                    'user.createdAt': 1,
                    'comments._id': 1,
                    'comments.commentText': 1,
                    'comments.createdAt': 1,
                    'comments.userId': 1,
                    'comments.user.displayName': 1,
                    'comments.user.avatar': 1
                }
            }
        ]);

        if(!result) {
            throw new NotFoundException('post not found', 100102)
        }


        return result;


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