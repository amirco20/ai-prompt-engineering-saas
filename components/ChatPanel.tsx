import React, { useState, useRef, useEffect } from 'react'
import { PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/outline'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  score?: number
}

const ChatPanel: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI Prompt Engineering Assistant. I can help you craft, analyze, and optimize prompts for various AI models. What would you like to work on today?",
      timestamp: new Date(),
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue('')
    setIsTyping(true)

    // Call real API
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentInput }),
      })

      const data = await response.json()

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data.response,
        timestamp: new Date(),
        score: data.score,
      }

      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    } catch (error) {
      console.error('API Error:', error)
      
      // Fallback message if API fails
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Sorry, I encountered an error. Please check your API key configuration and try again.',
        timestamp: new Date(),
      }
      
      setMessages(prev => [...prev, errorMessage])
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickSuggestions = [
    "Analyze my prompt",
    "Improve effectiveness",
    "Convert for GPT-4",
    "Add examples"
  ]

  return (
    <div className="flex-1 flex flex-col bg-dark-primary/30 backdrop-blur-sm">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">AI Prompt Assistant</h2>
            <p className="text-sm text-gray-400">Craft and optimize your prompts</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="glass-card px-3 py-1">
              <span className="text-xs text-green-400">● Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="animate-slide-up">
            {message.type === 'user' ? (
              <div className="flex justify-end">
                <div className="chat-bubble-user">
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-start">
                <div className="chat-bubble-ai">
                  <div className="flex items-start space-x-2">
                    <SparklesIcon className="w-4 h-4 text-purple-primary mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      {message.score && (
                        <div className="mt-2 flex items-center space-x-2">
                          <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-primary to-blue-accent transition-all duration-500"
                              style={{ width: `${message.score}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-400">{message.score}/100</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="chat-bubble-ai">
              <div className="flex items-center space-x-2">
                <SparklesIcon className="w-4 h-4 text-purple-primary" />
                <span className="text-sm text-gray-400 loading-dots">Analyzing</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      <div className="px-6 py-2">
        <div className="flex flex-wrap gap-2">
          {quickSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setInputValue(suggestion)}
              className="px-3 py-1 text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-gray-300 hover:text-white transition-all duration-200"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-6 border-t border-white/10">
        <div className="glass-card p-4">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe your prompt or ask for help improving it..."
                className="w-full bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none text-sm"
                rows={3}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="gradient-btn p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPanel