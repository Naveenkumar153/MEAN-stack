import { body, check, query } from "express-validator";
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
            .withMessage('name must between 3 and 20 characters'),
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

    static verifyEmailOtp(){
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
                    console.log(req.body)
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

    static sendResetPasswordOtp(){
        return [
            body('email')
            .custom((email, { req }) => {
                return User.findOne({
                    email:email,
                }).then(usr => {
                    console.log(req.body)
                    if(usr){
                        req.user = usr;                        
                        return true;
                    }else{
                        req.errorStatus = 400;
                        return Promise.reject('No user registered with such email');
                    }
                }).catch(e => { throw new Error(e) });
            }),
        ]
    };

    static verifyResetPassword(){
        return [
            body('reset_password_token').isNumeric()
            .custom((reset_password_token, { req }) => {
                return User.findOne({
                    reset_password_token:reset_password_token,
                    reset_password_token_time: { $gt:Date.now() }
                }).then(user => {
                     if(user){
                        req.user = user; 
                        return true;
                     }else{
                        return Promise.reject('Reset password token doesn"t exist. please generate new OTP');
                     }
                }).catch(e => {  throw new Error(e) });
            })
        ]
    };

    static resetPassword(){
        return [
            body('email')
            .custom((email, { req }) => {
                return User.findOne({
                    email:email,
                }).then(usr => {
                    console.log(req.body)
                    if(usr){
                        req.user = usr;                        
                        return true;
                    }else{
                        return Promise.reject('No user registered with such email');
                    }
                }).catch(e => { throw new Error(e) });
            }),
            body('password')
            .isLength({min:8, max:20})
            .withMessage('password must between 8 and 20 characters')
            .matches(this.isPasswordValidation)
            .withMessage('password at least a one symbol,one upper and one lower case letters and one number') 
        ]
    };

    static addTodos(){
        return [
            body('title')
            .custom((title,{ req }) => {
                // console.log('req.body',  req.body)
                console.log('req.body.title',  title)
                if(title == ' ' || title == null || title ==  undefined){
                    return Promise.reject('todo value is required');
                }else{
                    return true;
                }
            })
        ]
    }
}