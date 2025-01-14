import postRepo from "../repository/postRepository.js";
import {likeModel} from "../schema/likeSchema.js";


const createPost = async (post) => {
    try{

            const result =  await postRepo.add(post);

    }catch(error){
        throw error;
    }
}

const getPostList = async (pageSize, filter)=>{
    try{
        const posts = await postRepo.getPostList(pageSize, filter);
        return posts;
    }catch(error){
        throw error;
    }
}

const getPostById = async (postId) => {
    try{
        const post = await postRepo.getById(postId);
        return post;
    }catch(error){
        throw error;
    }
}

const getPostLiked = async (posts, userId) => {
    try{
       // recupera tutti i likes che l'utente ha messo
        const likedPosts = await likeModel.find({
            userId,
            postId: { $in: posts.map(post => post._id) }
        }).select('postId');

       // crea un array di postId dagli oggetti "like" presi prima
        const likedPostIds = new Set(likedPosts.map(like => like.postId.toString()));

        // Aggiungi il campo `isLiked` a ogni post se l'id del post è presente tra gli id dei post i cui l'utente ha messo like
        return posts.map(post => ({
            ...post,
            isLiked: likedPostIds.has(post._id.toString()) // true se l'utente ha messo "like", false altrimenti
        }));
    }catch(error){
        throw error;
    }
}



const updatePost = async (postId, props) => {
    return await postRepo.modify(postId, props);
}
export{
    createPost,
    getPostList,
    getPostLiked,
    getPostById,
    updatePost,
}