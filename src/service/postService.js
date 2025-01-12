import postRepo from "../repository/postRepository.js";


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

const updatePost = async (postId, props) => {
    return await postRepo.modify(postId, props);
}
export{
    createPost,
    getPostList,
    getPostById,
    updatePost,
}