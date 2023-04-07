export declare class GlobalMiddleWare {
    static checkError(req: any, res: any, next: any): void;
    static authGuard(req: any, res: any, next: any): Promise<boolean>;
}
