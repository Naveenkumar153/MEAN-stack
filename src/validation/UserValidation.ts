import { body } from "express-validator";

export class userValidation {
    public static noSplCharacters:any      = /^[A-Za-z0-9]+$/;
    public static isPasswordValidation:any = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    public static userEmail:any            = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    static signUpValidation() {
        return [
            body('userName')
            .isString()
            .exists()
            .withMessage('name is required')
            .isLength({min:3, max:20})
            .withMessage('name must between 3 and 20 characters')
            .matches(this.noSplCharacters)
            .withMessage('name must be without spl characters'),
            body('email')
            .exists()
            .withMessage('email is required')
            .isEmail()
            .matches(this.userEmail)
            .withMessage('Email is not valid'),
            body('password')
            .exists()
            .isAlphanumeric() 
            .withMessage('password is required') 
            .isLength({min:8, max:20})
            .withMessage('password must between 8 and 20 characters')
            .matches(this.isPasswordValidation)
            .withMessage('password at least a one symbol,one upper and one lower case letters and one number') 
        ]
    }
}