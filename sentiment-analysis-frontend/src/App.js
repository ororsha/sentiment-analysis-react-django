import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';

// Global styles for the entire application
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #282a36; /* Palenight background color */
    color: #f8f8f2; /* Palenight text color */
  }
`;

const ChatContainer = styled.div`
  max-width: 800px;
  width: 100%;
  margin: auto;
  padding: 20px;
  background-color: #292d3e; /* Palenight background color */
  border: 1px solid #44475a; /* Palenight border color */
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 500px;
`;

const MessageContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const UserInputContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const UserInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #44475a; /* Palenight input border color */
  border-radius: 5px;
  background-color: #434758; /* Palenight input background color */
  color: #f8f8f2; /* Palenight text color */
`;

const SendButton = styled.button`
  background-color: #6272a4; /* Palenight button color */
  color: #f8f8f2; /* Palenight text color */
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ChatMessage = styled.div`
  max-width: 80%;
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) => (props.isUser ? '#61afef' : '#282c34')}; /* Palenight message colors */
  align-self: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
  color: #f8f8f2; /* Palenight text color */
`;

const App = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const messageContainerRef = useRef(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleUserInput = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSubmit = async () => {
    if (newMessage.trim() !== '') {
      try {
        const response = await axios.post(process.env.REACT_APP_API_ENDPOINT, {
          text: newMessage,
        });

        const sentimentResult = response.data.result;
        setMessages([
          ...messages,
          { text: newMessage, isUser: true },
          { text: `Sentiment: ${sentimentResult}`, isUser: false },
        ]);
      } catch (error) {
        console.error('Error analyzing sentiment:', error);
      }
      setNewMessage('');
    }
  };

  return (
    <ChatContainer>
      <MessageContainer ref={messageContainerRef}>
        {messages.map((message, index) => (
          <ChatMessage key={index} isUser={message.isUser}>
            {message.text}
          </ChatMessage>
        ))}
      </MessageContainer>

      {/* Input field and Send button */}
      <UserInputContainer>
        <UserInput
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={handleUserInput}
        />
        <SendButton onClick={handleSubmit}>Send</SendButton>
      </UserInputContainer>
    </ChatContainer>
  );
};

export default App;
