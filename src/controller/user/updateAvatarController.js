import userService from '../../service/userService.js';
import randomAvatar from '../../utils/randomAvatar.js';

const updateAvatarController = async (req, res) => {
    try {
        const userId = req.params.userId;
        const avatarUrl = randomAvatar();  // Genera un avatar casuale obbligatoriamente

        // Aggiorna l'utente con l'avatar generato
        const updatedUser = await userService.updateAvatar(userId, avatarUrl);

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Errore nel aggiornare l\'avatar:', error);
        res.status(500).json({ error: 'Errore nel aggiornare l\'avatar' });
    }
};

export default updateAvatarController;