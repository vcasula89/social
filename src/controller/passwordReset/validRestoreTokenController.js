import { getPasswordResetByRestoreToken } from '../../service/passwordResetService.js';

export default async(req,res) => {

    try{
        const restoreToken = req.params['restoreToken'];
        //prendo password reset dal db cercandolo per il restoreToken
        const passwordReset = await getPasswordResetByRestoreToken(restoreToken);
        const now = new Date();
        //se passwordReset è diverso da null e il token è valido(c'è una comparazione tra la data attuale e quella di scadenza del token)
        if(passwordReset != null && now.getTime() <= passwordReset.expirationDateTime.getTime()) {
        //allora sarà restituito true
            res.status(200).json({isValid: true})

        //altrimenti sarà restituito false
        }else{
            res.status(200).json({isValid: false})
        }
    }catch(err){
    //in caso di errore nel flusso, si manifesterà un'eccezione e sarà restituito un messaggio di errore
        res.status(404).json({message:err.message})
    }
}
