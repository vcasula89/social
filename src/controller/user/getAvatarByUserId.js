const getAvatarController = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Recupero dell'utente dal database
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: "Utente non trovato." });
    }

    // Controllo se l'utente ha un avatar
    if (!user.avatar) {
      // Restituzione di un avatar casuale o predefinito
      const defaultAvatar = randomAvatar(); 
      return res.status(200).json({ avatarUrl: defaultAvatar }); // Cambiato "avatar" in "avatarUrl" per coerenza con il frontend
    }

    // Restituisci l'avatar dell'utente
    res.status(200).json({ avatarUrl: user.avatar }); // Cambiato "avatar" in "avatarUrl" per coerenza con il frontend
  } catch (error) {
    console.error("Errore nel recuperare l'avatar:", error);
    res.status(500).json({ message: "Errore interno del server." });
  }
};
  
  export default getAvatarController;