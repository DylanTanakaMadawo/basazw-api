import UserModel from "../Models/user.js";

import jwt from "jsonwebtoken";
// import jwt from "jsonwebtoken";
const { sign, verify } = jwt;

import { JWT_SECRET } from "../config.js";

import { hashPassword, comparePassword } from "../Helpers/auth.js";

const test = (req, res) => {
  res.json("test is working");
};

const registerUser = async (req, res) => {
  try {
    console.log("from register user");
    const { userName, password } = req.body;
    // check if username and password was entered
    if (!userName) {
      return res.json({
        error: "username is required",
      });
    }
    if (!password || password.length < 6) {
      return res.json({
        error:
          "password is required and should be at least 6 (six) characters long",
      });
    }
    //check email
    const exist = await UserModel.findOne({ userName });
    if (exist) {
      return res.json({
        error: "Username is already taken.",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await UserModel.create({
      userName,
      password: hashedPassword,
    });

    console.log("user created");

    return res.json(user);
  } catch (error) {
    console.log(error);
    console.log("error from auth controller");
  }
};

//login endpoint
const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    //check if user exists
    const user = await UserModel.findOne({ userName });
    if (!user) {
      return res.json({
        error: "No user found. Check username and try again.",
      });
    }

    //check if passwords match
    const match = await comparePassword(password, user.password);
    if (match) {
      sign(
        { userName: user.userName, id: user._id },
        process.env.JWT_SECRET,
        {},
        (error, token) => {
          if (error) throw error;
          if (error) {
            // console.log("ka erro kanyama");
          }
          // console.log("success nyama!!!!");
          res
            .cookie("token", token, { sameSite: "none", secure: true })
            .json(user);
        }
      );
    }
    if (!match) {
      res.json({
        error: "Wrong passwod",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getProfile = (req, res) => {
  // console.log("the req.cookies", req.cookies);
  const { token } = req.cookies;
  // const token = req.cookies;
  // console.log(token);
  if (token) {
    verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    // console.log("no token here amana");
    res.json(null);
  }
};

export { test, registerUser, loginUser, getProfile };
