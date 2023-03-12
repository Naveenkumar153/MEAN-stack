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
        // this.app.use(bodyparse.urlencoded({
        //     extended:true,
        // }));
        this.app.use(bodyparse.json());
    }

    setRoutes(){
        this.app.use('/api/user', UserRoutes);
    };
    

    handleErrors(){
        this.app.use((error, req, res, next) => {
            console.log("Middleware Error Hadnling");
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || 'Something went wrong. Please try again!',
                status_code: errorStatus
            });
        });
    }
}