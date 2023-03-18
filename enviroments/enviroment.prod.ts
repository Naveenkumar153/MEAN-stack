import { enviromentInterface } from "../src/Interface/enviroment";
// import * as dotenv from 'dotenv';
// dotenv.config({path: './.env'});
export const ProdEnviroment:enviromentInterface = {
    db_url: process.env.MONGODB_API_KEY || 'mongodb+srv://Naveen:tzVaX9RbJAyiunNn@swiggycloneapp.rouxifz.mongodb.net/?retryWrites=true&w=majority',
}