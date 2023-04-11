export declare class Server {
    app: any;
    constructor();
    setConfig(): void;
    connectMongoDB(): Promise<void>;
    allowCors(): void;
    configureBodyParser(): void;
    setRoutes(): void;
    handleErrors(): void;
}
