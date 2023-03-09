import * as express from 'express';
import { validationResult } from "express-validator";
import User from "../Modules/User";
export class UserControllers {

    constructor(){}

    static signup(req:any,res:any, next:express.NextFunction){

        const errors = validationResult(req);
        console.log(req.body)
        const userName = req.body.username;
        const email    = req.body.email;
        const password = req.body.password;

        if(!errors.isEmpty()){
            next(new Error(errors.array()[0].msg))
            // return res.status(400).json({ errors:errors.array().map(val =>  { return { value:val.value, msg:val.msg} }) })
        }

        // let data = {
        //     success:'success',
        //     status:200
        // } 
        // res.json({
        //     data
        // })
        console.log(req.body)
        if(userName && email && password){
            const user = new User({
                userName,
                email,
                password,
            });
           
            user.save().then(user => {
                console.log(user);
                res.send(user);
            })
            .catch(e => {
                const error = new Error(e)
                next(error);
            });
        }else{
            req.errorStatus = 400;
            const error = new Error(`The request was invalid cannot be served or payload error`);
            next(error);
        }
        


    };

    // static errorHandler(message:string,code?:number){
    //     console.log(message)
    //     let data = {
    //         message: message,
    //         statusCode:code
    //     };
    //     return data
    // }


}