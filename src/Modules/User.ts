import * as mongoose from 'mongoose';
import { model } from 'mongoose';

const userSchema = new mongoose.Schema({
    userName               : { type:String, require:true },
    email                  : { type:String, require:true },
    // email_verified         : { type: Boolean, required:true, default:false},
    // verification_token     : { type: Number, require:true },
    // verification_token_time: { type:Date, require:true },
    password               : { type:String, require:true },
    created_at             : { type:Date, require:true, default:new Date() },
    updated_at             : { type:Date, require:true, default:new Date() },
});

export default model('users_credentials', userSchema);