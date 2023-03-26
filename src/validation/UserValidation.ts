import { body, query } from "express-validator";
import User from "../Modules/User";

export class userValidation {
    public static noSplCharacters:any      = /^[A-Za-z0-9]+$/;
    public static isPasswordValidation:any = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    public static userEmail:any            = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    static signUpValidation() {
        return [
            body('username')
            .isString()
            .isLength({min:3, max:20})
            .withMessage('name must between 3 and 20 characters')
            .matches(this.noSplCharacters)
            .withMessage('name must be without spl characters'),
            body('email')
            .isEmail()
            .custom((email, {req}) => {
                return User.findOne({
                    email:email,
                }).then(usr => {
                    if(usr){
                        return Promise.reject('User Already Exist');
                    }else{
                        return true;
                    }
                }).catch(e => { throw new Error(e) });
            })
            .matches(this.userEmail)
            .withMessage('Email is not valid'),
            body('password')
            .isLength({min:8, max:20})
            .withMessage('password must between 8 and 20 characters')
            .matches(this.isPasswordValidation)
            .withMessage('password at least a one symbol,one upper and one lower case letters and one number') 
        ]
    };

    static verifyUser(){
        return [
            body('verification_token',' Email verification_token is required ').isNumeric()
        ];
    };

    static login() {
        return [
            body('email')
            .custom((email, { req }) => {
                return User.findOne({
                    email:email,
                }).then(usr => {
                    console.log(usr)
                    if(usr){
                        req.user = usr;
                        return true;
                    }else{
                        return Promise.reject('No user registered with such email');
                    }
                }).catch(e => { throw new Error(e) });
            }),
        ]
    };
}