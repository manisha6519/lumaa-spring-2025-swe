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
exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
const db_1 = __importDefault(require("../db"));
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const userId = req.userId; // Now TypeScript knows userId exists on req
    try {
        const result = yield db_1.default.query('INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *', [title, description, userId]);
        const task = result.rows[0];
        res.status(201).json(task);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating task' });
    }
});
exports.createTask = createTask;
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId; // Accessing userId from req
    try {
        const result = yield db_1.default.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});
exports.getTasks = getTasks;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Get task ID from URL params
    const { title, description, status } = req.body; // Extract possible fields from request body
    // Prepare an array to hold the fields to be updated
    const fieldsToUpdate = [];
    const values = [];
    // Add each field to the update query dynamically if provided
    if (title) {
        fieldsToUpdate.push('title');
        values.push(title);
    }
    if (description) {
        fieldsToUpdate.push('description');
        values.push(description);
    }
    if (status) {
        fieldsToUpdate.push('status');
        values.push(status);
    }
    // If no fields are provided, return a 400 error
    if (fieldsToUpdate.length === 0) {
        res.status(400).json({ error: 'No fields provided for update' });
        return;
    }
    // Add the ID to the values array (for the WHERE clause)
    values.push(id);
    // Build the dynamic SET clause of the SQL query
    const setClause = fieldsToUpdate
        .map((field, index) => `${field} = $${index + 1}`)
        .join(', ');
    try {
        // Construct the SQL query dynamically with the updated fields
        const query = `UPDATE tasks SET ${setClause} WHERE id = $${values.length} RETURNING *`;
        const result = yield db_1.default.query(query, values);
        // If no task is updated, return a 404 error
        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Task not found' });
            return;
        }
        const updatedTask = result.rows[0]; // Get the updated task
        res.json(updatedTask); // Return the updated task
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating task' });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield db_1.default.query('DELETE FROM tasks WHERE id = $1', [id]);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting task' });
    }
});
exports.deleteTask = deleteTask;
