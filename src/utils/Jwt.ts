import * as Jwt from 'jsonwebtoken';

export class JWT {

    constructor(){

    }


    static jwtSign(payload){
        return Jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY_PRODUCTION,
            { expiresIn:'1h' },
        )
    };

    static jwtVerify(token):Promise<any>{
         return new Promise((resolve, rejects) => {
            Jwt.verify(token, process.env.JWT_SECRET_KEY_PRODUCTION, (error, decoded) => {
                 if(error) rejects(error);
                 else if(!decoded) rejects('User is not verifyed');
                 else resolve(decoded);
            });
         });
    }


}