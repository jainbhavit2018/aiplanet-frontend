import React, { useState } from "react";

// Placeholder for your custom icon component
const MyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6 h-6 text-white"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12h15m0 0l-6-6m6 6l-6 6"
    />
  </svg>
);

const SendMessage = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      alert(`Message sent: ${message}`); // Replace with your actual send logic
      setMessage("");
    }
  };

  return (
    <div className="flex h-full items-center justify-between bg-gray-100 p-3 px-14 rounded-md shadow-md">
      <div className="flex justify-between w-full h-full bg-white border border-gray-300 rounded-2xl py-2 px-6">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-[95%] focus:outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="ml-4 bg-green-600 p-2 rounded-full hover:bg-green-700 transition duration-200 flex items-center justify-center"
          aria-label="Send"
        >
          <MyIcon />
        </button>
      </div>
      {/* Input Field */}

      {/* Send Icon */}
    </div>
  );
};

export default SendMessage;
