import { validationResult } from "express-validator";

export class GlobalMiddleWare {

    static checkError(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('GlobalMiddleWare ', !errors.isEmpty())
            // next(new Error(errors.array()[0].msg));
            return res.status(400).json({
                message:errors.array()[0].msg,
            });
        } else {
            console.log('GlobalMiddleWare success next ');
            // next();
        }
    }

}