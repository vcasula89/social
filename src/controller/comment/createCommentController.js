import { createComment } from "../../service/commentService.js";
import {getPostById, updatePost} from "../../service/postService.js";

export default async (req, res) => {
    try {
        //parametri presi dalla req body
        const { postId, commentText } = req.body;
        //parametro reso disponibile dal middleware dopo la login
        const userId = req.userId;

        const createdComment = await createComment(userId, postId, commentText);

        if (createdComment != null) {
            //se il record è stato salvato a DB, il contatore dei commenti per quel post sarà incrementato di un'unità.
            const post = await getPostById(postId);
            const commentCounter = post.commentsCounter + 1;
            await updatePost(postId, {
                commentsCounter: commentCounter,
                $push: { comments: createdComment._id }
            })
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
