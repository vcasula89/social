import { getPasswordResetByRestoreToken } from '../../service/passwordResetService.js';

export default async(req,res) => {

    try{
        const  restoreToken = req.params['restoreToken'];
        const passwordReset = await getPasswordResetByRestoreToken(restoreToken);
        const now = new Date();
        if(passwordReset != null && now.getTime() <= passwordReset.expirationDateTime.getTime()) {

            res.status(200).json({isValid: true})


        }else{
            res.status(200).json({isValid: false})
        }
    }catch(err){

        res.status(404).json({message:err.message})
    }
}
