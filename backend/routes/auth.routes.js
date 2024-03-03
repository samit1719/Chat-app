import express from 'express'; // Import express
import {signup, login, logout} from "../controllers/auth.controller.js"; // Import the signup, login, and logout functions from the auth.controller.js file

const router = express.Router(); // Create a new router

router.post("/login", login); // When a post request is made to the /login route, call the login function

router.post("/signup", signup); // When a post request is made to the /signup route, call the signup function

router.post("/logout", logout); // When a post request is made to the /logout route, call the logout function

export default router; // Export the router