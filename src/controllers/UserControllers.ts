import { validationResult } from 'express-validator';
import * as Bcrypt from 'bcrypt';
import { NodeMailer } from './../utils/NodeMailer';
import { Utils } from './../utils/Utils';
import User from '../Modules/User';

export class UserController {

    private static encrptPassword(req,res,next){
        return new Promise((resolve, reject) => {
            Bcrypt.hash(req.body.password,10,(err,hash) => {
                if(err) reject(err);
                resolve(hash);
            });
        });
    }

    static async signup(req, res, next) {
        const errors = validationResult(req);
        const name = req.body.name;
        const email = req.body.email;
        // const password = req.body.password;
  

        if(!errors.isEmpty()){
            next(new Error(errors.array()[0].msg));
        }else{
            
            try {
                const hashPassword = await UserController.encrptPassword(req,res,next);
                const data = {
                    email,
                    password:hashPassword,
                    name,
                };
                let user = await new User(data).save();
                console.log('usercontrollers  user',user)
                res.send(user);
            } catch(error) {
                console.log('error usercontrollers', error)
                next(error);
            }
        }
    }

    // static async verify(req, res, next) {
    //     const verification_token = req.body.verification_token;
    //     const email = req.body.email;
    //     try {
    //         const user = await User.findOneAndUpdate(
    //             {
    //                 email: email,
    //                 verification_token: verification_token,
    //                 verification_token_time: {$gt: Date.now()}
    //             },
    //             {
    //                 email_verified: true
    //             },
    //             {
    //                 new: true
    //             }
    //         );
    //         if(user) {
    //             res.send(user);
    //         } else {
    //             throw new Error('Email Verification Token Is Expired. Please try again...');
    //         }
    //     } catch(e) {
    //         next(e);
    //     }
    // }

}