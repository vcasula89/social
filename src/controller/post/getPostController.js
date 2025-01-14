import {getPostList, getPostLiked} from '../../service/postService.js'

export default async(req,res) => {
    try {
        const {cursor, limit} = req.query;

        //preleviamo l'id utente loggato anche se non obbligatorio, per definire se inserire il parametro isLiked (true o false) seguendo questa logica:
            // se l'utente ha un record nella collections likes allora ha messo like al post quindi isLiked sarà true altrimenti sarà false
        //il parametro isLiked viene inserito in ogni oggetto di tipo post quindi, verrà richiesto di volta in volta per ogni post
        const userId = req.userId;

        // Imposta un limite di default e massimo
        const pageSize = Math.min(parseInt(limit) || 25, 50);

        // Filtro per il cursore
        const filter = cursor ? { createdAt: { $lt: new Date(cursor) } } : {};

        let postList = await getPostList(pageSize,filter);

        if(userId != null){
            //se l'uente è loggato sovrascrivo il valore di postList con la valorizzazione della nuova lista comprensiva del nuovo campo isLiked
            postList = await getPostLiked(postList, userId);
        }

        res.status(200).json(postList);


    } catch (error) {

        res.status(500).json({ error: 'Errore nel recupero dei post' });
    }
}


