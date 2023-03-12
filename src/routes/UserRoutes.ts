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
    };
    postRoutes(){
        // this.router.post('/signup', userValidation.signUpValidation(), GlobalMiddleWare.checkError, UserController.signup);
        this.router.post('/signup', userValidation.signUpValidation(), UserController.signup);
    };
    putRoutes(){};
    patchRoutes(){
        // this.router.patch('/verify', userValidation.verifyUserEmail(), GlobalMiddleWare.checkError, UserController.verify);
    };
    deleteRoutes(){};
    
}

export default new UserRouter().router;