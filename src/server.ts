// import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyparse from 'body-parser';
// import * as cors from 'cors';
const express = require('express');
const cors = require('cors');
import UserRoutes from './routes/UserRoutes';
import path = require('path');

export class Server {
    public app = express();
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
  
    async connectMongoDB(){
        mongoose.set("strictQuery", true);
        await mongoose.connect(
            process.env.MONGODB_API_KEY,
        ).then(() => console.log('Mongodb DB connected')).catch(e => console.log(e));
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
            console.log(req.body);
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || 'Something went wrong. Please try again!',
                status_code: errorStatus
            });
        });
    }
}