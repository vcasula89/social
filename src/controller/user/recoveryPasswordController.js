import userNormalizer from "../../normalizer/userNormalizer.js";
import {getUserByEmail} from '../../service/userService.js'
import cryptoUtils from "../../utils/cryptoUtils.js";
import {createPasswordReset, sendResetPasswordMail} from "../../service/passwordResetService.js";
import {frontEndAddress} from '../../const/const.js';


export default async(req,res) => {
    try{
        //prendo la mail dalla request
        const  email = req.params['email'];

        //prendo lo user dal db cercandolo per la sua e-mail
        const user = await getUserByEmail(email);

        if(user != null) {
            //se lo user esiste

            //stacco un token a scadenza di un'ora a partire dalla data corrente
            const token = cryptoUtils.generateUniqueCode(10);
            const now = new Date();
            const expirationDataTime = new Date(now.getTime() + 60 * 60 * 1000);

            //memorizzo a db il record passwordReset, perchè quando creo il link di ripristino che verrà mandato via e-mail
            // all'utente, che contiene il token, quest'ultimo mi verrà rimandato indietro.
            // Userò il token che mi verrà ripassato, per avere la certezza che sia stato quell'utente ad aver richiesto il ripristino
            const passwordReset = await createPasswordReset(user._id.toString(), expirationDataTime, token)


            if(passwordReset != null) {
                //se la creazione del record a db è andata a buon fine...

                //creo il link di ripristino
                const linkDiRipristino = frontEndAddress + 'form-recovery-password/' + token;

                //mando la mail con il link di ripristino, then e catch servono perchè dentro la funzione "sendResetPasswordMail" viene invocata
                //un'altra funzione "sendMail" che restituisce una promise con l'esito del recapito dell'email.
                await sendResetPasswordMail(email, linkDiRipristino)
                    .then(() => {
                        //in caso di success restitutisco il 200
                        res.status(200).json({message: "Un link di ripristino password è stato inviato all\' indirizzo richiesto"})
                    })
                    .catch((error)=>{
                        //in caso di errore restituisco il messaggio dell'eccezione
                        res.status(500).json({message: "Messaggio non inviato: "+error.message})
                    });


            }

        }

    }catch(err){
        res.status(404).json({ message: 'Utente non registrato' });
    }


}

