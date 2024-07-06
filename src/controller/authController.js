import { UserModel } from "../model/User.js";
import { registerValidation, loginValidation } from "../utils/validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].schema);
  }

  const emailExist = await UserModel.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
};

export const loginUser = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].schema);
  }

  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Email doesn't exists");
  }

  const validPassword = bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Password is Incorrect");
  }

  const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
  res.header("auth-token", token).send(token);

  res.send("Logged in!");
};
