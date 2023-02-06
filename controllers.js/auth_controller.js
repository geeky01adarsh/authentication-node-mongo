import User from "../models/auth_model.js";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../utils/validators.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
      const { name, email, password } = req.body;
      console.log(name, email, password);

      if (!validateEmail(email)) {
        res.send("invalid email");
        return;
      }

      const userExists = await User.find({ email: email });
      console.log(userExists);
      if (userExists.length) {
        return res.send("User already exists");
        
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
      // users[email] = { name, password: hashedPass };
      const newUser = new User({ name, email, password: hashedPass });
      try {
        await newUser.save();
      } catch (err) {
        console.log(err);
      }
      res.send({ name, email, password: hashedPass });
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log({ email, password });
    if (!validateEmail(email)) {
      res.send("Invalid email");
      return;
    }
    const userExists = await User.find({ email: email });
    if (!userExists.length) {
      res.send("New User!!!\nPlease sign up first...");
      return;
    }
    if (!validatePassword(password)) {
      res.send("invalid password");
      return;
    }

    const passMatch = await bcrypt.compare(password, userExists[0].password);

    if (passMatch) {
      res.send(userExists[0]);
      return;
    } else {
      res.send("Wrong Password");
      return;
    }
}