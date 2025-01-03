import React, { useState } from "react";

const Chatbox = () => {
  const [messages, setMessages] = useState([
    { sender: "ai", message: "Hello! How can I help you today?" },
    { sender: "you", message: "Can you explain how this works?" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      // Add the new message to the messages list
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "you", message: newMessage },
      ]);
      setNewMessage(""); // Clear the input field

      // Simulate AI's response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "ai", message: "That's an interesting question!" },
        ]);
      }, 1000); // Delay for AI's response
    }
  };

  return (
    <div className="flex flex-col h-full w-full py-10 sm:px-12 mx-auto overflow-hidden">
      {/* Chat Messages */}
      <div className="w-full p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "you" ? "justify-end" : "justify-start"
            } mb-4`}
          >
            <div
              className={`${
                msg.sender === "you"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-800"
              } px-4 py-2 rounded-lg max-w-xs`}
            >
              {msg.message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chatbox;
