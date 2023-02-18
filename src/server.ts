import * as express from 'express';
import * as mongoose from 'mongoose';
import { getEnviromentVariables } from '../enviroments/enviroment';
import UserRoutes from './routes/UserRoutes';

export class Server {
    public app: express.Application = express();
    constructor(
    ){
        this.setConfig();
        this.setRoutes();
    }

    setConfig(){
        this.connectMongoDB();
    };
  
    connectMongoDB(){
        mongoose.connect(getEnviromentVariables().db_url).then(() => console.log('Mongodb DB connected'));
    }

    setRoutes(){
        this.app.use('/api/user', UserRoutes);
    };
}