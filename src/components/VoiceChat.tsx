import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX, X, Send, Bot } from 'lucide-react';
import { useVoiceAI } from '@/hooks/useVoiceAI';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface VoiceChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceChat = ({ isOpen, onClose }: VoiceChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  
  const {
    isListening,
    isSpeaking,
    transcript,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    isSupported,
    volume,
  } = useVoiceAI();

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle transcript changes
  useEffect(() => {
    if (transcript && !isListening) {
      handleSendMessage(transcript);
    }
  }, [isListening, transcript]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsProcessing(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
        },
      });

      if (error) throw error;

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message || 'I apologize, I encountered an error.',
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Auto-speak response if enabled
      if (autoSpeak && assistantMessage.content) {
        speak(assistantMessage.content);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-2xl h-[80vh] glass-card rounded-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground">MindMesh AI</h3>
                <p className="text-xs text-muted-foreground">
                  {isListening ? 'Listening...' : isSpeaking ? 'Speaking...' : 'Voice-enabled assistant'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => setAutoSpeak(!autoSpeak)}
                className={`p-2 rounded-full transition-colors ${autoSpeak ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={autoSpeak ? 'Auto-speak enabled' : 'Auto-speak disabled'}
              >
                {autoSpeak ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </motion.button>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                  <Mic className="w-10 h-10 text-primary" />
                </div>
                <h4 className="font-display text-lg text-foreground mb-2">Voice AI Chat</h4>
                <p className="text-sm text-muted-foreground max-w-xs">
                  {isSupported 
                    ? 'Click the microphone to start speaking, or type your message below.'
                    : 'Voice input is not supported in your browser. You can still type messages.'}
                </p>
              </div>
            )}
            
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'glass-card rounded-bl-none'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  {message.role === 'assistant' && (
                    <button
                      onClick={() => speak(message.content)}
                      className="mt-2 text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                    >
                      <Volume2 className="w-3 h-3" />
                      Play
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
            
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="glass-card p-3 rounded-2xl rounded-bl-none">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Voice Visualizer */}
          {isListening && (
            <div className="px-4 py-2">
              <div className="flex items-center justify-center gap-1 h-12">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-primary rounded-full"
                    animate={{
                      height: Math.random() * volume * 48 + 4,
                    }}
                    transition={{ duration: 0.1 }}
                  />
                ))}
              </div>
              {transcript && (
                <p className="text-center text-sm text-muted-foreground mt-2">
                  "{transcript}"
                </p>
              )}
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3">
              <motion.button
                onClick={toggleListening}
                disabled={isSpeaking || !isSupported}
                className={`p-3 rounded-full transition-all ${
                  isListening 
                    ? 'bg-destructive text-destructive-foreground pulse-glow' 
                    : 'bg-primary/20 text-primary hover:bg-primary/30'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </motion.button>
              
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                placeholder="Type or speak your message..."
                className="flex-1 bg-muted rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                disabled={isProcessing || isListening}
              />
              
              <motion.button
                onClick={() => handleSendMessage(inputText)}
                disabled={!inputText.trim() || isProcessing}
                className="p-3 rounded-full bg-primary text-primary-foreground disabled:opacity-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
