import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; // Get the jwt cookie from the request and store it in a variable

        if (!token) {
            return res.status(401).json({ error: "Unauthorized" }); // If the jwt cookie is not present, return an error message
        } 

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token with the JWT_SECRET from the .env file and store the decoded token in a variable

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized" }); // If the token is not verified, return an error message
        }

        const user = await User.findById(decoded.userId).select("-password"); // Find a user with the same id as the one in the token

        if(!user){
            return res.status(404).json({ error: "User not found" }); // If the user is not found, return an error message
        }

        req.user = user; // Set the user in the request object

        next(); // Call the next middleware


    } catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default protectRoute; // Export the protectRoute middleware