export declare class userValidation {
    static noSplCharacters: any;
    static isPasswordValidation: any;
    static userEmail: any;
    static signUpValidation(): import("express-validator").ValidationChain[];
    static verifyEmailOtp(): import("express-validator").ValidationChain[];
    static login(): import("express-validator").ValidationChain[];
    static sendResetPasswordOtp(): import("express-validator").ValidationChain[];
    static verifyResetPassword(): import("express-validator").ValidationChain[];
    static resetPassword(): import("express-validator").ValidationChain[];
    static addTodos(): import("express-validator").ValidationChain[];
}
