const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// ✅ First, create the app instance
const app = express();

// ✅ Then apply middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

// ✅ Then connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// ✅ Then define and use routes
const userRouter = require('./routers/UserRoute');
app.use('/user', userRouter);

const jobRouter = require('./routers/jobRoute');
app.use('/job', jobRouter);

// ✅ Finally, start the server
app.listen(process.env.PORT, () => {
    console.log(`running on ${process.env.PORT}`);
});
