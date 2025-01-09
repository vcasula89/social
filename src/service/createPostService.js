import postRepo from "../repository/postRepository.js";

const createPost = async (post) => {
    try{

            const result =  await postRepo.add(post);

    }catch(error){
        throw error;
    }
}
export{
    createPost,
}