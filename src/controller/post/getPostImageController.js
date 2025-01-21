import {getPostById} from '../../service/postService.js'

export default async(req,res) => {
    try {
        const postId = req.params['postId'];
        const post = await getPostById(postId);

        if(post.image == null){
            res.status(404).send()
        }

        let contentType = '';
        if ( post.image.slice(0, 8).toString('hex') === '89504e470d0a1a0a') {
            contentType = 'image/png';
        } else if ( post.image.slice(0, 2).toString('hex') === 'ffd8') {
            contentType = 'image/jpeg';
        }
        // Imposta l'header Content-Type in base al tipo di immagine (puoi personalizzarlo se conosci il tipo esatto)
        res.setHeader('Content-Type', contentType); // Cambia 'image/png' con il formato corretto, se noto

        // Restituisci il buffer come risposta
        res.status(200).send( post.image );


    } catch (error) {
        res.status(500).send();
    }
}


