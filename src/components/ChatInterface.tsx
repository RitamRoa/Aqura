
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Language, translate } from '@/utils/languageUtils';
import { getChatbotSuggestions } from '@/utils/mockData';
import { 
  Droplet, 
  Send, 
  MapPin, 
  MessageCircle, 
  HelpCircle, 
  List,
  Map as MapIcon,
  CloudRain,
  Clock
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isTyping?: boolean;
  suggestedActions?: Array<{
    text: string;
    action: string;
  }>;
}

interface QuickReply {
  id: string;
  text: string;
  action: string;
  icon: React.ReactNode;
  colorClass: string;
}

interface ChatInterfaceProps {
  language: Language;
  onSelectTab: (tab: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ language, onSelectTab }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const quickReplies: QuickReply[] = [
    { 
      id: 'report', 
      text: translate('reportIssue', language), 
      action: 'report',
      icon: <MapPin className="h-4 w-4" />,
      colorClass: 'bg-coral-light hover:bg-coral text-white'
    },
    { 
      id: 'track', 
      text: translate('myReports', language), 
      action: 'reports',
      icon: <List className="h-4 w-4" />,
      colorClass: 'bg-sunrise-light hover:bg-sunrise text-gray-800'
    },
    { 
      id: 'map', 
      text: translate('mapView', language), 
      action: 'map',
      icon: <MapIcon className="h-4 w-4" />,
      colorClass: 'bg-teal-light hover:bg-teal text-gray-800'
    },
    { 
      id: 'help', 
      text: translate('getHelp', language), 
      action: 'help',
      icon: <HelpCircle className="h-4 w-4" />,
      colorClass: 'bg-lavender-light hover:bg-lavender text-gray-800'
    }
  ];

  useEffect(() => {
    // Show welcome message on first visit
    const welcomed = localStorage.getItem('welcomed');
    if (!welcomed && !hasSeenWelcome) {
      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        text: translate('welcomeMessage', language),
        sender: 'bot',
        timestamp: new Date(),
        suggestedActions: [
          {
            text: translate('reportIssue', language),
            action: 'report'
          },
          {
            text: translate('waterStatus', language),
            action: 'status'
          }
        ]
      };
      setMessages([welcomeMessage]);
      localStorage.setItem('welcomed', 'true');
      setHasSeenWelcome(true);
    }
  }, [language, hasSeenWelcome]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Update messages when language changes
  useEffect(() => {
    // Translate bot messages when language changes
    if (messages.length > 0) {
      setMessages(prevMessages => 
        prevMessages.map(msg => {
          if (msg.sender === 'bot' && msg.text === translate('welcomeMessage', 'en')) {
            return {
              ...msg,
              text: translate('welcomeMessage', language),
              suggestedActions: msg.suggestedActions?.map(action => ({
                ...action,
                text: translate(action.action === 'report' ? 'reportIssue' : 'waterStatus', language)
              }))
            };
          }
          return msg;
        })
      );
    }
  }, [language]);

  const handleQuickReply = (reply: QuickReply) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: reply.text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate bot response with appropriate language
    setTimeout(() => {
      let responseText = '';
      
      switch(language) {
        case 'hi':
          responseText = `मैं आपको ${reply.text.toLowerCase()} में मदद करूंगा। आपको सही सेक्शन पर ले जाता हूं।`;
          break;
        case 'kn':
          responseText = `ನಾನು ನಿಮಗೆ ${reply.text.toLowerCase()} ಸಹಾಯ ಮಾಡುತ್ತೇನೆ. ನಾನು ನಿಮ್ಮನ್ನು ಸರಿಯಾದ ವಿಭಾಗಕ್ಕೆ ಕರೆದೊಯ್ಯುತ್ತೇನೆ.`;
          break;
        default:
          responseText = `I'll help you with ${reply.text.toLowerCase()}. Let me take you to the right section.`;
      }
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
      onSelectTab(reply.action);
    }, 800);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // First show typing indicator
    setTimeout(() => {
      // Then simulate bot response with natural language
      let responseText = '';
      
      // Generate different responses based on language
      if (inputValue.toLowerCase().includes('water') || 
          inputValue.toLowerCase().includes('पानी') ||
          inputValue.toLowerCase().includes('ನೀರು')) {
        
        switch(language) {
          case 'hi':
            responseText = 'आपके क्षेत्र में जल की स्थिति के बारे में अधिक जानकारी चाहते हैं? कृपया अपना स्थान साझा करें या अपना पिनकोड बताएं।';
            break;
          case 'kn':
            responseText = 'ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ ನೀರಿನ ಸ್ಥಿತಿಯ ಬಗ್ಗೆ ಹೆಚ್ಚಿನ ಮಾಹಿತಿ ಬೇಕೇ? ದಯವಿಟ್ಟು ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ ಅಥವಾ ನಿಮ್ಮ ಪಿನ್‌ಕೋಡ್ ಅನ್ನು ನಮಗೆ ತಿಳಿಸಿ.';
            break;
          default:
            responseText = 'Would you like to know more about the water situation in your area? Please share your location or tell us your pincode.';
        }
      } else if (inputValue.toLowerCase().includes('help') || 
                inputValue.toLowerCase().includes('मदद') ||
                inputValue.toLowerCase().includes('ಸಹಾಯ')) {
        
        switch(language) {
          case 'hi':
            responseText = 'आपको किस प्रकार की सहायता चाहिए? क्या आप पानी की समस्या की रिपोर्ट करना चाहते हैं या जल संबंधित आपातकालीन सहायता चाहिए?';
            break;
          case 'kn':
            responseText = 'ನಿಮಗೆ ಯಾವ ರೀತಿಯ ಸಹಾಯ ಬೇಕು? ನೀವು ನೀರಿನ ಸಮಸ್ಯೆಯನ್ನು ವರದಿ ಮಾಡಲು ಬಯಸುತ್ತೀರಾ ಅಥವಾ ನೀರಿಗೆ ಸಂಬಂಧಿಸಿದ ತುರ್ತು ಸಹಾಯ ಬೇಕೇ?';
            break;
          default:
            responseText = 'What kind of assistance do you need? Would you like to report a water issue or do you need water-related emergency help?';
        }
      } else {
        switch(language) {
          case 'hi':
            responseText = 'मैं आपकी जल संबंधित चिंताओं के साथ आज कैसे मदद कर सकता हूं? कृपया अधिक विशिष्ट विवरण प्रदान करें या एक श्रेणी चुनें।';
            break;
          case 'kn':
            responseText = 'ನಾನು ನಿಮಗೆ ನೀರಿಗೆ ಸಂಬಂಧಿಸಿದ ಕಾಳಜಿಗಳೊಂದಿಗೆ ಇಂದು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು? ದಯವಿಟ್ಟು ಹೆಚ್ಚಿನ ನಿರ್ದಿಷ್ಟ ವಿವರಗಳನ್ನು ಒದಗಿಸಿ ಅಥವಾ ವಿಭಾಗವನ್ನು ಆರಿಸಿ.';
            break;
          default:
            responseText = 'How can I assist you with water-related concerns today? Please provide more specific details or choose a category.';
        }
      }
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1200);
  };

  const handleSuggestedAction = (action: string) => {
    onSelectTab(action);
  };

  const handleShareLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationMessage = {
            en: `Location shared: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`,
            hi: `स्थान साझा किया गया: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`,
            kn: `ಸ್ಥಳವನ್ನು ಹಂಚಿಕೊಳ್ಳಲಾಗಿದೆ: ${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`
          };
          
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            text: locationMessage[language],
            sender: 'user',
            timestamp: new Date()
          }]);
          
          toast({
            title: translate('locationShared', language) || "Location shared successfully",
            description: translate('locationHelp', language) || "We'll use this to help you better."
          });
          
          // Simulate bot response
          setIsLoading(true);
          setTimeout(() => {
            const nearbyText = {
              en: `Thank you for sharing your location! I can see you're in Bangalore. The nearest BWSSB office is 2.3km away at MG Road. Would you like to view it on the map?`,
              hi: `अपना स्थान साझा करने के लिए धन्यवाद! मैं देख सकता हूं कि आप बैंगलोर में हैं। निकटतम BWSSB कार्यालय MG रोड पर 2.3 किमी दूर है। क्या आप इसे मानचित्र पर देखना चाहेंगे?`,
              kn: `ನಿಮ್ಮ ಸ್ಥಳವನ್ನು ಹಂಚಿಕೊಂಡಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು! ನೀವು ಬೆಂಗಳೂರಿನಲ್ಲಿ ಇರುವುದನ್ನು ನಾನು ನೋಡಬಹುದು. ಹತ್ತಿರದ BWSSB ಕಚೇರಿಯು MG ರಸ್ತೆಯಲ್ಲಿ 2.3 ಕಿಮೀ ದೂರದಲ್ಲಿದೆ. ನಕ್ಷೆಯಲ್ಲಿ ಇದನ್ನು ನೋಡಲು ಬಯಸುವಿರಾ?`
            };
            
            setMessages(prev => [...prev, {
              id: Date.now().toString(),
              text: nearbyText[language],
              sender: 'bot',
              timestamp: new Date(),
              suggestedActions: [
                {
                  text: translate('mapView', language) || 'View Map',
                  action: 'map'
                }
              ]
            }]);
            setIsLoading(false);
          }, 1000);
        },
        () => {
          toast({
            variant: "destructive",
            title: translate('locationFailed', language) || "Could not access location",
            description: translate('enableLocation', language) || "Please enable location services to share your location."
          });
        }
      );
    }
  };

  return (
    <div className="flex flex-col h-[500px] border rounded-lg bg-white shadow-lg card-hover-effect animate-fade-in">
      <div className="p-4 bg-gradient-to-r from-coral to-lavender text-white rounded-t-lg flex items-center">
        <Droplet className="mr-2 animated-icon text-teal-light" size={20} />
        <h3 className="text-lg font-medium">
          {translate('chatWithBot', language) || translate('appName', language)}
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            } animate-fade-slide-up`}
            style={{ animationDelay: '0.1s' }}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-teal to-teal-dark text-white rounded-tr-none'
                  : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 rounded-tl-none'
              } animate-scale-in shadow-sm`}
            >
              <div className="mb-1">{message.text}</div>
              
              {/* Timestamp */}
              <div className="text-xs opacity-70 flex items-center justify-end mt-1">
                <Clock size={10} className="mr-1" />
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              
              {/* Suggested actions */}
              {message.suggestedActions && message.suggestedActions.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {message.suggestedActions.map((action, i) => (
                    <Button 
                      key={i} 
                      size="sm" 
                      variant="outline"
                      className="bg-white/90 hover:bg-white text-teal-dark border-teal-light/30 hover:border-teal animate-fade-in"
                      onClick={() => handleSuggestedAction(action.action)}
                    >
                      {action.text}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 rounded-lg p-3 rounded-tl-none flex items-center space-x-2 animate-pulse">
              <div className="h-2 w-2 bg-teal rounded-full"></div>
              <div className="h-2 w-2 bg-teal-light rounded-full animate-bounce-subtle" style={{ animationDelay: '0.2s' }}></div>
              <div className="h-2 w-2 bg-teal-dark rounded-full animate-bounce-subtle" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        
        {/* Invisible element to scroll to */}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t bg-gray-50/50">
        <div className="flex flex-wrap gap-2 mb-3">
          {quickReplies.map((reply) => (
            <Button
              key={reply.id}
              variant="outline"
              size="sm"
              onClick={() => handleQuickReply(reply)}
              className={`${reply.colorClass} shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in`}
              style={{ animationDelay: `${parseInt(reply.id) * 100}ms` }}
            >
              {reply.icon}
              <span className="ml-2">{reply.text}</span>
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleShareLocation}
            className="bg-gradient-to-r from-teal-light to-teal text-white hover:opacity-90 border-none shadow-sm"
          >
            <MapPin className="h-4 w-4 animated-icon" />
          </Button>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={translate('chatPlaceholder', language)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 border-gray-200 focus:border-teal-light focus:ring-teal-light/30"
          />
          <Button 
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-coral to-sunrise text-white hover:opacity-90 transition-all duration-200 shadow-sm"
          >
            <Send size={18} className="mr-1 animated-icon" />
            {translate('send', language)}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
