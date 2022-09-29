import express from "express";
import mongoose from "mongoose";
import multer from 'multer';

import { registerValidation, loginValidation, postCreateValidation } from './validations.js'
import { UserController, PostController } from './controllers/index.js'
import { checkAuth, validationError } from './utils/index.js'
import {config} from "dotenv";

config();
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage });

app.use(express.json());
app.use('uploads', express.static('uploads'))

app.post('/auth/login/', loginValidation, validationError, UserController.login);
app.post('/auth/register/', registerValidation, validationError, UserController.register);
app.get('/auth/me/', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

app.get('/posts/', PostController.getAll);
app.get('/posts/:id/', PostController.getOne);
app.delete('/posts/:id/', checkAuth, PostController.deleteOne);
app.patch('/posts/:id/', checkAuth, postCreateValidation, validationError, PostController.update);
app.post('/post/', checkAuth, postCreateValidation, validationError, PostController.create);


app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log("Server OK");
});