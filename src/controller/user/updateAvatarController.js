import randomAvatar from '../../utils/randomAvatar.js';

const updateAvatarController = async (req, res) => {
    try {
        const userId = req.params.userId;
        const avatarUrl = randomAvatar(); 

        if (!avatarUrl) {
            return res.status(400).json({ error: 'Impossibile generare l\'avatar' });
        }

       
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { avatar: avatarUrl },
            { new: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'Utente non trovato' });
        }

        res.status(200).json({ message: 'Avatar aggiornato con successo', avatar: avatarUrl });
    } catch (error) {
        console.error('Errore nell\'aggiornare l\'avatar:', error);
        res.status(500).json({ error: 'Errore interno nel server' });
    }
};

export default updateAvatarController;