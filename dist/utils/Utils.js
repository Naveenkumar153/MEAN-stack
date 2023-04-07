"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
const Bcrypt = __importStar(require("bcrypt"));
class Utils {
    constructor() {
        this.MAX_TOKEN_TIME = (2 * 60 * 1000);
    }
    // generateOTP function
    static generateVerificationToken(digit = 6) {
        let otp = '';
        for (let i = 0; i < digit; i++) {
            otp += Math.floor(Math.random() * 10);
        }
        return otp; // parseInt(otp) 
    }
    ;
    static encrptPassword(password) {
        return new Promise((resolve, reject) => {
            Bcrypt.hash(password, 10, (err, hash) => {
                if (err)
                    reject(err);
                resolve(hash);
            });
        });
    }
    static comparedPassword(req, data) {
        return new Promise((resolve, reject) => {
            Bcrypt.compare(data.password, data.encrpt_passwrod, (err, same) => {
                if (err) {
                    reject(err);
                }
                else if (!same) {
                    req.errorStatus = 400;
                    reject(new Error("User & Password Doesn't match"));
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    ;
}
exports.Utils = Utils;
