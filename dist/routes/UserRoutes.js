"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const UserControllers_1 = require("../controllers/UserControllers");
const Globalmiddleware_1 = require("../middleware/Globalmiddleware");
const UserValidation_1 = require("../validation/UserValidation");
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.putRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/send/verification-email', Globalmiddleware_1.GlobalMiddleWare.authGuard, UserControllers_1.UserController.resendVerificationEmail);
        this.router.get('/send/resetpassword/verification-email', UserControllers_1.UserController.sendResetPasswordOtp);
        this.router.get('/getTodos', Globalmiddleware_1.GlobalMiddleWare.authGuard, UserControllers_1.UserController.eachUserData);
    }
    ;
    postRoutes() {
        this.router.post('/signup', UserValidation_1.userValidation.signUpValidation(), UserControllers_1.UserController.signup);
        this.router.post('/login', UserValidation_1.userValidation.login(), UserControllers_1.UserController.login);
        this.router.post('/send/reset/passwordotp', UserValidation_1.userValidation.sendResetPasswordOtp(), UserControllers_1.UserController.sendResetPasswordOtp);
        this.router.post('/verify/resetpassword', UserValidation_1.userValidation.verifyResetPassword(), UserControllers_1.UserController.verifyResetPassword);
        this.router.post('/create/todos', Globalmiddleware_1.GlobalMiddleWare.authGuard, UserControllers_1.UserController.addTodos);
    }
    ;
    putRoutes() { }
    ;
    patchRoutes() {
        this.router.patch('/verify/emailotp', Globalmiddleware_1.GlobalMiddleWare.authGuard, UserValidation_1.userValidation.verifyEmailOtp(), UserControllers_1.UserController.verifyEmailOtp);
        this.router.patch('/reset/password', UserValidation_1.userValidation.resetPassword(), UserControllers_1.UserController.resetPassword);
        this.router.patch('/updateTodos', Globalmiddleware_1.GlobalMiddleWare.authGuard, UserControllers_1.UserController.updateTodos);
    }
    ;
    deleteRoutes() {
        this.router.delete('/deleteTodos', Globalmiddleware_1.GlobalMiddleWare.authGuard, UserControllers_1.UserController.deleteTodos);
    }
    ;
}
exports.UserRouter = UserRouter;
exports.default = new UserRouter().router;
