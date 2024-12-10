import React, { useState, useEffect } from "react";
import { database } from "./firebase";
import { ref, push, onValue, remove } from "firebase/database";
import './App.css';

function App() {
  const [message, setMessage] = useState(""); // For new messages
  const [messages, setMessages] = useState([]); // For all chat messages

  const sendMessage = () => {
    if (message.trim() !== "") {
      const messagesRef = ref(database, "messages");
      push(messagesRef, { text: message, timestamp: Date.now() });
      setMessage(""); // Clear input
    }
  };

  const deleteMessage = (key) => {
    const messageRef = ref(database, `messages/${key}`);
    remove(messageRef).then(() => console.log("Message deleted."));
  };

  useEffect(() => {
    const messagesRef = ref(database, "messages");
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const fetchedMessages = data
        ? Object.entries(data).map(([key, value]) => ({ key, ...value }))
        : [];
      setMessages(fetchedMessages);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="app-container">
      <header className="header">Chat App</header>
      <div className="chat-window">
        <div className="messages">
          {messages.map((msg) => (
            <div key={msg.key} className="message">
              <p className="message-text">{msg.text}</p>
              <button
                className="delete-btn"
                onClick={() => deleteMessage(msg.key)}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="message-input"
          />
          <button onClick={sendMessage} className="send-btn">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
