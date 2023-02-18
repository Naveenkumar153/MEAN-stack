export class UserControllers {

    static login(req:any,res){
        const data = {
            api_message:'User login in successfully',
            message:'User login in successfully'
        };
        res.json({ data });
    };


    static test1(req:any, res, next){
        req.message = 'This is a Test';
        next();
    }

    static test2(req:any,res){
        res.send(req.message);
    }


}