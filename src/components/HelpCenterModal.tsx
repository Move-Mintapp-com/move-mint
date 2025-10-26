import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { HelpCircle, MessageCircle, Send, Bot, User, ChevronRight } from 'lucide-react';

interface HelpCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpCenterModal({ isOpen, onClose }: HelpCenterModalProps) {
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{
    id: number;
    type: 'user' | 'ai';
    message: string;
    timestamp: Date;
  }>>([
    {
      id: 1,
      type: 'ai',
      message: 'Hi! I\'m your Move - Mint AI assistant. How can I help you today? 🚶‍♂️',
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Track if waiting for fitness goal info
  const [waitingForFitnessInfo, setWaitingForFitnessInfo] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const commonQuestions = [
    {
      question: "How many steps should I take per day?",
      answer: "Let me help you find your personalized step goal based on your health profile!"
    },
    {
      question: "How do I earn points?",
      answer: "You earn 1 BD point for every 10 steps you take. Connect your wearable device or use your phone's step counter to automatically track your activity."
    },
    {
      question: "How do I redeem rewards?",
      answer: "Go to the Shop tab, select an offer you like, and tap 'Redeem Now' if you have enough points. You'll get a unique code to use at the partner store."
    },
    {
      question: "Can I connect my fitness tracker?",
      answer: "Yes! We support Apple Watch, Fitbit, WHOOP, and Oura Ring. Go to Profile > Device Connections to sync your device."
    },
    {
      question: "How does the friends leaderboard work?",
      answer: "Add friends in the Leaderboard tab to compete on daily and weekly step counts. It's a fun way to stay motivated together!"
    },
    {
      question: "What if I lose my redeem code?",
      answer: "Don't worry! All your redeemed offers are saved in your Profile under 'My Rewards' with their codes and expiry dates."
    }
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(), // Use timestamp for unique ID
      type: 'user' as const,
      message: message.trim(),
      timestamp: new Date()
    };

    const userMessageText = message.trim();
    setMessage(''); // Clear input immediately

    // Add user message
    setChatHistory(prev => [...prev, userMessage]);

    // Simulate AI response with a slight delay
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai' as const,
        message: generateAIResponse(userMessageText),
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const parseUserInfo = (message: string): { age?: number; height?: number; weight?: number; gender?: 'male' | 'female' } | null => {
    const msg = message.toLowerCase();
    
    // Extract numbers from the message
    const numbers = message.match(/\d+/g);
    if (!numbers || numbers.length < 3) return null;
    
    // Determine gender
    let gender: 'male' | 'female' | undefined;
    if (msg.includes('male') && !msg.includes('female')) {
      gender = 'male';
    } else if (msg.includes('female')) {
      gender = 'female';
    } else if (msg.includes('m') && !msg.includes('f')) {
      gender = 'male';
    } else if (msg.includes('f')) {
      gender = 'female';
    }
    
    // Parse numbers - assume format: age, height, weight
    const age = parseInt(numbers[0]);
    const height = parseInt(numbers[1]);
    const weight = parseInt(numbers[2]);
    
    // Validate ranges
    if (age < 5 || age > 120) return null;
    if (height < 100 || height > 250) return null;
    if (weight < 30 || weight > 300) return null;
    if (!gender) return null;
    
    return { age, height, weight, gender };
  };

  const generateAIResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    // Handle fitness info response
    if (waitingForFitnessInfo) {
      const userInfo = parseUserInfo(userMessage);
      
      if (!userInfo) {
        return "I didn't quite get all the info. Please tell me your age, height (in cm), weight (in kg), and gender. For example: '25, 175cm, 80kg, male'";
      }
      
      // Calculate BMI
      const heightInMeters = userInfo.height! / 100;
      const bmi = userInfo.weight! / (heightInMeters * heightInMeters);
      const bmiRounded = bmi.toFixed(1);
      
      // Determine step recommendation based on BMI
      let stepRange = '';
      
      if (bmi < 18.5) {
        stepRange = '6,000–8,000';
      } else if (bmi >= 18.5 && bmi < 25) {
        stepRange = '8,000–10,000';
      } else {
        stepRange = '10,000–12,000';
      }
      
      // Reset waiting state
      setWaitingForFitnessInfo(false);
      
      return `Thanks! Based on your info, your BMI is ${bmiRounded}, so a great goal for you is around ${stepRange} steps per day. Start small and increase weekly for best results! 💪🚶‍♂️`;
    }
    
    // Check if user is asking about daily step goal or how to set fitness goal
    if ((msg.includes('how many steps') || msg.includes('how many step') || (msg.includes('set') && msg.includes('goal')) || msg.includes('fitness goal')) && 
        (msg.includes('should') || msg.includes('per day') || msg.includes('daily') || msg.includes('recommend'))) {
      setWaitingForFitnessInfo(true);
      return "Sure! To personalize your goal, can you tell me your age, height, weight, and gender? For example: '25, 175cm, 80kg, male'";
    }
    
    // Fitness goals and steps (general advice - only if not asking for personalized goal)
    if ((msg.includes('steps') || msg.includes('goal') || msg.includes('fitness') || msg.includes('walk')) && 
        !msg.includes('how many') && !msg.includes('should i')) {
      return "Most people aim for around 10,000 steps per day, but if you're just starting out, 5,000 steps is a great goal! You can increase gradually as you build momentum. Remember, every step counts! 💪🚶‍♂️";
    }
    
    // Points and earning
    if (msg.includes('point') || msg.includes('earn') || msg.includes('reward')) {
      return "You earn points by walking! Every step you take gets you closer to awesome rewards. Just keep walking and watch your points grow. Head to the Shop tab to see what you can redeem! 🎁";
    }
    
    // Shop and redeeming
    if (msg.includes('redeem') || msg.includes('shop') || msg.includes('use') && msg.includes('point')) {
      return "Go to the Shop tab, pick an offer you like, and tap 'Redeem Now'. You'll get a unique code to show at the partner store. It's that easy! 🛍️";
    }
    
    // Leaderboard
    if (msg.includes('leaderboard') || msg.includes('rank') || msg.includes('compete')) {
      return "The Leaderboard lets you see how you stack up against friends and other walkers in Bahrain! It's a fun way to stay motivated. Friendly competition keeps you moving! 🏆";
    }
    
    // Friends
    if (msg.includes('friend') || msg.includes('add') && (msg.includes('people') || msg.includes('user'))) {
      return "Add friends in the Leaderboard tab to compete together! Working out with friends makes it more fun and keeps you accountable. Tap the '+' button to get started! 👥";
    }
    
    // Partner locations
    if (msg.includes('partner') || msg.includes('location') || msg.includes('store') || msg.includes('sponsor')) {
      return "Our partner locations are shops and gyms around Bahrain where you can redeem your rewards. Check the Shop tab to see all available offers and their locations! 📍";
    }
    
    // Device connection
    if (msg.includes('device') || msg.includes('connect') || msg.includes('tracker') || msg.includes('watch') || msg.includes('fitbit')) {
      return "You can connect your Apple Watch, Fitbit, WHOOP, or Oura Ring! Go to Profile > Device Connections to sync. Your steps will automatically count towards rewards! ⌚";
    }
    
    // Progress tracking
    if (msg.includes('progress') || msg.includes('track') || msg.includes('history')) {
      return "Check the Progress tab to see your walking history, weekly stats, and explore the Bahrain map showing where you've walked! It's super motivating to see how far you've come! 📊";
    }
    
    // Calories
    if (msg.includes('calorie') || msg.includes('burn')) {
      return "Great question! You burn approximately 35 calories per 1,000 steps. You can see your daily calories burned on the home screen. Keep it up! 🔥";
    }
    
    // Map feature
    if (msg.includes('map') || msg.includes('bahrain') && msg.includes('walk')) {
      return "The Bahrain Map in the Progress tab shows where you've walked around the country! As you explore different areas, they light up on the map. Pretty cool, right? 🗺️";
    }
    
    // How to use app / getting started
    if (msg.includes('how') && (msg.includes('use') || msg.includes('work') || msg.includes('start'))) {
      return "Move - Mint is simple! Just walk, earn points, and redeem rewards at partner stores. Your phone or fitness tracker counts your steps automatically. The more you move, the more you earn! 🎯";
    }
    
    // Motivation and encouragement
    if (msg.includes('motivat') || msg.includes('tired') || msg.includes('lazy') || msg.includes('hard')) {
      return "You've got this! Every step is progress, no matter how small. Start with just a 5-minute walk today. Small wins lead to big results! I believe in you! 💪✨";
    }
    
    // Default response for unclear questions
    return "I'm not sure I understood that — could you please rephrase it? I'm here to help with anything about the app or your fitness goals! 😊";
  };

  const handleQuestionClick = (question: string) => {
    setMessage(question);
    setShowChat(true);
    handleSendMessage();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[90%] max-w-md mx-auto bg-card border-border shadow-2xl backdrop-blur-none h-[80vh] max-h-[80vh] flex flex-col overflow-hidden">
        <DialogHeader className="text-left pb-4 border-b border-border">
          <DialogTitle className="text-xl text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" />
            Help Center
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2 text-sm text-muted-foreground">
            <Bot className="w-4 h-4 text-primary" />
            AI-Powered Support
          </DialogDescription>
        </DialogHeader>

        {!showChat ? (
          <div className="flex-1 overflow-y-auto space-y-4">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => setShowChat(true)}
                className="h-auto p-4 flex flex-col items-center gap-2 border-border hover:bg-accent"
              >
                <MessageCircle className="w-6 h-6 text-primary" />
                <span className="text-sm">AI Chat</span>
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="h-auto p-4 flex flex-col items-center gap-2 border-border hover:bg-accent"
              >
                <HelpCircle className="w-6 h-6 text-secondary" />
                <span className="text-sm">Contact Us</span>
              </Button>
            </div>

            {/* Common Questions */}
            <div>
              <h3 className="text-white mb-3 flex items-center gap-2">
                <span>Frequently Asked Questions</span>
                <Badge variant="secondary" className="text-xs">Popular</Badge>
              </h3>
              <div className="space-y-2">
                {commonQuestions.map((item, index) => (
                  <Card 
                    key={index}
                    className="p-3 border-border/50 bg-card/50 backdrop-blur-sm cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => handleQuestionClick(item.question)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white">{item.question}</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                <span className="text-white">AI Assistant</span>
                <Badge className="text-xs bg-green-500/20 text-green-400 border-green-400/30">
                  Online
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChat(false)}
                className="text-muted-foreground hover:text-white"
              >
                Back
              </Button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 min-h-0 overflow-y-auto py-4 space-y-3 max-h-[50vh]">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  className={`flex gap-3 ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {chat.type === 'ai' && (
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] p-3 rounded-lg ${
                      chat.type === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-muted/20 text-white border border-border/50'
                    }`}
                  >
                    <p className="text-sm">{chat.message}</p>
                    <div className="text-xs opacity-70 mt-1">
                      {chat.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  {chat.type === 'user' && (
                    <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-secondary" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="border-t border-border pt-3">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me anything about Move - Mint..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  size="icon"
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
