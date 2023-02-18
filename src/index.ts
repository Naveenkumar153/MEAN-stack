import { Server } from "./server";

let server = new Server().app;
let port = 3000;
server.listen(port, () => {
    console.log(`server is running in ${port}`);
});



