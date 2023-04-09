"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require('dotenv');
const server_1 = require("./src/server");
dotenv.config({ path: './.env' });
let server = new server_1.Server().app;
server.listen(process.env.PORT, () => {
    console.log(`server is running in http://localhost:${process.env.PORT}`);
});
