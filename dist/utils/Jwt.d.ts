export declare class JWT {
    constructor();
    static jwtSign(payload: any): string;
    static jwtVerify(token: any): Promise<any>;
}
