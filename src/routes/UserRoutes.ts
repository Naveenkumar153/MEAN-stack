import { Router } from "express";
import { UserControllers } from "../controllers/UserControllers";
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
        this.router.post('/signup', userValidation.signUpValidation() , UserControllers.signup);
    };
    putRoutes(){};
    patchRoutes(){};
    deleteRoutes(){};
}

export default new UserRouter().router;