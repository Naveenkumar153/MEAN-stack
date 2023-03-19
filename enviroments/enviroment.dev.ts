import { enviromentInterface } from "../src/Interface/enviroment";
// import * as dotenv from 'dotenv';
// dotenv.config({path: './.env'});

export const DevEnviroment:enviromentInterface = {
    db_url: process.env.MONGODB_API_KEY || '',
    jwt_api_key: process.env.JWT_SECRET_KEY_DEVLOPMENT || 'JWTSECRETKEYDEVLOPMENT',
    auth:{
        user:process.env.USER_NAME || '',
        pass:process.env.PASS_KEY  || ''
    }
}