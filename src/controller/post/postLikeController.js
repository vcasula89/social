import {createLike, deleteLike, getLikeByUserIdAndPostId} from "../../service/likeService.js";
import {getPostById, updatePost} from "../../service/postService.js";


export default async(req,res) => {
    const {userId, postId} = req.body;
    //memorizzo all'interno di una variabile il risultato della funzione "getLikeByUserIdAndPostId". Quest'ultima serve a controllare,
    //nel record a DB, se l'utente abbia già messo like ad un determinato post.
    const like = await getLikeByUserIdAndPostId(userId, postId);


    let createdLike = null;
    if (!like) {
      //se like non esiste,allora devo crearlo

        createdLike = await createLike(userId, postId)
    }else{
        let likeId = like._id.toString();
        //se like esiste, allora lo cancello
        await deleteLike(likeId);

    }
    if(createdLike != null){
//se il record è stato salvato a DB, il contatore dei like per quel post sarà incrementato di un'unità.
        const post = await getPostById(postId);
        const likeCounter = post.likesCounter + 1;
        await updatePost(postId, {likesCounter: likeCounter})
            .then(()=>{

                //è una promise, quindi dentro then troverò il success dell'operazione
                res.status(200).json();
            })
            .catch((err)=>{
                //è una promise, quindi dentro catch troverò l'eccezione dell'operazione di salvataggio
                res.status(500).json();
            })

    }else{
        const post = await getPostById(postId);
        const likeCounter = post.likesCounter - 1;
        await updatePost(postId, {likesCounter: likeCounter})
            .then(()=>{

                //è una promise, quindi dentro then troverò il success dell'operazione
                res.status(200).json();
            })
            .catch((err)=>{
                //è una promise, quindi dentro catch troverò l'eccezione dell'operazione di salvataggio
                res.status(500).json();
            })
    }
}
