import mongoose from "mongoose"; // Importing mongoose

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI); // Connect to the MongoDB database
        console.log("Connected to MongoDB"); // Log a message if the connection is successful
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message); // Log an error message if there is an error connecting to the database
    }
};

export default connectToMongoDB; // Export the connectToMongoDB function