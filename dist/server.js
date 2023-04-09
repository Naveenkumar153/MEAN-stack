"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
// import * as express from 'express';
const mongoose = __importStar(require("mongoose"));
const bodyparse = __importStar(require("body-parser"));
// import * as cors from 'cors';
const express = require('express');
const cors = require('cors');
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const path = require("path");
class Server {
    constructor() {
        this.app = express();
        this.setConfig();
        this.setRoutes();
        this.handleErrors();
        // this.setFrontend();
    }
    setConfig() {
        this.connectMongoDB();
        this.allowCors();
        this.configureBodyParser();
    }
    ;
    connectMongoDB() {
        return __awaiter(this, void 0, void 0, function* () {
            mongoose.set("strictQuery", true);
            yield mongoose.connect(process.env.MONGODB_API_KEY).then(() => console.log('Mongodb DB connected')).catch(e => console.log(e));
        });
    }
    allowCors() {
        this.app.use(cors());
    }
    configureBodyParser() {
        // this.app.use(bodyparse.urlencoded({
        //     extended:true,
        // }));
        this.app.use(bodyparse.json());
    }
    setRoutes() {
        this.app.use('/api/user', UserRoutes_1.default);
    }
    ;
    setFrontend() {
        this.app.use(express.static('frontend'));
        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../frontend/index.html'));
        });
    }
    handleErrors() {
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
exports.Server = Server;
