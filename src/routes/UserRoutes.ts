import { Router } from "express";
import { UserControllers } from "../controllers/UserControllers";

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
         this.router.get('/login', UserControllers.login);
         this.router.get('/test', UserControllers.test1, UserControllers.test2);
    };
    postRoutes(){};
    putRoutes(){};
    patchRoutes(){};
    deleteRoutes(){};
}

export default new UserRouter().router;