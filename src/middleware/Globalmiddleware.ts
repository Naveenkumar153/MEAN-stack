import { validationResult } from "express-validator";
import { JWT } from "../utils/Jwt";

export class GlobalMiddleWare {

    static checkError(req, res,next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            if(!errors.isEmpty()){
                console.log('GlobalMiddleWare ', !errors.isEmpty())
                next(new Error(errors.array()[0].msg));
            }
            // return res.status(400).json({
            //     message:errors.array()[0].msg,
            // });
        } else {
            console.log('GlobalMiddleWare success next ');
            next();
        }
    };


    static async authGuard(req,res,next){
        const header_auth = req.headers.authorization;
        const token       = header_auth ? header_auth.slice(7, header_auth.length) : null;
        
        try {

            req.errorStatus = 401;
            const decoded   = await JWT.jwtVerify(token);
            req.user     = decoded; 

            console.log('req.decoded',  req.decoded)
            next();
        } catch (error) {
            next(error)
        }
    }

}