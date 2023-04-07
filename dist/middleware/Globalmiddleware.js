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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalMiddleWare = void 0;
const express_validator_1 = require("express-validator");
const Jwt_1 = require("../utils/Jwt");
class GlobalMiddleWare {
    static checkError(req, res, next) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            req.errorStatus = 400;
            console.log('GlobalMiddleWare ', !errors.isEmpty());
            next(new Error(errors.array()[0].msg));
        }
        else {
            console.log('GlobalMiddleWare success next ');
            next();
        }
    }
    ;
    static authGuard(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const header_auth = req.headers.authorization;
            const token = header_auth ? header_auth.slice(7, header_auth.length) : null;
            // alternate way 
            // const authHeader  = header_auth.split(' ');
            // const token       = authHeader[1];
            try {
                if (!token) {
                    req.errorStatus = 401;
                    next(new Error("User doesn't exist"));
                }
                else {
                    const decoded = yield Jwt_1.JWT.jwtVerify(token);
                    if (Date.now() >= decoded.exp * 1000) {
                        req.errorStatus = 401;
                        next(new Error("User section is expirted"));
                        console.log(' decoded ', decoded);
                        return false;
                    }
                    req.user = decoded;
                    next();
                }
            }
            catch (error) {
                req.errorStatus = 401;
                next(new Error("User doesn't exist"));
            }
        });
    }
}
exports.GlobalMiddleWare = GlobalMiddleWare;
