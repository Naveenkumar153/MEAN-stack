import { validationResult } from "express-validator";
import { JWT } from "../utils/Jwt";

export class GlobalMiddleWare {

    static checkError(req, res,next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.errorStatus = 400;
            console.log('GlobalMiddleWare ', !errors.isEmpty())
            next(new Error(errors.array()[0].msg));
        } else {
            console.log('GlobalMiddleWare success next ');
            next();
        }
    };


    static async authGuard(req,res,next){
        const header_auth = req.headers.authorization;
        const token       = header_auth ? header_auth.slice(7, header_auth.length) : null;
        // alternate way 
        // const authHeader  = header_auth.split(' ');
        // const token       = authHeader[1];
        console.log('authGuard' , token);
        try {
            if(!token){
                req.errorStatus = 401;
                next( new Error("User doesn't exist"));
            }else{
                const decoded   = await JWT.jwtVerify(token);
                req.user     = decoded; 
                next();
            }
        } catch (error) {
            req.errorStatus = 401;
            next( new Error("User doesn't exist"));
        }
    }

}