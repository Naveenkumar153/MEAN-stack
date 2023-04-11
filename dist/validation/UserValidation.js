"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../Modules/User"));
class userValidation {
    static signUpValidation() {
        return [
            (0, express_validator_1.body)('username')
                .isString()
                .isLength({ min: 3, max: 20 })
                .withMessage('name must between 3 and 20 characters'),
            (0, express_validator_1.body)('email')
                .isEmail()
                .custom((email, { req }) => {
                return User_1.default.findOne({
                    email: email,
                }).then(usr => {
                    if (usr) {
                        return Promise.reject('User Already Exist');
                    }
                    else {
                        return true;
                    }
                }).catch(e => { throw new Error(e); });
            })
                .matches(this.userEmail)
                .withMessage('Email is not valid'),
            (0, express_validator_1.body)('password')
                .isLength({ min: 8, max: 20 })
                .withMessage('password must between 8 and 20 characters')
                .matches(this.isPasswordValidation)
                .withMessage('password at least a one symbol,one upper and one lower case letters and one number')
        ];
    }
    ;
    static verifyEmailOtp() {
        return [
            (0, express_validator_1.body)('verification_token', ' Email verification_token is required ').isNumeric()
        ];
    }
    ;
    static login() {
        return [
            (0, express_validator_1.body)('email')
                .custom((email, { req }) => {
                return User_1.default.findOne({
                    email: email,
                }).then(usr => {
                    console.log(req.body);
                    if (usr) {
                        req.user = usr;
                        return true;
                    }
                    else {
                        return Promise.reject('No user registered with such email');
                    }
                }).catch(e => { throw new Error(e); });
            }),
        ];
    }
    ;
    static sendResetPasswordOtp() {
        return [
            (0, express_validator_1.body)('email')
                .custom((email, { req }) => {
                return User_1.default.findOne({
                    email: email,
                }).then(usr => {
                    console.log(req.body);
                    if (usr) {
                        req.user = usr;
                        return true;
                    }
                    else {
                        req.errorStatus = 400;
                        return Promise.reject('No user registered with such email');
                    }
                }).catch(e => { throw new Error(e); });
            }),
        ];
    }
    ;
    static verifyResetPassword() {
        return [
            (0, express_validator_1.body)('reset_password_token').isNumeric()
                .custom((reset_password_token, { req }) => {
                return User_1.default.findOne({
                    reset_password_token: reset_password_token,
                    reset_password_token_time: { $gt: Date.now() }
                }).then(user => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        return Promise.reject('Wrong OTP or Email Verification Token Is Expired. Please try again...');
                    }
                }).catch(e => { throw new Error(e); });
            })
        ];
    }
    ;
    static resetPassword() {
        return [
            (0, express_validator_1.body)('email')
                .custom((email, { req }) => {
                return User_1.default.findOne({
                    email: email,
                }).then(usr => {
                    console.log(req.body);
                    if (usr) {
                        req.user = usr;
                        return true;
                    }
                    else {
                        return Promise.reject('No user registered with such email');
                    }
                }).catch(e => { throw new Error(e); });
            }),
            (0, express_validator_1.body)('password')
                .isLength({ min: 8, max: 20 })
                .withMessage('password must between 8 and 20 characters')
                .matches(this.isPasswordValidation)
                .withMessage('password at least a one symbol,one upper and one lower case letters and one number')
        ];
    }
    ;
    static addTodos() {
        return [
            (0, express_validator_1.body)('title')
                .custom((title, { req }) => {
                // console.log('req.body',  req.body)
                console.log('req.body.title', title);
                if (title == ' ' || title == null || title == undefined) {
                    return Promise.reject('todo value is required');
                }
                else {
                    return true;
                }
            })
        ];
    }
}
exports.userValidation = userValidation;
userValidation.noSplCharacters = /^[A-Za-z0-9]+$/;
userValidation.isPasswordValidation = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
userValidation.userEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
