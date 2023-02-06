import express from "express";
import bcrypt from "bcrypt";

import { signup, login } from "../controllers.js/auth_controller.js";

const auth_router = express.Router();

let users = {};

auth_router.post("/signup", signup);

auth_router.post("/signin", login);

export default auth_router;
