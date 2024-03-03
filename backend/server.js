import express from "express"; // Import express
import dotenv from "dotenv"; // Import dotenv
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js"; // Import authRoutes
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express(); // Initialize the app with express
const PORT = process.env.PORT || 5000; // Set the port

dotenv.config(); // Initialize dotenv

app.use(express.json()); // Use the express.json() middleware to parse the body of the request
app.use(cookieParser()); // Use the cookieParser() middleware to parse cookies

app.use("/api/auth",authRoutes); // Use the authRoutes middleware for the /api/auth route
app.use("/api/messages", messageRoutes); // Use the messageRoutes middleware for the /api/messages route
app.use("/api/users", userRoutes); // Use the userRoutes middleware for the /api/users route



//app.get("/", (req, res) => { 
    // When a GET request is made to the homepage
    //res.send("Hello World!"); // Send "Hello World!" to the client
//});  





app.listen(PORT, () => {
    connectToMongoDB(); // Connect to the MongoDB database
    console.log(`Server running on port ${PORT}`); // Log a message when the server is running
}); // Run the server on port 5000

