import express from 'express'; // Import express
import {getMessages, sendMessage} from "../controllers/message.controller.js"; // Import the sendMessage function from the message.controller.js file
import protectRoute from "../middleware/protectRoute.js"; // Import the protectRoute function from the authMiddleware.js file

const router = express.Router(); // Create a new router

router.get("/:id",protectRoute,getMessages); // When a get request is made to the /:id route, call the sendMessage function
router.post("/send/:id",protectRoute,sendMessage); // When a post request is made to the /send route, call the sendMessage function

export default router; // Export the router