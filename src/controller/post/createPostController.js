import { createPost } from "../../service/postService.js";


export default async (req, res) => {
    try {
        //parametri presi dal req body
        const {title, body} = req.body;
        //parametro che viene preso solo dopo login
        const userId = req.userId;
        let imageBinary = null;

        // Verifica della presenza dell'immagine e conversione in binario
        if (req.file != null) {
            try {
                // Verifica della presenza dell'immagine
                imageBinary = req.file.buffer; // Buffer binario dell'immagine
            } catch (error) {
                return res.status(400).json({ message: "Invalid image format" });
            }
        }

        // Creazione del post
        const newPost = {
            title: title,
            body: body,
            userId: userId,
            image: imageBinary,
            likesCounter: 0,
            commentsCounter: 0,
        };

        const createdPost = await createPost(newPost);

        // Risposta al client
        res.status(200).json({message: "Post creato correttamente"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
