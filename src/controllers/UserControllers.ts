import User from "../Modules/User";
import { validationResult } from "express-validator";
export class UserControllers {

    constructor(){}

    static signup(req:any,res:any, next){

        const errors = validationResult(req);

        const userName = req.body.userName;
        const email    = req.body.email;
        const password = req.body.password;

        if(!errors.isEmpty()){
            return res.status(400).json({ errors:errors.array().map(val =>  { return { value:val.value, msg:val.msg} }) })
        }

        res.json({
            success:'success',
            status:200
        })
        // console.log(req.body)
        // if(userName && email && password){
        //     const user = new User({
        //         userName,
        //         email,
        //         password,
        //     });
           
        //     user.save().then(user => {
        //         console.log(user);
        //         res.send(user);
        //     })
        //     .catch(e => {
        //         const error = new Error(e)
        //         next(error);
        //     });
        // }else{
        //     req.errorStatus = 400;
        //     const error = new Error(`The request was invalid cannot be served or payload error`);
        //     next(error);
        // }




    };


    static test1(req:any, res, next){
        req.message = 'This is a Test';
        next();
    }

    static test2(req:any,res){
        res.send(req.message);
    }

    // static errorHandler(message:string,code?:number){
    //     console.log(message)
    //     let data = {
    //         message: message,
    //         statusCode:code
    //     };
    //     return data
    // }


}