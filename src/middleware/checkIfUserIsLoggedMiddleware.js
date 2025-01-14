//questo middleware serve a discriminare tra un utente loggato e uno non loggato. se l'utente è loggato verrà reso disponile lo user id nella req.
//l'utente potrà accedere sempre al controller.

import jwtUtils from '../utils/cryptoUtils.js'

export default async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;


    try {
        if (authorizationHeader != null) {
            const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
            const authorizationType = req.headers.authorization.split(' ')[0];
            if (token != null && authorizationType === 'Bearer') {
                const jwtDecoded = jwtUtils.verifyJWT(token);
                if (jwtDecoded != null) {
                    req.userId = jwtDecoded.subject;
                    next();
                }
            }
        }else{
            next();
        }


    } catch (e) {
        console.error(e);
        next();
    }

}