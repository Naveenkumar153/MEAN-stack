export declare class UserController {
    static signup(req: any, res: any, next: any): Promise<void>;
    static verifyEmailOtp(req: any, res: any, next: any): Promise<void>;
    static resendVerificationEmail(req: any, res: any, next: any): Promise<void>;
    static login(req: any, res: any, next: any): Promise<void>;
    static sendResetPasswordOtp(req: any, res: any, next: any): Promise<void>;
    static verifyResetPassword(req: any, res: any, next: any): Promise<void>;
    static resetPassword(req: any, res: any, next: any): Promise<void>;
    static eachUserData(req: any, res: any, next: any): Promise<void>;
    static addTodos(req: any, res: any, next: any): Promise<void>;
    static updateTodos(req: any, res: any, next: any): Promise<any>;
    static deleteTodos(req: any, res: any, next: any): Promise<any>;
}
