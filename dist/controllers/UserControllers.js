"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const express_validator_1 = require("express-validator");
const Utils_1 = require("../utils/Utils");
const User_1 = __importDefault(require("../Modules/User"));
const Jwt_1 = require("../utils/Jwt");
const Nodemailer_1 = require("../utils/Nodemailer");
const mongoose = require('mongoose');
class UserController {
    static signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            const { username, email, password } = req.body;
            console.log(username);
            const verification_token = Utils_1.Utils.generateVerificationToken();
            if (!errors.isEmpty()) {
                req.errorStatus = 400;
                next(new Error(errors.array()[0].msg));
            }
            try {
                const hashPassword = yield Utils_1.Utils.encrptPassword(password);
                const data = {
                    email,
                    password: hashPassword,
                    userName: username,
                    verification_token,
                    verification_token_time: Date.now() + new Utils_1.Utils().MAX_TOKEN_TIME
                };
                let user = yield new User_1.default(data).save();
                const payload = {
                    user_id: user._id,
                    email: user.email,
                    emailVerified: user.email_verified,
                };
                const token = Jwt_1.JWT.jwtSign(payload);
                yield Nodemailer_1.NodeMailer.sendMail({
                    to: [user.email],
                    subject: 'Register OTP',
                    html: `<!DOCTYPE html>
                <html>
                <head>
                    <title></title>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <style type="text/css">
                        @media screen {
                            @font-face {
                                font-family: 'Lato';
                                font-style: normal;
                                font-weight: 400;
                                src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                            }
                
                            @font-face {
                                font-family: 'Lato';
                                font-style: normal;
                                font-weight: 700;
                                src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                            }
                
                            @font-face {
                                font-family: 'Lato';
                                font-style: italic;
                                font-weight: 400;
                                src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                            }
                
                            @font-face {
                                font-family: 'Lato';
                                font-style: italic;
                                font-weight: 700;
                                src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                            }
                        }
                
                        /* CLIENT-SPECIFIC STYLES */
                        body,
                        table,
                        td,
                        a {
                            -webkit-text-size-adjust: 100%;
                            -ms-text-size-adjust: 100%;
                        }
                
                        table,
                        td {
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                        }
                
                        img {
                            -ms-interpolation-mode: bicubic;
                        }
                
                        /* RESET STYLES */
                        img {
                            border: 0;
                            height: auto;
                            line-height: 100%;
                            outline: none;
                            text-decoration: none;
                        }
                
                        table {
                            border-collapse: collapse !important;
                        }
                
                        body {
                            height: 100% !important;
                            margin: 0 !important;
                            padding: 0 !important;
                            width: 100% !important;
                        }
                
                        /* iOS BLUE LINKS */
                        a[x-apple-data-detectors] {
                            color: inherit !important;
                            text-decoration: none !important;
                            font-size: inherit !important;
                            font-family: inherit !important;
                            font-weight: inherit !important;
                            line-height: inherit !important;
                        }
                
                        /* MOBILE STYLES */
                        @media screen and (max-width:600px) {
                            h1 {
                                font-size: 32px !important;
                                line-height: 32px !important;
                            }
                        }
                
                        /* ANDROID CENTER FIX */
                        div[style*="margin: 16px 0;"] {
                            margin: 0 !important;
                        }
                    </style>
                </head>
                
                <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
                    <!-- HIDDEN PREHEADER TEXT -->
                    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
                    </div>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <!-- LOGO -->
                        <tr>
                            <td bgcolor="#FFA73B" align="center">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                            <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                            <p style="margin: 0;">
                                            We're excited to have you get started. First, you need to confirm your account. 
                                            Please verify your OTP.
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td bgcolor="#ffffff" align="left">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                        <table border="0" cellspacing="0" cellpadding="0">
                                                            <tr>
                                                                <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a href="#" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">${verification_token}</a></td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr> 
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                
                </html>`,
                });
                let userData = {
                    _id: user._id,
                    email: user.email,
                    token: token,
                    email_verify: user.email_verified,
                    userName: user.userName
                };
                res.status(200).json({
                    data: userData,
                    message: 'Successfully Registered',
                    status: 200
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static verifyEmailOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const verification_token = req.body.verification_token;
            const email = req.user.email;
            const errors = (0, express_validator_1.validationResult)(req);
            try {
                if (!errors.isEmpty()) {
                    req.errorStatus = 400;
                    next(new Error(errors.array()[0].msg));
                }
                const user = yield User_1.default.findOneAndUpdate({
                    email: email,
                    verification_token: verification_token,
                    verification_token_time: { $gt: Date.now() }
                }, {
                    email_verified: true,
                    updated_at: new Date(),
                }, {
                    new: true
                });
                let data = user === null || user === void 0 ? void 0 : user.email_verified;
                if (!user) {
                    req.errorStatus = 400;
                    throw new Error('Wrong OTP or Email Verification Token Is Expired. Please try again...');
                }
                if (user) {
                    res.status(200).json({
                        data: data,
                        message: 'Your Email successfully verified',
                        status: 200
                    });
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    static resendVerificationEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.user.email;
            const verification_token = Utils_1.Utils.generateVerificationToken();
            try {
                const user = yield User_1.default.findOneAndUpdate({ email: email }, {
                    updated_at: new Date(),
                    verification_token: verification_token,
                    verification_token_time: Date.now() + new Utils_1.Utils().MAX_TOKEN_TIME
                });
                if (user) {
                    yield Nodemailer_1.NodeMailer.sendMail({
                        to: [user.email],
                        subject: 'Resend Email Verification',
                        html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title></title>
                        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                        <style type="text/css">
                            @media screen {
                                @font-face {
                                    font-family: 'Lato';
                                    font-style: normal;
                                    font-weight: 400;
                                    src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                                }
                    
                                @font-face {
                                    font-family: 'Lato';
                                    font-style: normal;
                                    font-weight: 700;
                                    src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                                }
                    
                                @font-face {
                                    font-family: 'Lato';
                                    font-style: italic;
                                    font-weight: 400;
                                    src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                                }
                    
                                @font-face {
                                    font-family: 'Lato';
                                    font-style: italic;
                                    font-weight: 700;
                                    src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                                }
                            }
                    
                            /* CLIENT-SPECIFIC STYLES */
                            body,
                            table,
                            td,
                            a {
                                -webkit-text-size-adjust: 100%;
                                -ms-text-size-adjust: 100%;
                            }
                    
                            table,
                            td {
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                            }
                    
                            img {
                                -ms-interpolation-mode: bicubic;
                            }
                    
                            /* RESET STYLES */
                            img {
                                border: 0;
                                height: auto;
                                line-height: 100%;
                                outline: none;
                                text-decoration: none;
                            }
                    
                            table {
                                border-collapse: collapse !important;
                            }
                    
                            body {
                                height: 100% !important;
                                margin: 0 !important;
                                padding: 0 !important;
                                width: 100% !important;
                            }
                    
                            /* iOS BLUE LINKS */
                            a[x-apple-data-detectors] {
                                color: inherit !important;
                                text-decoration: none !important;
                                font-size: inherit !important;
                                font-family: inherit !important;
                                font-weight: inherit !important;
                                line-height: inherit !important;
                            }
                    
                            /* MOBILE STYLES */
                            @media screen and (max-width:600px) {
                                h1 {
                                    font-size: 32px !important;
                                    line-height: 32px !important;
                                }
                            }
                    
                            /* ANDROID CENTER FIX */
                            div[style*="margin: 16px 0;"] {
                                margin: 0 !important;
                            }
                        </style>
                    </head>
                    
                    <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
                        <!-- HIDDEN PREHEADER TEXT -->
                        <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
                        </div>
                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                            <!-- LOGO -->
                            <tr>
                                <td bgcolor="#FFA73B" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                        <tr>
                                            <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                        <tr>
                                            <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                                <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                        <tr>
                                            <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                                <p style="margin: 0;">
                                                We're excited to have you get started. Please verify your email.
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td bgcolor="#ffffff" align="left">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                            <table border="0" cellspacing="0" cellpadding="0">
                                                                <tr>
                                                                    <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a href="#" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">${verification_token}</a></td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr> 
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </body>
                    
                    </html>`,
                    });
                    res.status(200).json({
                        message: 'Resend OTP successfully sent',
                        status: 200
                    });
                }
                else {
                    throw new Error("User doesn't exist");
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                req.errorStatus = 400;
                next(new Error(errors.array()[0].msg));
            }
            try {
                const user = req.user;
                const password = req.body.password;
                const encrpt_passwrod = user.password;
                let data = { password, encrpt_passwrod };
                yield Utils_1.Utils.comparedPassword(req, data);
                const payload = { user_id: user._id, email: user.email };
                const token = Jwt_1.JWT.jwtSign(payload);
                let userData = {
                    _id: user._id,
                    email: user.email,
                    token: token,
                    emailVerified: user.email_verified,
                    userName: user.userName
                };
                res.status(200).json({
                    data: userData,
                    message: 'Successfully Login',
                    status: 200
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static sendResetPasswordOtp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const reset_password_token = Utils_1.Utils.generateVerificationToken();
            const errors = (0, express_validator_1.validationResult)(req);
            try {
                if (!errors.isEmpty()) {
                    req.errorStatus = 400;
                    next(new Error(errors.array()[0].msg));
                }
                else {
                    const user = yield User_1.default.findOneAndUpdate({
                        email: email,
                        updated_at: new Date(),
                        reset_password_token: reset_password_token,
                        reset_password_token_time: Date.now() + new Utils_1.Utils().MAX_TOKEN_TIME
                    });
                    let userData = {
                        email: user.email,
                    };
                    if (user) {
                        yield Nodemailer_1.NodeMailer.sendMail({
                            to: [user.email],
                            subject: 'Reset password verification OTP',
                            html: `
                            <!DOCTYPE html>
                            <html>
                            <head>
                                <title></title>
                                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                                <meta name="viewport" content="width=device-width, initial-scale=1">
                                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                                <style type="text/css">
                                    @media screen {
                                        @font-face {
                                            font-family: 'Lato';
                                            font-style: normal;
                                            font-weight: 400;
                                            src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                                        }
                            
                                        @font-face {
                                            font-family: 'Lato';
                                            font-style: normal;
                                            font-weight: 700;
                                            src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                                        }
                            
                                        @font-face {
                                            font-family: 'Lato';
                                            font-style: italic;
                                            font-weight: 400;
                                            src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                                        }
                            
                                        @font-face {
                                            font-family: 'Lato';
                                            font-style: italic;
                                            font-weight: 700;
                                            src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                                        }
                                    }
                            
                                    /* CLIENT-SPECIFIC STYLES */
                                    body,
                                    table,
                                    td,
                                    a {
                                        -webkit-text-size-adjust: 100%;
                                        -ms-text-size-adjust: 100%;
                                    }
                            
                                    table,
                                    td {
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                    }
                            
                                    img {
                                        -ms-interpolation-mode: bicubic;
                                    }
                            
                                    /* RESET STYLES */
                                    img {
                                        border: 0;
                                        height: auto;
                                        line-height: 100%;
                                        outline: none;
                                        text-decoration: none;
                                    }
                            
                                    table {
                                        border-collapse: collapse !important;
                                    }
                            
                                    body {
                                        height: 100% !important;
                                        margin: 0 !important;
                                        padding: 0 !important;
                                        width: 100% !important;
                                    }
                            
                                    /* iOS BLUE LINKS */
                                    a[x-apple-data-detectors] {
                                        color: inherit !important;
                                        text-decoration: none !important;
                                        font-size: inherit !important;
                                        font-family: inherit !important;
                                        font-weight: inherit !important;
                                        line-height: inherit !important;
                                    }
                            
                                    /* MOBILE STYLES */
                                    @media screen and (max-width:600px) {
                                        h1 {
                                            font-size: 32px !important;
                                            line-height: 32px !important;
                                        }
                                    }
                            
                                    /* ANDROID CENTER FIX */
                                    div[style*="margin: 16px 0;"] {
                                        margin: 0 !important;
                                    }
                                </style>
                            </head>
                            
                            <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
                                <!-- HIDDEN PREHEADER TEXT -->
                                <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
                                </div>
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <!-- LOGO -->
                                    <tr>
                                        <td bgcolor="#FFA73B" align="center">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                                <tr>
                                                    <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                                <tr>
                                                    <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                                        <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                                <tr>
                                                    <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                                        <p style="margin: 0;">
                                                        Hey there,
                                                        You requested a new password for your TODO app account.
                                                            <p>
                                                            <span>If you didn’t make this request, then you can ignore this email 🙂</span>
                                                            </p>
                                                        </p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td bgcolor="#ffffff" align="left">
                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                            <tr>
                                                                <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                                    <table border="0" cellspacing="0" cellpadding="0">
                                                                        <tr>
                                                                            <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a href="#" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">${reset_password_token}</a></td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr> 
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </body>
                            
                            </html>`,
                        });
                        res.status(200).json({
                            data: userData,
                            message: 'Reset password verification OTP successfully sent',
                            status: 200
                        });
                    }
                    else {
                        throw new Error("User doesn't exist");
                    }
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    static verifyResetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const reset_password_token = req.body.reset_password_token;
            const email = req.body.email;
            const errors = (0, express_validator_1.validationResult)(req);
            try {
                if (!errors.isEmpty()) {
                    req.errorStatus = 400;
                    next(new Error(errors.array()[0].msg));
                }
                else {
                    const user = yield User_1.default.findOneAndUpdate({
                        email: email,
                        reset_password_token: reset_password_token,
                        reset_password_token_time: { $gt: Date.now() }
                    }, {
                        updated_at: new Date(),
                    }, {
                        new: true
                    });
                    if (!user) {
                        req.errorStatus = 400;
                        throw new Error('Wrong OTP or Email Verification Token Is Expired. Please try again...');
                    }
                    if (user) {
                        res.status(200).json({
                            message: 'Your OTP successfully verified',
                            status: 200
                        });
                    }
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    ;
    static resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const password = req.body.password;
            const errors = (0, express_validator_1.validationResult)(req);
            try {
                const encrpt_passwrod = yield Utils_1.Utils.encrptPassword(password);
                if (!errors.isEmpty()) {
                    req.errorStatus = 400;
                    next(new Error(errors.array()[0].msg));
                }
                else {
                    const updateUser = yield User_1.default.findOneAndUpdate({ _id: user._id, }, {
                        updated_at: new Date(),
                        password: encrpt_passwrod,
                    }, { new: true });
                    let userName = updateUser.userName;
                    let userData = {
                        _id: updateUser._id,
                        email: updateUser.email,
                        email_verified: updateUser.email_verified,
                    };
                    if (userData) {
                        yield Nodemailer_1.NodeMailer.sendMail({
                            to: [user.email],
                            subject: 'Your Password Changed Successfully',
                            html: `
                            <!DOCTYPE html>
                            <html>
                            <head>
                                <title></title>
                                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                                <meta name="viewport" content="width=device-width, initial-scale=1">
                                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                                <style type="text/css">
                                    @media screen {
                                        @font-face {
                                            font-family: 'Lato';
                                            font-style: normal;
                                            font-weight: 400;
                                            src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                                        }
                            
                                        @font-face {
                                            font-family: 'Lato';
                                            font-style: normal;
                                            font-weight: 700;
                                            src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                                        }
                            
                                        @font-face {
                                            font-family: 'Lato';
                                            font-style: italic;
                                            font-weight: 400;
                                            src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                                        }
                            
                                        @font-face {
                                            font-family: 'Lato';
                                            font-style: italic;
                                            font-weight: 700;
                                            src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                                        }
                                    }
                            
                                    /* CLIENT-SPECIFIC STYLES */
                                    body,
                                    table,
                                    td,
                                    a {
                                        -webkit-text-size-adjust: 100%;
                                        -ms-text-size-adjust: 100%;
                                    }
                            
                                    table,
                                    td {
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                    }
                            
                                    img {
                                        -ms-interpolation-mode: bicubic;
                                    }
                            
                                    /* RESET STYLES */
                                    img {
                                        border: 0;
                                        height: auto;
                                        line-height: 100%;
                                        outline: none;
                                        text-decoration: none;
                                    }
                            
                                    table {
                                        border-collapse: collapse !important;
                                    }
                            
                                    body {
                                        height: 100% !important;
                                        margin: 0 !important;
                                        padding: 0 !important;
                                        width: 100% !important;
                                    }
                            
                                    /* iOS BLUE LINKS */
                                    a[x-apple-data-detectors] {
                                        color: inherit !important;
                                        text-decoration: none !important;
                                        font-size: inherit !important;
                                        font-family: inherit !important;
                                        font-weight: inherit !important;
                                        line-height: inherit !important;
                                    }
                            
                                    /* MOBILE STYLES */
                                    @media screen and (max-width:600px) {
                                        h1 {
                                            font-size: 32px !important;
                                            line-height: 32px !important;
                                        }
                                    }
                            
                                    /* ANDROID CENTER FIX */
                                    div[style*="margin: 16px 0;"] {
                                        margin: 0 !important;
                                    }
                                </style>
                            </head>
                            
                            <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
                                <!-- HIDDEN PREHEADER TEXT -->
                                <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account.
                                </div>
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <!-- LOGO -->
                                    <tr>
                                        <td bgcolor="#FFA73B" align="center">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                                <tr>
                                                    <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                                <tr>
                                                    <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                                        <h1 style="font-size: 48px; font-weight: 400; margin: 2;">Welcome!</h1> <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" style="display: block; border: 0px;" />
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                                <tr>
                                                    <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                                        <p style="margin: 0;">
                                                            Hey ${userName},
                                                            Your password successfully changed 🙂
                                                        <p>
                                                    </td>
                                                </tr> 
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </body>
                            
                            </html>`,
                        });
                        res.status(200).json({
                            data: userData,
                            message: 'Your password successfully changed',
                            status: 200
                        });
                    }
                    else {
                        throw new Error("User doesn't exist");
                    }
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    static eachUserData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = req.user;
            try {
                const profile = yield User_1.default.findById(user.user_id);
                if (!profile) {
                    req.errorStatus = 400;
                    next(new Error('User not found'));
                }
                res.status(200).json({
                    data: profile.todos,
                    message: 'Data Successfully fetched',
                    status: 200,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    static addTodos(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { completed, title, id } = req.body;
            try {
                const findUserIdThenUpdate = yield User_1.default.findOneAndUpdate({ _id: id, }, {
                    updated_at: new Date(),
                }, { new: true });
                if (!findUserIdThenUpdate) {
                    req.errorStatus = 404;
                    next(new Error('User not found'));
                }
                const newId = mongoose.Types.ObjectId();
                findUserIdThenUpdate.todos.push({ _id: newId, title, completed: completed });
                yield findUserIdThenUpdate.save();
                res.status(200).json({
                    data: findUserIdThenUpdate.todos,
                    message: 'todo successfully added',
                    status: 200
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    static updateTodos(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, todo } = req.body;
            console.log('todo', todo);
            try {
                const user = yield User_1.default.findOne({ _id: userId });
                if (!user) {
                    console.log(`User with _id ${userId} not found.`);
                    return res.status(404).json({
                        message: `User with _id ${userId} not found.`,
                        status: 404
                    });
                }
                ;
                const todoObjectId = mongoose.Types.ObjectId(todo._id);
                const updateResult = yield User_1.default.updateOne({ _id: userId, 'todos._id': todoObjectId }, { $set: { 'todos.$.title': todo.title, 'todos.$.completed': todo.completed }, updated_at: new Date(), });
                if (updateResult.modifiedCount === 0) {
                    return res.status(404).json({
                        message: `Todo with _id ${todoObjectId} not found in user's todos array.`,
                        status: 404
                    });
                }
                res.status(200).json({
                    data: updateResult,
                    message: 'todo successfully updated',
                    status: 200
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    static deleteTodos(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, todoId } = req.query;
            try {
                const user = yield User_1.default.findOne({ _id: userId });
                if (!user) {
                    return res.status(404).json({
                        message: `User with _id ${userId} not found.`,
                        status: 404
                    });
                }
                ;
                const todoObjectId = mongoose.Types.ObjectId(todoId);
                const updateResult = yield User_1.default.updateOne({ _id: userId }, { $pull: { todos: { _id: todoObjectId } }, updated_at: new Date(), });
                if (updateResult.modifiedCount === 0) {
                    return res.status(404).json({
                        message: `Todo with _id ${todoId} not found in user's todos array.`,
                        status: 404
                    });
                }
                res.status(200).json({
                    data: updateResult,
                    message: 'todo successfully deleted',
                    status: 200
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
