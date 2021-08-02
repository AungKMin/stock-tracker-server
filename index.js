import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import userRoutes from './routes/users.js';
import priceRoutes from './routes/prices.js';
import twitterRoutes from './routes/twitter.js';

dotenv.config();


const app = express();
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors());

app.use('/user', userRoutes);
app.use('/prices', priceRoutes);
app.use('/twitter', twitterRoutes);

app.get('/', (req, res) => { 
    res.send("Welcome to the Stock Tracker API");
});

const mongoUrl = process.env.CONNECTION_URL || 'mongodb://localhost:27017/stock_tracker';

const PORT = process.env.PORT || 5000;

mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error));

mongoose.set('useFindAndModify', false);