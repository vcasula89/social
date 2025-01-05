import {getUserById, updateUser} from "../../service/userService.js";
import {getPasswordResetByRestoreToken} from "../../service/passwordResetService.js";
import cryptoUtils from "../../utils/cryptoUtils.js";

export default async(req,res) =>{
    try{
        //memorizzo i parametri della requet in delle variabili
        const newPassword = req.body.password;
        const token = req.body.token;

        //confronto la data di adesso con la data di scadenza del token "expirationDateTime"
        const now = new Date();
        const passwordReset = await getPasswordResetByRestoreToken(token);
        if(passwordReset != null && now.getTime() <= passwordReset.expirationDateTime.getTime()) {
        //se il token è valido e non è scaduto

            // trasformo la password passata in chiaro in una stringa cifrata e di conseguenza anche il salt usato per crifrare la passwor.
            // il salt  serve a crittare la passord ma anche decrittarla,
            // infatti quando mando la password in chiaro sulla login, grazie al salt, posso compararne il valore
            const  {password, salt} = cryptoUtils.hashPassword(newPassword);

            // prende in ingresso come primo argomento lo userId che risiede come proprietà dentro passwordReset
            // mentre come secondo argomento ler properties del record a db da aggiornare
            await updateUser(passwordReset.userId, {
                password: password,
                salt: salt
            })
            .then(()=>{

                //è una promise, quindi dentro then troverò il success dell'operazione
                res.status(200).json({message: 'Password aggiornata correttamente'});
            })
            .catch((err)=>{
                //è una promise, quindi dentro then troverò l'eccezione dell'operazione di salvataggio
                res.status(200).json({message: 'Password non aggiornata :'+err.message});
            })

        }else{

            //se il token non è valido restituisco errore
            res.status(500).json({message: 'Impossibile aggiornare la password, il token non è valido'});

        }
    }catch(err){
        //se si manifesta una eccezione durante il flusso restituisco errore con il messaggio dell'eccezione
        res.status(500).json({message: err.message});
    }


}
