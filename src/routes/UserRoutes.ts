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
        // this.router.get('/send/verification-email', userValidation.verifiUserResendEmail(), UserController.resendVerificationEmail);
    };
    postRoutes(){
        // this.router.post('/signup', userValidation.signUpValidation(), GlobalMiddleWare.checkError, UserController.signup);
        this.router.post('/signup', userValidation.signUpValidation(), UserController.signup);
        this.router.post('/login', userValidation.login(), UserController.login);
        this.router.post('/send/reset/passwordotp', userValidation.checkResetPasswordEmail(), UserController.sendResetPasswordOtp);
        this.router.post('/verify/resetpassword', userValidation.verifyResetPassword(), UserController.verifyResetPassword);
    };
    putRoutes(){};
    patchRoutes(){ 
        // this.router.patch('/verify', userValidation.verifyUserEmail(), GlobalMiddleWare.checkError, UserController.verify);
        this.router.patch('/verify', userValidation.verifyUser(), GlobalMiddleWare.authGuard ,UserController.verify);
        this.router.patch('/reset/password', userValidation.resetPassword(),UserController.resetPassword);
    };
    deleteRoutes(){};
    
}

export default new UserRouter().router;