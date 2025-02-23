import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//app.use(cors());
app.use(cors({
  origin: 'http://localhost:5000',  // Allow frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true  // Allow cookies and authentication headers
}));

app.use(express.json());
app.use(routes);

// ✅ Add a basic route to check server status
app.get('/', (req: Request, res: Response) => {
  res.json({ message: "Server is running!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
