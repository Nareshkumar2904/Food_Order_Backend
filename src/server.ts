import dotenv from 'dotenv';
dotenv.config();

// import path from 'path';
import express from 'express';
import cors from 'cors';
import { sample_foods, sample_tags, sample_users } from './data';
import { connect, ConnectOptions } from 'mongoose';
import foodRouter from './routers/food.router';
import userRouter from './routers/user.router';
import jwt from "jsonwebtoken";

const app = express();
const port = process.env.PORT || 3030; 

// Middleware
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));

// Routers
app.use('/api/foods', foodRouter);
app.use('/api/users', userRouter);

// Static files
// app.use(express.static('public'));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'src', 'public', 'index.html'));
// });

// MongoDB connection
const dbConnect = async () => {
    try {
        await connect(process.env.MONGO_URI!.replace('localhost', '127.0.0.1'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

// Start the server after connecting to MongoDB
const startServer = async () => {
    await dbConnect();
    app.listen(port, () => {
        console.log(`Website served on http://localhost:${port}`);
    });
};

// Call the function to start the server
startServer();
