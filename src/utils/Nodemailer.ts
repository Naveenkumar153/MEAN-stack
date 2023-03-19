import * as nodeMailer from 'nodemailer';
import * as SendGrid   from  'nodemailer-sendgrid-transport';
import * as sendGridMail from '@sendgrid/mail'
import { getEnviromentVariables } from '../../enviroments/enviroment';
export class NodeMailer {


    private static initiateTransport(){
        return nodeMailer.createTransport({
            service:'gmail' || getEnviromentVariables().jwt_api_key,
            auth:{
                user:process.env.USER_NAME || getEnviromentVariables().auth.user,
                pass:process.env.PASS_KEY  || getEnviromentVariables().auth.pass
            }
        });
    };

    static async sendMail(data:{to: string[], subject:string, html:string}){
        return await this.initiateTransport().sendMail({
            from:'mytodo032023@gmail.com',
            to:data.to,
            subject:data.subject,
            html:data.html,
        }).then(res => {
            console.log('successfully sent the mail', res);
        }).catch(e => {
            console.log('somthing as problem', e );
        });
    }
}