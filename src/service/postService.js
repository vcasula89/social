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
export{
    createPost,
    getPostList
}