import { DevEnviroment } from "./enviroment.dev";
import { ProdEnviroment } from "./enviroment.prod";
import { enviromentInterface } from "../src/Interface/enviroment";


export function getEnviromentVariables(){
    if(process.env.NODE_ENV === 'production'){
        return ProdEnviroment;
    }
    return DevEnviroment;
}