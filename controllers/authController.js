import bcrypt from "bcrypt";
import userModels from "../models/userModels.js";
import { comparePassword, hashpassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name || !email || !phone || !password || !address) {
      return res.send({ message: "field empty" });
    }

    const existingUser = await userModels.findOne({ email });
    if (existingUser)
      return res.status(200).send({
        success: false,
        message: "user already exist",
      });

    const hashedpassword = await hashpassword(password);
    const user = await new userModels({
      name,
      email,
      phone,
      address,
      password: hashedpassword,
    }).save();
    res.status(200).send({
      success: true,
      message: "User Registration success",
      user,
    });
  } catch (e) {
    console.log(e);
    res.status(500),
      send({
        success: false,
        message: "Error in registration",
        error,
      });
  }
};

//LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModels.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

export const testController = (req, res) => {
  res.status(200).send({
    message: "protected route",
  });
};
