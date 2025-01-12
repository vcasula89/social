import commentRepo from "../repository/commentRepository.js";


const createComment = async (userId, postId, commentText) => {
    //content serve a memorizzare il like a DB
    const content = {
        userId: userId,
        postId: postId,
        commentText: commentText,
    }
    const result =  await commentRepo.add(content)
    return result;
}

const getCommentById = async (commentId) => {
    try{
        const comment = await commentRepo.getById(commentId);
        return comment;
    }catch(error){
        throw error;
    }
}

const deleteComment = async (commentId) => {

    const result =  await commentRepo.deleteRecord(commentId)
    return result;
}

const updateComment = async (commentId, props) => {
    const result = await commentRepo.modify(commentId, props);
    return result;
}

export  {
    createComment,
    deleteComment,
    getCommentById,
    updateComment,
}