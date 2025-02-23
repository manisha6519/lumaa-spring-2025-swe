"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/middleware/authMiddleware.ts
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(403).json({ message: 'No token provided' }); // Send the response, don't return
        return; // Terminate the middleware chain early
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: 'Unauthorized' }); // Send the response, don't return
            return; // Terminate the middleware chain early
        }
        if (decoded && typeof decoded !== 'string') {
            req.userId = decoded.id; // Assuming `id` is in the payload
        }
        else {
            res.status(401).json({ message: 'Invalid token' }); // Send the response, don't return
            return; // Terminate the middleware chain early
        }
        next(); // If everything is fine, proceed to the next middleware
    });
};
exports.default = authMiddleware;
