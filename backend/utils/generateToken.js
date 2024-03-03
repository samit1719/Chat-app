import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId,res) => {
    const token = jwt.sign({userId,}, process.env.JWT_SECRET,{
        expiresIn:"15d"
    }); // Create a token with the user's id and the JWT_SECRET from the .env file
    
    res.cookie("jwt", token,{
        maxage: 15 * 24 * 60 * 60 * 1000,  // 15 days
        httpOnly: true,  // prevents XSS attacks by not allowing the client-side JavaScript to access the cookie
        sameSite: "strict",  // cookie is sent only to the same site as the one that originated it
        secure: process.env.NODE_ENV !== "development",
    }) // Set the jwt cookie with the token
}; 

export default generateTokenAndSetCookie; // Export the generateTokenAndSetCookie function