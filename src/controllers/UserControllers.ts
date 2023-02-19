import User from "../Modules/User";

export class UserControllers {

    constructor(){}

    static login(req:any,res:any, next){
        const userName = req.body.userName;
        const email    = req.body.email;
        const password = req.body.password;
        console.log(req.body)
        if(userName && email && password){
            const user = new User({
                userName,
                email,
                password,
            });
           
            user.save().then(user => {
                console.log(user);
                res.send(user);
            })
            .catch(e => {
                const error = new Error(e)
                next(error);
            });
        }else{
            req.errorStatus = 400;
            const error = new Error(`The request was invalid cannot be served or payload error`);
            next(error);
        }




    };


    static test1(req:any, res, next){
        req.message = 'This is a Test';
        next();
    }

    static test2(req:any,res){
        res.send(req.message);
    }

    // static errorHandler(message:string,code?:number){
    //     console.log(message)
    //     let data = {
    //         message: message,
    //         statusCode:code
    //     };
    //     return data
    // }


}