import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id; // Get the loggedInUserId from the request user object

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password"); // Find all users except the loggedInUserId and select all fields except the password

        res.status(200).json(filteredUsers); // Send the filtered users to the client
    } catch (error) {
        console.error("Error in getUsersForSidebar controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};