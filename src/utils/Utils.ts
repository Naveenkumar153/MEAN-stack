export class Utils {
    constructor(){

    }

    public MAX_TOKEN_TIME = ( 5 * 60 * 1000 )
    // generateOTP function
    static generateVerificationToken(digit:number = 6){
        const digits:string = '0123456789';
        let otp:any = '';
     
        for(let i = 0; i < digit; i++){
            otp += Math.floor(Math.random() * 10);
        }
        return  +otp;  // parseInt(otp) 
    }
}