import { useState } from "react";
import MessageBox from "../components/chat-comps/MessageBox";
import InputBox from "../components/chat-comps/InputBox";
import { commandResponses, customHandlers } from "../components/chat-comps/commands"; // import the command object
import "../App.css";

function ChatPage() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (text) => {
    // Add user message to messages array
    setMessages((prevMessages) => [...prevMessages, { sender: "User", text }]);

    // Check if it's a known command
    if (commandResponses[text]) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "Bot", text: commandResponses[text] },
      ]);
    } else if (customHandlers[text]) {
      const customResponse = customHandlers[text]();
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "Bot", text: customResponse },
      ]);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "Bot",
          text: "Sorry, I did not understand that. Type /help for assistance.",
        },
      ]);
    }
  };

  return (
    <div className="chat-page">
      <MessageBox messages={messages} />
      <InputBox onSendMessage={handleSendMessage} />
    </div>
  );
}

export default ChatPage;
