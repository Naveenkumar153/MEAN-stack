import { enviromentInterface } from "../src/Interface/enviroment";
// import * as dotenv from 'dotenv';
// dotenv.config({path: './.env'});
export const ProdEnviroment:enviromentInterface = {
    db_url: process.env.MONGODB_API_KEY || '',
    jwt_api_key: process.env.JWT_SECRET_KEY_PRODUCTION || 'JWTSECRETKEYPRODUCTION',
}