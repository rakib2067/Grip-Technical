"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
function sanitizeInput({ username, email, password }) {
    try {
        username = username.trim();
        email = email.trim();
        password = password.trim();
        if (!password || password.length < 8) {
            throw new Error('Password is invalid');
        }
        if (!email || !(0, isEmail_1.default)(email)) {
            throw new Error('Email is invalid');
        }
        if (!username || username.length < 8) {
            throw new Error('Username is invalid');
        }
        username = validator_1.default.escape(username);
        email = validator_1.default.escape(email);
        password = validator_1.default.escape(password);
        return { username, email, password };
    }
    catch (error) {
        if (error instanceof Error) {
            error.message;
        }
        return error;
    }
}
let res = sanitizeInput({ username: '<rakib777>', email: 'rakib7@hotmail.co.uk', password: 'rakib888' });
console.log(res);
//# sourceMappingURL=task2.js.map