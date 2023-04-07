"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const mongoose_1 = require("mongoose");
const userSchema = new mongoose.Schema({
    userName: { type: String, require: true },
    email: { type: String, require: true },
    email_verified: { type: Boolean, required: true, default: false },
    verification_token: { type: String, require: true },
    verification_token_time: { type: Date, require: true },
    password: { type: String, require: true },
    todos: [
        {
            completed: Boolean,
            title: String,
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                auto: true
            }
        }
    ],
    reset_password_token: { type: String, require: true },
    reset_password_token_time: { type: Date, require: true },
    created_at: { type: Date, require: true, default: new Date() },
    updated_at: { type: Date, require: true, default: new Date() },
});
exports.default = (0, mongoose_1.model)('todo_app', userSchema);
