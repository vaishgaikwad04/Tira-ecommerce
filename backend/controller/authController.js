import authModel from "../models/authModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  const { userName, email, password, role } = req.body;
  console.log(userName);

  try {
    const existingUser = await authModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await authModel.create({
      userName,
      email,
      password: hashedPassword,
      role: role || "stranger",
    });

    return res
      .status(201)
      .json({ message: "User registered successfully.", createdUser });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.SECRET,
      { expiresIn: "24h" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // must be true on Render (HTTPS)
      sameSite: "none", // ✅ REQUIRED for cross-site
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });
    res.status(200).json({ message: "User logout successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out user", error });
  }
};

export const getUserId = async (req, res) => {
  try {
    const userId = req.user.userId;
    const role = req.user.role;
    res
      .status(200)
      .json({ message: "user id fetch sucessfully!", userId, role });
    console.log("user id fetch sucessfully!", userId, role);
  } catch (error) {
    res.status(400).json({ message: "error fetching user id", error });
  }
};

export const checkAuth = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ authenticated: false });
  }

  try {
    jwt.verify(token, process.env.SECRET);
    return res.json({ authenticated: true });
  } catch (error) {
    return res.json({ authenticated: false });
  }
};
