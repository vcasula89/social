import randomAvatar from '../../utils/randomAvatar.js';

const updateAvatarController = async (req, res) => {
    try {
        const userId = req.params.userId;
        avatarUrl = randomAvatar();
        if (!avatarUrl) {
            return res.status(400).json({ error: 'Nessun file di avatar ricevuto' });
        }
        
        

        if (!avatarUrl) {
            return res.status(400).json({ error: 'Impossibile generare l\'avatar' });
        }
    } catch (error) {
        console.error('Errore nel aggiornare l\'avatar:', error);
        res.status(500).json({ error: 'Errore interno nel server' });
    }
};

export default updateAvatarController;