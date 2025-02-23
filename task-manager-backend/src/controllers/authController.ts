import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import client from '../db';

// Make sure .env file is loaded correctly
const JWT_SECRET = process.env.JWT_SECRET as string;

export const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Hash the password before saving to the DB
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Insert new user into the users table
    const result = await client.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, hashedPassword]
    );

    const user = result.rows[0];
    res.status(201).json({
      id: user.id,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;

  try {
    // Check if the user exists in the DB
    const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);

    const user = result.rows[0];

    // If user does not exist or password doesn't match, return 401 Unauthorized
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: 'Login failed' });
  }
};
