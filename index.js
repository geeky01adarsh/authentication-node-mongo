import express from 'express';
import auth_router from './routes/auth_routes.js'
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