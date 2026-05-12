import React, { useState, useRef, useEffect } from 'react';
import styles from './GeminiChat.module.css';
import { askGemini } from '../../utils/gemini';
import { MessageSquare, X, Sparkles, Send, Loader2 } from 'lucide-react';

export default function GeminiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasApiKey] = useState(!!import.meta.env.VITE_GEMINI_API_KEY);
  
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    "What's Raj's strongest skill?",
    "Tell me about LangChat project",
    "Is Raj available for hiring?",
    "What is Raj learning now?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text) => {
    if (!text.trim()) return;
    if (!hasApiKey) {
      setMessages(prev => [...prev, 
        { role: 'user', content: text },
        { role: 'model', content: "Please configure VITE_GEMINI_API_KEY in the .env file to enable AI responses." }
      ]);
      return;
    }

    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setInputMsg('');
    setIsTyping(true);

    try {
      // Create a temporary model message
      setMessages(prev => [...prev, { role: 'model', content: '' }]);
      
      const stream = await askGemini(text, newMessages.slice(0, -1)); // Pass history without current
      
      let fullResponse = '';
      for await (const chunk of stream) {
        const chunkText = chunk.text();
        fullResponse += chunkText;
        
        // Update the last message in state with new chunk
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].content = fullResponse;
          return updated;
        });
      }
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1].content = "Sorry, I'm having trouble connecting right now. Please try again later.";
        return updated;
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputMsg);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        className={`${styles.toggleBtn} ${isOpen ? styles.hidden : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <Sparkles size={20} />
        <span className={styles.toggleText}>Ask about Raj</span>
      </button>

      {/* Chat Panel */}
      <div className={`${styles.chatPanel} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <div className={styles.headerInfo}>
            <Sparkles size={18} className={styles.accentIcon} />
            <h4>AI Assistant</h4>
          </div>
          <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.messagesArea}>
          {messages.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.avatarWrapper}>
                <Sparkles size={24} className={styles.accentIcon} />
              </div>
              <p>Hi! I'm an AI assistant trained on Raj's portfolio. Ask me anything.</p>
              
              <div className={styles.suggestions}>
                {suggestedQuestions.map((q, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => handleSend(q)}
                    className={styles.suggestBtn}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div key={idx} className={`${styles.message} ${msg.role === 'user' ? styles.userMsg : styles.modelMsg}`}>
              <div className={styles.msgContent}>{msg.content}</div>
            </div>
          ))}
          
          {isTyping && (
            <div className={`${styles.message} ${styles.modelMsg}`}>
              <div className={styles.msgContent}>
                <div className={styles.typingIndicator}>
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.inputArea}>
          <textarea
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows="1"
          />
          <button 
            onClick={() => handleSend(inputMsg)}
            disabled={!inputMsg.trim() || isTyping}
            className={styles.sendBtn}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </>
  );
}
