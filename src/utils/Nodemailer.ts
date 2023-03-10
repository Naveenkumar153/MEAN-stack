import * as nodeMailer from 'nodemailer';
import * as SendGrid   from  'nodemailer-sendgrid-transport';
// import * as sendGridMail from '@sendgrid/mail'
import { getEnviromentVariables } from '../../enviroments/enviroment';
export class NodeMailer {


    private static initiateTransport(){
        return nodeMailer.createTransport(SendGrid({
            auth:{
                api_key:getEnviromentVariables().sendGrid_api_key,
            }
        }))
    };

    static async sendMail(data:{to: string[], subject:string, html:string}){
        return await this.initiateTransport().sendMail({
            from:'naveenkumartech2025@gmail.com',
            to:data.to,
            subject:data.subject,
            html:data.html,
        }).then(res => {
            console.log('successfully sent the mail', res);
        }).catch(e => {
            console.log('somthing as problem');
        });
    }
}