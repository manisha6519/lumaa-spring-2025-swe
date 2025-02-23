"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../db"));
// Make sure .env file is loaded correctly
const JWT_SECRET = process.env.JWT_SECRET;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // Hash the password before saving to the DB
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    try {
        // Insert new user into the users table
        const result = yield db_1.default.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);
        const user = result.rows[0];
        res.status(201).json({
            id: user.id,
            username: user.username,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // Check if the user exists in the DB
        const result = yield db_1.default.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = result.rows[0];
        // If user does not exist or password doesn't match, return 401 Unauthorized
        if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Generate a JWT token for the user
        const token = jsonwebtoken_1.default.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    }
    catch (error) {
        return res.status(500).json({ error: 'Login failed' });
    }
});
exports.login = login;
