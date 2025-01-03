import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

// Add all solid icons to the library
library.add(fas);

function App() {
  // State variables
  const [messages, setMessages] = useState([]); // Chat messages
  const [newMessage, setNewMessage] = useState(""); // Current message input
  const [sessionId, setSessionId] = useState(""); // Unique session identifier
  const [uploading, setUploading] = useState(false); // File upload status
  const [uploadedFileName, setUploadedFileName] = useState(""); // Uploaded file name
  const [aiResponse, setAiResponse] = useState(""); // AI response

  // Handle PDF file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (!file) return;

    // Generate a new session ID
    const newSessionId = uuidv4();
    setSessionId(newSessionId);

    // Prepare form data for upload
    const formData = new FormData();
    formData.append("file", file);
    formData.append("session_id", newSessionId);

    setUploading(true);
    try {
      // Send file to the backend
      const response = await axios.post(
        "http://localhost:8000/upload/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setUploadedFileName(file.name); // Update uploaded file name
      console.log(response.data);

      // Store the file name in session storage and clear previous messages
      sessionStorage.setItem("uploadedFileName", file.name);
      setMessages([]);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // Handle sending a message
  const handleSendMessage = async (event) => {
    event.preventDefault();

    // Retrieve the uploaded file name from session storage
    const filename =
      sessionStorage.getItem("uploadedFileName") || "example.txt";

    // Prepare form data for sending a message
    const formData = new FormData();
    formData.append("question", newMessage);
    formData.append("filename", filename);
    formData.append("session_id", sessionId);

    // Add the user's message to the chat instantly
    setMessages([...messages, { sender: "you", message: newMessage }]);
    setNewMessage("");

    try {
      // Send the question to the backend
      const response = await axios.post(
        "http://localhost:8000/ask/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setAiResponse(response.data.answer); // Update AI response

      // Add the AI's response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", message: response.data.answer },
      ]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      alert("Error fetching AI response. Please try again.");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-gray-100 shadow-md flex items-center justify-between p-4">
        <div className="flex items-center">
          <img src="logo.png" alt="Logo" className="h-12 w-auto" />
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-green-700 hidden sm:inline-block">
            Session: {sessionId || "No session active"}
          </span>
          {/* File Upload Button */}
          <label
            className={`w-full sm:w-52 border-black border-2 text-black px-4 py-2 rounded-md ${
              uploading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-green-700 hover:text-white"
            } flex items-center justify-center space-x-2`}
          >
            <FontAwesomeIcon icon="fa-solid fa-circle-plus" />
            <span className="hidden sm:inline-block">Upload PDF</span>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
        {uploadedFileName && (
          <p className="hidden sm:inline-block">
            Uploaded File: {uploadedFileName}
          </p>
        )}
      </header>

      {/* Main Chat Section */}
      <main className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-center ${
              msg.sender === "you" ? "justify-end" : "justify-start"
            } mb-4`}
          >
            <img
              src="favicon.png"
              alt="Avatar"
              className={`${msg.sender === "you" ? "hidden" : ""} w-8 h-8 mr-4`}
            />
            <div
              className={`${
                msg.sender === "you"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-800"
              } px-4 py-2 rounded-lg max-w-full lg:max-w-lg break-words`}
            >
              {msg.message}
            </div>
            <img
              src="user.png"
              alt="Avatar"
              className={`${msg.sender === "ai" ? "hidden" : ""} w-8 h-8 ml-4`}
            />
          </div>
        ))}
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-100 p-3">
        <form
          className="flex items-center bg-white border border-gray-300 rounded-2xl px-6 py-2"
          onSubmit={handleSendMessage}
        >
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-[95%] flex focus:outline-none"
          />
          <button
            type="submit"
            className="h-10 w-10 bg-green-600 p-2 rounded-full text-white hover:bg-green-700"
            aria-label="Send"
          >
            <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
          </button>
        </form>
      </footer>
    </div>
  );
}

export default App;
