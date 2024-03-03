import express from 'express'; // Import express
import protectRoute from '../middleware/protectRoute.js';
import { getUsersForSidebar } from '../controllers/user.controller.js';

const router = express.Router(); // Create a new router

router.get("/",protectRoute, getUsersForSidebar); // When a get request is made to the / route, call the getUsersForSidebar function

export default router; // Export the router