import * as Bcryptjs from 'bcryptjs';
export class Utils {
    constructor(){

    } 

    public MAX_TOKEN_TIME = ( 2 * 60 * 1000 );
    // generateOTP function
    static generateVerificationToken(digit:number = 6):number{
        let otp:any = '';     
        for(let i = 0; i < digit; i++){
            otp += Math.floor(Math.random() * 10);
        }
        return  otp;  // parseInt(otp) 
    };

    static encrptPassword(password): Promise<any> {
        return new Promise((resolve, reject) => {
            Bcryptjs.hash(password,10,(err,hash) => {
                if(err) reject(err);
                resolve(hash);
            });
        });
    }
    static comparedPassword(req, data:{password:string, encrpt_passwrod:string }): Promise<any>{
        return new Promise((resolve, reject) => {
            Bcryptjs.compare( data.password,data.encrpt_passwrod,(err,same) => {
                if(err){
                  reject(err)
                } else if(!same) { 
                    req.errorStatus = 400;
                    reject(new Error("User & Password Doesn't match")) 
                } else {
                    resolve(true)
                }
            });
        });
    };

   

}