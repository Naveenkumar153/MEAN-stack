import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyparse from 'body-parser';
import * as cors from 'cors';
import { getEnviromentVariables } from '../enviroments/enviroment';
import UserRoutes from './routes/UserRoutes';

export class Server {
    public app: express.Application = express();
    constructor(
    ){
        this.setConfig();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }

    setConfig(){
        this.connectMongoDB();
        this.allowCors();
        this.configureBodyParser();
    };
  
    connectMongoDB(){
        mongoose.connect(getEnviromentVariables().db_url).then(() => console.log('Mongodb DB connected'));
    }

    allowCors(){
        this.app.use(cors())
    }

    configureBodyParser(){
        this.app.use(bodyparse.urlencoded({
            extended:true,
        }));
        // this.app.use(bodyparse.json());
    }

    setRoutes(){
        this.app.use('/api/user', UserRoutes);
    };

    error404Handler(){
        this.app.use((req,res) => {
            res.status(404).json({
                data: {
                    message:'Not Found',
                    status_code:404,
                }
            });
        })
    };

    handleErrors(){
        this.app.use((error,req,res,next) => {
            const errorStatus = req.errorStatus ||  500;
            console.log(errorStatus);
            res.status(errorStatus).json({
                data: {
                    message: error.message || 'Something went wrong. Please try again !',
                    status_code:errorStatus
                }
            });
        });
    }
}