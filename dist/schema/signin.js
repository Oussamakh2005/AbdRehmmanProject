"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormSchema = void 0;
const zod_1 = require("zod");
exports.FormSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, {
        message: "Name must be at least 3 characters long."
    }).max(20, {
        message: "Name must be at most 20 characters long."
    }),
    username: zod_1.z.string().min(3, {
        message: "User Name must be at least 3 characters long."
    }).max(20, {
        message: "User Name must be at most 20 characters long."
    }),
    email: zod_1.z.string().email({
        message: "Please enter a valid email address."
    }),
    password: zod_1.z.string().min(8, {
        message: "Password must be at least 8 characters long."
    }).max(20, {
        message: "Password must be at most 20 characters long."
    }),
    phone: zod_1.z.string().min(10, {
        message: "Phone must be at least 10 characters long."
    }).max(10, {
        message: "Phone must be at most 10 characters long."
    }),
    address: zod_1.z.string().min(10, {
        message: "Address must be at least 10 characters long."
    }).max(100, {
        message: "Address must be at most 100 characters long."
    })
});
