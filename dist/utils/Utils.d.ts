export declare class Utils {
    constructor();
    MAX_TOKEN_TIME: number;
    static generateVerificationToken(digit?: number): number;
    static encrptPassword(password: any): Promise<any>;
    static comparedPassword(req: any, data: {
        password: string;
        encrpt_passwrod: string;
    }): Promise<any>;
}
