import { Router } from "express";
import { UserController } from "../Controllers/UserControllers";
import { GlobalMiddleWare } from "../Middleware/Globalmiddleware";
import { userValidation } from "../Validation/UserValidation";

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
        this.router.get('/send/verification-email', userValidation.verifiUserResendEmail(), UserController.resendVerificationEmail);
    };
    postRoutes(){
        // this.router.post('/signup', userValidation.signUpValidation(), GlobalMiddleWare.checkError, UserController.signup);
        this.router.post('/signup', userValidation.signUpValidation(), UserController.signup);
    };
    putRoutes(){};
    patchRoutes(){
        // this.router.patch('/verify', userValidation.verifyUserEmail(), GlobalMiddleWare.checkError, UserController.verify);
        this.router.patch('/verify', userValidation.verifyUserEmail(), UserController.verify);
    };
    deleteRoutes(){};
    
}

export default new UserRouter().router;