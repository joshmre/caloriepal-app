"use client"
import React, { useState, useEffect } from 'react';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: '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', dangerouslyAllowBrowser: true });

const CalorieAssistant = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [initialResponseFetched, setInitialResponseFetched] = useState(false); // New state variable

  useEffect(() => {
    console.log('Inside useEffect: initialResponseFetched is', initialResponseFetched);

    async function fetchInitialChatbotResponse() {
      try {
        const completion = await openai.chat.completions.create({
          messages: [{ role: 'system', content: 'You are a chatbot that helps users find out the amount of calories in their meal. They will give you the drinks/food in their meal, and you will return the estimated calories for each, along with the amount of calories for the whole meal. Start off asking the user to input their meal, and give them an example of what they can ask you.' }],
          model: 'gpt-3.5-turbo',
        });
        console.log("completion.choices[0].message.content = ", completion.choices[0].message.content)
        setChatHistory([...chatHistory, { role: 'system', content: completion.choices[0].message.content }]);
        setInitialResponseFetched(true); // Set the state to indicate initial response fetched
      } catch (error) {
        console.error('Error fetching initial chatbot response:', error);
      }
    }

    if (!initialResponseFetched) { // Fetch initial chatbot response only if not fetched yet
      console.log('Fetching initial chatbot response...');
      fetchInitialChatbotResponse();
    } else {
      console.log('Initial response already fetched, skipping fetch...');
    }
  }, []); // Effect depends on initialResponseFetched state


  const handleChatResponse = (response) => {
    console.log("calling handle chat response")
    console.log('Handling chat response:', response);
    console.log('Chat History:', chatHistory)
    setChatHistory((prevChat) => [...prevChat, { role: 'system', content: response }]);
  };

  const handleUserMessage = async () => {
    if (inputMessage.trim() === '') return;

    console.log('User sent message:', inputMessage);

    setChatHistory((prevChat) => [...prevChat, { role: 'user', content: inputMessage }]);
    setInputMessage('');

    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: inputMessage + "Provide the user with the estimated calories for each food/drink item in their meal, along with the total calories of their meal. If the message doesn't pertain to meals, prompt the user to input their meal so you can provide the estimated calorie count. If a specified type or other ingrediants is needed, just give a range of estimates for that type. Just give an average of what that food item might look like in calorie count."  }],
        model: 'gpt-3.5-turbo',
      });
      console.log('AI response:', completion.choices[0].message.content);
      handleChatResponse(completion.choices[0].message.content);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-5xl font-bold mb-10">
          AI <span className="text-[#3da54b]"> Assistant</span>
        </h1>
    <div className="chat-container">
      <div className="chat-history">
        {chatHistory.map((message, index) => (
          <div key={index} className={`chat-message ${message.role}`}>
            {message.content}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleUserMessage}>Send</button>
      </div>
    </div>
    </main>
  );
};

export default CalorieAssistant;