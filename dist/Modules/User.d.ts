import * as mongoose from 'mongoose';
declare const _default: mongoose.Model<{
    email_verified: boolean;
    todos: {
        title?: string;
        completed?: boolean;
        _id?: mongoose.Types.ObjectId;
    }[];
    created_at: Date;
    updated_at: Date;
    userName?: string;
    email?: string;
    verification_token?: string;
    verification_token_time?: Date;
    password?: string;
    reset_password_token?: string;
    reset_password_token_time?: Date;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    email_verified: boolean;
    todos: {
        title?: string;
        completed?: boolean;
        _id?: mongoose.Types.ObjectId;
    }[];
    created_at: Date;
    updated_at: Date;
    userName?: string;
    email?: string;
    verification_token?: string;
    verification_token_time?: Date;
    password?: string;
    reset_password_token?: string;
    reset_password_token_time?: Date;
}>>;
export default _default;
