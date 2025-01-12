import {getCommentById,updateComment} from "../../service/commentService.js";


export default async(req,res) =>{
    try{
        const commentId = req.params['commentId'];
        const {commentText} = req.body;

        const comment= await getCommentById(commentId);
        if(comment != null){
            await updateComment(commentId,{commentText:commentText})
                .then(() => {

                    //è una promise, quindi dentro then troverò il success dell'operazione
                    res.status(200).json();
                })
                .catch((err) => {
                    //è una promise, quindi dentro catch troverò l'eccezione dell'operazione di salvataggio
                    res.status(500).json();
                })
        }
    }catch(err){
        res.status(500).json({error: err});
    }
}