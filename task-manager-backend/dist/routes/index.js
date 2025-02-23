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
// src/routes/index.ts
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const taskController_1 = require("../controllers/taskController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running!" });
});
// Auth routes
router.post('/auth/signup', authController_1.signup);
// Define login as a separate async function
const loginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, authController_1.login)(req, res);
});
router.post('/auth/login', loginHandler);
// Task routes (requires authentication)
router.post('/tasks', authMiddleware_1.default, taskController_1.createTask);
router.get('/tasks', authMiddleware_1.default, taskController_1.getTasks);
router.put('/tasks/:id', authMiddleware_1.default, taskController_1.updateTask);
router.delete('/tasks/:id', authMiddleware_1.default, taskController_1.deleteTask);
exports.default = router;
