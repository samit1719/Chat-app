import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body; // Get the message from the request body
    const { id: receiverId } = req.params; // Get the receiverId from the request parameters
    const senderId = req.user._id; // Get the senderId from the request user object

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }); // Find a conversation with the senderId and receiverId

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    } // If a conversation doesn't exist, create a new conversation with the senderId and receiverId

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    }); // Create a new message with the senderId, receiverId, and message

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    } // If the new message is created, push the message id to the conversation messages array

    //  await conversation.save();
    //  await newMessage.save();

    await Promise.all([conversation.save(), newMessage.save()]); // Save the conversation and the new message to the database

    res.status(201).json(newMessage); // Send the new message to the client)
  } catch (error) {
    console.log("Error in sendMessage controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
   const {id:userToChatId} = req.params; // Get the userToChatId from the request parameters
   const senderId = req.user._id; // Get the senderId from the request user object

   const conversation = await Conversation.findOne({
     participants: { $all: [senderId, userToChatId] },
   }).populate("messages"); // Find a conversation with the senderId and userToChatId and populate the messages

   if (!conversation) return res.status(200).json([]); // If a conversation doesn't exist, send an empty array to the client

   const messages = conversation.messages; // Get the messages from the conversation

   res.status(200).json(messages); // Send the conversation messages to the client

  } catch (error) {
    console.log("Error in sendMessage controller", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
