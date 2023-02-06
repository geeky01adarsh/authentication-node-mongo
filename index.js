import express from 'express';
import auth_router from './routes/auth_routes.js'
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();
mongoose.set("strictQuery", false);
mongoose.connect(
  `mongodb+srv://admin:${process.env.MONGODB_PASS}@cluster0.yf2kxjy.mongodb.net/?retryWrites=true&w=majority`
).then(()=>console.log("Successfully connected to the database"));
const app = express();
const PORT = 5000;

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use('/api/v1', auth_router);

app.listen(PORT, (err) => {
    if (err) console.log(err);
    else console.log(`Sucessfully connected to port ${PORT}`)
})