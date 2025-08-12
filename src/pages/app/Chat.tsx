import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  IconButton,
  Chip,
  Stack,
  Avatar,
  Divider,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Alert,
  CircularProgress,
  useTheme,
} from '@mui/material';
import {
  Send,
  Mic,
  MicOff,
  VolumeUp,
  VolumeOff,
  Lightbulb,
  Timeline,
  ShowChart,
  SelfImprovement,
  Info as QuickFacts,
} from '@mui/icons-material';
import { useUser } from '../../contexts/UserContext';
import { useAnalytics } from '../../contexts/AnalyticsContext';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  steps?: {
    mirror?: string;
    normalize?: string;
    offer?: string;
  };
  culturalNotes?: string[];
  suggestions?: string[];
  ttsUrl?: string;
}

interface ChatState {
  messages: Message[];
  isTyping: boolean;
  isRecording: boolean;
  quickFactsMode: boolean;
  tone: 'nurturing' | 'calm' | 'pragmatic';
}

const Chat: React.FC = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [
      {
        id: '1',
        type: 'assistant',
        content: "Hi there! I'm Lara, your AI companion for this journey. How are you feeling today?",
        timestamp: new Date(),
        steps: {
          mirror: "I hear you're here for support",
          normalize: "It's completely normal to seek guidance during this phase",
          offer: "I'm here to listen and help you understand what you're experiencing",
        },
      },
    ],
    isTyping: false,
    isRecording: false,
    quickFactsMode: false,
    tone: 'nurturing',
  });

  const [inputValue, setInputValue] = useState('');
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { preferences } = useUser();
  const { trackChat } = useAnalytics();
  const theme = useTheme();

  const quickIntents = [
    { label: 'Quick Facts', icon: QuickFacts, action: 'quick_facts' },
    { label: 'Track This', icon: Timeline, action: 'track' },
    { label: 'Show Pattern', icon: ShowChart, action: 'pattern' },
    { label: 'Breathing Exercise', icon: SelfImprovement, action: 'breathing' },
  ];

  const culturalTerms = {
    'nervios': 'A cultural term for anxiety or stress, often used in Latinx communities',
    'hot flash': 'Sudden feeling of warmth, often accompanied by sweating and flushing',
    'brain fog': 'Difficulty concentrating or thinking clearly',
    'night sweats': 'Excessive sweating during sleep',
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isTyping: true,
    }));

    setInputValue('');
    trackChat('send');

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateResponse(inputValue),
        timestamp: new Date(),
        steps: chatState.quickFactsMode ? undefined : {
          mirror: "I understand you're experiencing this",
          normalize: "This is a common experience during menopause",
          offer: "Here are some strategies that might help...",
        },
        culturalNotes: extractCulturalTerms(inputValue),
        suggestions: ['Try tracking this in your daily log', 'Consider discussing with your healthcare provider'],
        ttsUrl: preferences.voiceEnabled ? '/api/tts/sample.mp3' : undefined,
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isTyping: false,
      }));

      trackChat('turn_received');
    }, 2000);
  };

  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('hot flash')) {
      return "I hear you're dealing with hot flashes. These can be really disruptive to daily life. Many women find relief through lifestyle changes like avoiding triggers, staying cool, and managing stress. Would you like to track your hot flashes to identify patterns?";
    }
    
    if (lowerInput.includes('sleep') || lowerInput.includes('insomnia')) {
      return "Sleep disturbances are very common during this phase. Your body is going through significant hormonal changes that can affect your sleep cycle. Have you noticed any patterns with your sleep quality?";
    }
    
    if (lowerInput.includes('mood') || lowerInput.includes('anxiety')) {
      return "Mood changes and anxiety are completely normal during menopause. Hormonal fluctuations can really impact how you feel emotionally. What's been most challenging for you lately?";
    }
    
    return "Thank you for sharing that with me. I'm here to support you through this journey. Is there anything specific you'd like to explore or track?";
  };

  const extractCulturalTerms = (input: string): string[] => {
    const terms: string[] = [];
    Object.keys(culturalTerms).forEach(term => {
      if (input.toLowerCase().includes(term)) {
        terms.push(term);
      }
    });
    return terms;
  };

  const handleQuickIntent = (action: string) => {
    let message = '';
    switch (action) {
      case 'quick_facts':
        message = 'Tell me about hot flashes';
        setChatState(prev => ({ ...prev, quickFactsMode: true }));
        break;
      case 'track':
        message = 'I want to track my symptoms';
        break;
      case 'pattern':
        message = 'Show me my patterns';
        break;
      case 'breathing':
        message = 'Guide me through a breathing exercise';
        break;
    }
    
    setInputValue(message);
    trackChat('quick_facts_used');
  };

  const handleVoiceToggle = () => {
    setChatState(prev => ({ ...prev, isRecording: !prev.isRecording }));
  };

  const handleToneChange = (tone: 'nurturing' | 'calm' | 'pragmatic') => {
    setChatState(prev => ({ ...prev, tone }));
  };

  const handlePlayTTS = (messageId: string) => {
    setIsPlaying(messageId);
    // Simulate TTS playback
    setTimeout(() => setIsPlaying(null), 3000);
  };

  const renderMessage = (message: Message) => {
    const isUser = message.type === 'user';
    
    return (
      <Box
        key={message.id}
        sx={{
          display: 'flex',
          justifyContent: isUser ? 'flex-end' : 'flex-start',
          mb: 2,
        }}
      >
        <Box
          sx={{
            maxWidth: '70%',
            display: 'flex',
            flexDirection: isUser ? 'row-reverse' : 'row',
            alignItems: 'flex-start',
            gap: 1,
          }}
        >
          {!isUser && (
            <Avatar
              sx={{
                bgcolor: theme.palette.primary.main,
                width: 32,
                height: 32,
              }}
            >
              L
            </Avatar>
          )}
          
          <Card
            sx={{
              bgcolor: isUser ? 'primary.main' : 'background.paper',
              color: isUser ? 'white' : 'text.primary',
              borderRadius: 3,
              boxShadow: 2,
            }}
          >
            <CardContent sx={{ p: 2, pb: 1 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {message.content}
              </Typography>
              
              {message.steps && !chatState.quickFactsMode && (
                <Box sx={{ mt: 2 }}>
                  <Divider sx={{ mb: 1 }} />
                  <Typography variant="caption" color="text.secondary" display="block">
                    Mirror: {message.steps.mirror}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Normalize: {message.steps.normalize}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Offer: {message.steps.offer}
                  </Typography>
                </Box>
              )}
              
              {message.culturalNotes && message.culturalNotes.length > 0 && (
                <Box sx={{ mt: 1 }}>
                  {message.culturalNotes.map((term, index) => (
                    <Chip
                      key={index}
                      label={term}
                      size="small"
                      variant="outlined"
                      sx={{ mr: 0.5, mb: 0.5 }}
                      title={culturalTerms[term as keyof typeof culturalTerms]}
                    />
                  ))}
                </Box>
              )}
              
              {message.suggestions && (
                <Box sx={{ mt: 1 }}>
                  {message.suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      size="small"
                      variant="outlined"
                      sx={{ mr: 1, mb: 0.5 }}
                      onClick={() => trackChat('save_to_tracker')}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
          
          {!isUser && message.ttsUrl && preferences.voiceEnabled && (
            <IconButton
              size="small"
              onClick={() => handlePlayTTS(message.id)}
              disabled={isPlaying === message.id}
            >
              {isPlaying === message.id ? (
                <CircularProgress size={16} />
              ) : (
                <VolumeUp fontSize="small" />
              )}
            </IconButton>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" fontWeight="bold">
          Chat with Lara
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Tone</InputLabel>
            <Select
              value={chatState.tone}
              label="Tone"
              onChange={(e) => handleToneChange(e.target.value as 'nurturing' | 'calm' | 'pragmatic')}
            >
              <MenuItem value="nurturing">Nurturing</MenuItem>
              <MenuItem value="calm">Calm</MenuItem>
              <MenuItem value="pragmatic">Pragmatic</MenuItem>
            </Select>
          </FormControl>
          
          <IconButton
            onClick={() => setChatState(prev => ({ ...prev, quickFactsMode: !prev.quickFactsMode }))}
            color={chatState.quickFactsMode ? 'primary' : 'default'}
          >
            <QuickFacts />
          </IconButton>
        </Box>
      </Box>

      {chatState.quickFactsMode && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Quick Facts mode is enabled. Responses will be more direct and factual.
        </Alert>
      )}

      {/* Quick Intents */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Quick Actions:
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {quickIntents.map((intent) => {
            const Icon = intent.icon;
            return (
              <Chip
                key={intent.action}
                icon={<Icon />}
                label={intent.label}
                onClick={() => handleQuickIntent(intent.action)}
                variant="outlined"
                clickable
              />
            );
          })}
        </Stack>
      </Box>

      {/* Messages */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
          bgcolor: 'grey.50',
          borderRadius: 2,
          mb: 2,
        }}
      >
        {chatState.messages.map(renderMessage)}
        
        {chatState.isTyping && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 32, height: 32 }}>
              L
            </Avatar>
            <Card sx={{ bgcolor: 'background.paper', borderRadius: 3 }}>
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={16} />
                  <Typography variant="body2" color="text.secondary">
                    Lara is typing...
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}
        
        <div ref={messagesEndRef} />
      </Box>

      {/* Input */}
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          variant="outlined"
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        
        <IconButton
          onClick={handleVoiceToggle}
          color={chatState.isRecording ? 'error' : 'default'}
          disabled={!preferences.voiceEnabled}
        >
          {chatState.isRecording ? <MicOff /> : <Mic />}
        </IconButton>
        
        <Button
          variant="contained"
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || chatState.isTyping}
          sx={{ minWidth: 60 }}
        >
          <Send />
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
