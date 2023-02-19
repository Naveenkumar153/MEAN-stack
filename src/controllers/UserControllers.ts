export class UserControllers {

    constructor(){}

    static login(req:any,res:any, next){
        // const data = {
        //     api_message:'User login in successfully',
        //     message:'User login in successfully'
        // };
        // res.json({ data });
        
        req.errorStatus = 422
        let error = new Error('User Email or Password not matched');
        next(error,req);
        // res.send(req.query);
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