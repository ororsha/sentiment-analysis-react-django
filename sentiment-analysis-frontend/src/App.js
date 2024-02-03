import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ChatContainer = styled.div`
  max-width: 800px;
  width: 100%;
  margin: auto;
  padding: 20px;
  background-color: #2b3945; /* ChatGPT background color */
  border: 1px solid #536878; /* ChatGPT border color */
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
  background-color: ${(props) => (props.isuser === 'true' ? '#61afef' : '#282c34')};
  align-self: ${(props) => (props.isuser === 'true' ? 'flex-end' : 'flex-start')};
  color: #f8f8f2;

  /* Explicitly pass custom prop to child element */
  &[data-user='true'] {
    background-color: #61afef;
  }

  &[data-user='false'] {
    background-color: #282c34;
  }
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
      const responseText = response.data.response_text;

      setMessages([
        ...messages,
        { text: newMessage, isuser: 'true' },
        { text: `Sentiment: ${sentimentResult}`, isuser: 'false' },
        { text: responseText, isuser: 'false' },
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
          <ChatMessage key={index} data-user={index} isuser={message.isuser}>
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
