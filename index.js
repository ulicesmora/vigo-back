// const express = require('express');
import express from 'express';
// const cors = require('cors');
import cors from 'cors';
import usersRouter from './routes/users.js';
import spacesRouter from './routes/spaces.js';
import reservationRouter from './routes/reservation.js';
import reviewsRouter from './routes/reviews.js';
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/spaces", spacesRouter);
app.use("/api/reservation", reservationRouter);
app.use("/api/reviews", reviewsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});