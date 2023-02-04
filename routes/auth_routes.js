import express from "express";
import bcrypt from "bcrypt";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../utils/validators.js";
const auth_router = express.Router();

let users = {};

auth_router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);

  if (!validateEmail(email)) {
    res.send("invalid email");
    return;
  }

  const userExists = users.hasOwnProperty(email);
  if (userExists) {
    res.send("User already exists");
    return;
  }
  if (!validateName(name)) {
    res.send("invalid name");
    return;
  }
  if (!validatePassword(password)) {
    res.send("invalid password");
    return;
  }
  const hashedPass = await bcrypt.hash(password, 10);
  users[email] = { name, password: hashedPass };

  res.send({ name, email, password: hashedPass });
  //   console.log(users);
});

auth_router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password });
  if (!validateEmail(email)) {
    res.send("Invalid email");
    return;
  }
  const userExists = users.hasOwnProperty(email);
  if (!userExists) {
    res.send("New User!!!\nPlease sign up first...");
    return;
  }
  if (!validatePassword(password)) {
    res.send("invalid password");
    return;
  }

  const passMatch = await bcrypt.compare(password, users[email].password);

  if (passMatch) {
    res.send(users[email]);
    return;
  } else {
    res.send("Wrong Password");
    return;
  }
});

export default auth_router;
