import { Router } from "express";
import { UserController } from "../controllers/UserControllers";
import { GlobalMiddleWare } from "../middleware/Globalmiddleware";
import { userValidation } from "../validation/UserValidation";

export class UserRouter {
    public router: Router;
    constructor(){
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.putRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }

    getRoutes(){
        this.router.get('/send/verification-email', GlobalMiddleWare.authGuard, UserController.resendVerificationEmail);
        this.router.get('/send/resetpassword/verification-email', UserController.sendResetPasswordOtp);
        this.router.get('/getTodos', GlobalMiddleWare.authGuard, UserController.eachUserData);
    };
    postRoutes(){
        this.router.post('/signup', userValidation.signUpValidation(), UserController.signup);
        this.router.post('/login', userValidation.login(), UserController.login);
        this.router.post('/send/reset/passwordotp', userValidation.sendResetPasswordOtp(), UserController.sendResetPasswordOtp);
        this.router.post('/verify/resetpassword', userValidation.verifyResetPassword(), UserController.verifyResetPassword);
        this.router.post('/create/todos',GlobalMiddleWare.authGuard,UserController.addTodos);
    };
    putRoutes(){};
    patchRoutes(){ 
        this.router.patch('/verify/emailotp', GlobalMiddleWare.authGuard, userValidation.verifyEmailOtp() ,UserController.verifyEmailOtp);
        this.router.patch('/reset/password', userValidation.resetPassword(),UserController.resetPassword);
        this.router.patch('/updateTodos', GlobalMiddleWare.authGuard, UserController.updateTodos);
    };
    deleteRoutes(){
        this.router.delete('/deleteTodos', GlobalMiddleWare.authGuard, UserController.deleteTodos);
    };
    
}

export default new UserRouter().router;