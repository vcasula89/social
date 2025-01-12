import likeRepo from "../repository/likeRepository.js";
import LikeRepository from "../repository/likeRepository.js";
import userRepo from "../repository/userRepository.js";

const getLikeByUserIdAndPostId = async (userId,postId) => {
    try{
        const like = await likeRepo.getByUserIdAndPostId(userId,postId);
        return like;
    }catch(error){
        throw error;
    }
}

const createLike = async (userId, postId) => {
    //content serve a memorizzare il like a DB
    const content = {
        userId: userId,
        postId: postId,
    }
    const result =  await LikeRepository.add(content)
    return result;
}

const deleteLike = async (likeId) => {

    const result =  await LikeRepository.deleteRecord(likeId)
    return result;
}



export {
    getLikeByUserIdAndPostId,
    createLike,
    deleteLike,

}