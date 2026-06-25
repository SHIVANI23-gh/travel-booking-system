import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Compass } from 'lucide-react';
import { chatbotResponseTree } from '../data/mockData';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! I am your virtual travel companion from Sanchari Travels. How can I help you map out your next adventure today? You can ask about:\n- **Baggage Policy**\n- **How to Refund/Cancel**\n- **Current Hot Packages**\n- **Promotions**"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    // Add User Message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text
    };
    
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Process Bot Response after small delay
    setTimeout(() => {
      const normalizedText = text.toLowerCase();
      let responseText = "I'm sorry, I couldn't find a match for that query. You can ask about our 'refund policy', 'baggage allowances', 'package deals', or type 'SANCHARI25' to get our active discount code!";

      // Match trigger words
      for (const rule of chatbotResponseTree) {
        const matches = rule.triggers.some(trigger => normalizedText.includes(trigger));
        if (matches) {
          responseText = rule.response;
          break;
        }
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'bot',
        text: responseText
      }]);
    }, 600);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-widget">
      {/* Toggle Button */}
      {!isOpen && (
        <button className="chatbot-btn" onClick={() => setIsOpen(true)}>
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-agent-info">
              <div className="chatbot-avatar">
                <Compass size={18} />
              </div>
              <div>
                <div className="chatbot-name">Sanchari Assistant</div>
                <div className="chatbot-status">Online</div>
              </div>
            </div>
            <button className="chatbot-close-btn" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="chatbot-quick-replies">
            <button className="quick-reply-btn" onClick={() => handleSendMessage("What is your cancellation policy?")}>
              Refunds
            </button>
            <button className="quick-reply-btn" onClick={() => handleSendMessage("Baggage policy details")}>
              Baggage
            </button>
            <button className="quick-reply-btn" onClick={() => handleSendMessage("Show me tour packages")}>
              Hot Deals
            </button>
            <button className="quick-reply-btn" onClick={() => handleSendMessage("Active discount coupon")}>
              Promo Code
            </button>
          </div>

          {/* Input field */}
          <div className="chatbot-input-area">
            <input 
              type="text" 
              placeholder="Ask Sanchari anything..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button className="chatbot-send-btn" onClick={() => handleSendMessage()}>
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
