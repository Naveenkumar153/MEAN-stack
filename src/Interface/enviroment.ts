export interface enviromentInterface {
    db_url:string;
    sendGrid_api_key?:string;
    jwt_api_key:string;
    auth?:{
        user:string,
        pass:string
    }
}

export interface nodeMailerGmailAuth{
    auth:{
        user:string;
        pass:string
    }
}