import { deleteComment,getCommentById } from "../../service/commentService.js";
import {getPostById, updatePost} from "../../service/postService.js";
import UnauthorizedException from "../../exception/UnathorizedException.js";

export default async (req, res) => {
    try {
        const commentId = req.params['commentId'];
        const comment = await getCommentById(commentId);
        const postId = comment.postId;
        const userId = req.userId;
        //verifico che l'utente loggato che effettua la chiamata di cancellazione sia lo stesso che ha creato il commento
        if(userId !== comment.userId._id.toString()){
            throw new UnauthorizedException('Unauthorized', 401)
        }

        const resultDelete = await deleteComment(commentId);

        if (resultDelete != null) {
//se il record è stato salvato a DB, il contatore dei commenti per quel post sarà decrementato di un'unità.
            const post = await getPostById(postId);
            const commentCounter = post.commentsCounter - 1;
            await updatePost(postId, {commentsCounter: commentCounter})
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
