const dotenv = require('dotenv');
import { Server } from "./src/server";
dotenv.config({path: './.env'});

let server = new Server().app;

server.listen(process.env.PORT, () => {
    console.log(`server is running in http://localhost:${process.env.PORT}`);
});



