import * as mongoose from 'mongoose';
import { model } from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: { type:String, require:true },
    email   : { type:String, require:true },
    password: { type:String, require:true },
});

export default model('users_credentials', userSchema);