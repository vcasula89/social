import {getPostList} from '../../service/postService.js'

export default async(req,res) => {
    try {
        const {cursor, limit} = req.query;

        // Imposta un limite di default e massimo
        const pageSize = Math.min(parseInt(limit) || 25, 50);

        // Filtro per il cursore
        const filter = cursor ? { createdAt: { $lt: new Date(cursor) } } : {};

        const postList = await getPostList(pageSize,filter);

        res.status(200).json(postList);


    } catch (error) {

        res.status(500).json({ error: 'Errore nel recupero dei post' });
    }
}


