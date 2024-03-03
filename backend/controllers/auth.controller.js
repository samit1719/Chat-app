import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body; // Destructure the fullName, username, password, confirmPassword

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password doesn't match" });
    } // If the password and confirmPassword don't match, return an error message

    const user = await User.findOne({ username }); // Find a user with the same username as the one provided in the request

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    } // If a user with the same username already exists, return an error message

    const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password with the salt

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    }); // Create a new user with the fullName, username, password, and profilePic

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res); // Generate a token and set it as a cookie
      await newUser.save(); // Save the new user to the database

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      }); // Send the new user's id, fullName, username, and profilePic to the client
    } else {
      res.status(400).json({ error: "Invalid user data" });
    } // If the new user is not created, return an error message
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}; // Create a new function called signup that takes a request and a response

export const login = async (req, res) => {
  try {
    const { username, password } = req.body; // Destructure the username and password from the request body
    const user = await User.findOne({ username }); // Find a user with the same username as the one provided in the request
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    ); // Check if the password is correct

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid credentials" }); // If the user doesn't exist or the password is incorrect, return an error message
    }

    generateTokenAndSetCookie(user._id, res); // Generate a token and set it as a cookie

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    }); // Send the user's id, fullName, username, and profilePic to the client
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}; // Create a new function called login that takes a request and a response

export const logout =  (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 }); // Clear the jwt cookie
    res.status(200).json({ message: "Logged out successfully" }); // Send a success message to the client
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}; // Create a new function called logout that takes a request and a response
