const dotenv = require('dotenv');
import { Server } from "./server";
dotenv.config({path: './.env'});

let server = new Server().app;

server.listen(process.env.PORT || 3030, () => {
    console.log(`server is running in ${process.env.PORT}`);
});



