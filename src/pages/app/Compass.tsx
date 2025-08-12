import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Chip,
  Stack,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Avatar,
  Badge,
} from '@mui/material';
import {
  Explore as CompassIcon,
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  Add,
  CheckCircle,
  Cancel,
  TrendingUp,
  TrendingDown,
  Info,
  PrivacyTip,
  Lightbulb,
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material';

interface Action {
  id: string;
  action: string;
  timestamp: Date;
  type: 'support' | 'understanding' | 'practical';
  feedback?: 'receptive' | 'neutral' | 'withdrawn';
  worked?: boolean;
}

interface Suggestion {
  id: string;
  suggestion: string;
  category: 'communication' | 'support' | 'understanding' | 'practical';
  confidence: number;
  backfire: boolean;
}

const Compass: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(true);
  const [actionInput, setActionInput] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);
  const [showNudgeSettings, setShowNudgeSettings] = useState(false);
  const [nudgesEnabled, setNudgesEnabled] = useState(true);
  const [actions, setActions] = useState<Action[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  // Mock data
  const actionPresets = [
    'Handled household chores',
    'Prepared chai/coffee',
    'Offered to cancel plans',
    'Listened without trying to fix',
    'Gave space when needed',
    'Brought comfort items',
    'Asked about symptoms',
    'Respected privacy',
  ];

  const mockSuggestions: Suggestion[] = [
    {
      id: '1',
      suggestion: 'Try asking "How can I best support you right now?" instead of offering solutions',
      category: 'communication',
      confidence: 85,
      backfire: false,
    },
    {
      id: '2',
      suggestion: 'Keep a small fan nearby for hot flash moments',
      category: 'practical',
      confidence: 92,
      backfire: false,
    },
    {
      id: '3',
      suggestion: 'Avoid saying "it\'s just hormones" - validate her experience',
      category: 'understanding',
      confidence: 78,
      backfire: true,
    },
  ];

  const whatWorkedList = [
    'Asking before touching during hot flashes',
    'Keeping the bedroom cooler at night',
    'Being patient with mood changes',
    'Offering practical help without being asked',
  ];

  useEffect(() => {
    setSuggestions(mockSuggestions);
  }, []);

  const handlePlayWelcome = () => {
    setIsPlaying(!isPlaying);
    // In real app, this would play the voice welcome
  };

  const handleLogAction = () => {
    if (!actionInput.trim() || !selectedType) return;

    const newAction: Action = {
      id: Date.now().toString(),
      action: actionInput,
      timestamp: new Date(),
      type: selectedType as 'support' | 'understanding' | 'practical',
    };

    setActions([newAction, ...actions]);
    setActionInput('');
    setSelectedType('');

    // Generate new suggestion based on action
    setTimeout(() => {
      const newSuggestion: Suggestion = {
        id: Date.now().toString(),
        suggestion: 'Consider following up with a gentle check-in in 2-3 hours',
        category: 'communication',
        confidence: 75,
        backfire: false,
      };
      setSuggestions([newSuggestion, ...suggestions]);
    }, 1000);
  };

  const handleFeedback = (actionId: string, feedback: 'receptive' | 'neutral' | 'withdrawn') => {
    setActions(actions.map(action => 
      action.id === actionId ? { ...action, feedback } : action
    ));
  };

  const handleWorkedToggle = (actionId: string) => {
    setActions(actions.map(action => 
      action.id === actionId ? { ...action, worked: !action.worked } : action
    ));
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Compass
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Support your partner's journey with adaptive suggestions
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<Info />}
            onClick={() => setShowPrivacyDialog(true)}
          >
            Privacy Info
          </Button>
          <Button
            variant="outlined"
            startIcon={<Lightbulb />}
            onClick={() => setShowNudgeSettings(true)}
          >
            Nudge Settings
          </Button>
        </Box>
      </Box>

      {/* Voice Welcome */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CompassIcon color="primary" sx={{ mr: 2, fontSize: 32 }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom>
                Welcome Message
              </Typography>
              <Typography variant="body2" color="text.secondary">
                "Hi there! I'm here to help you support your partner through their menopause journey. 
                Let's work together to make this transition smoother for both of you."
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              startIcon={isPlaying ? <Pause /> : <PlayArrow />}
              onClick={handlePlayWelcome}
            >
              {isPlaying ? 'Pause' : 'Play Welcome'}
            </Button>
            <IconButton onClick={() => setVolume(!volume)}>
              {volume ? <VolumeUp /> : <VolumeOff />}
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      {/* Action Logger */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Log Your Action
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Record what you did to support your partner today
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              label="What did you do?"
              value={actionInput}
              onChange={(e) => setActionInput(e.target.value)}
              placeholder="e.g., Handled household chores, listened without trying to fix..."
            />
            <FormControl fullWidth>
              <InputLabel>Action Type</InputLabel>
              <Select
                value={selectedType}
                label="Action Type"
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <MenuItem value="support">Emotional Support</MenuItem>
                <MenuItem value="understanding">Understanding & Patience</MenuItem>
                <MenuItem value="practical">Practical Help</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            Quick Actions:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
            {actionPresets.map((preset) => (
              <Chip
                key={preset}
                label={preset}
                variant="outlined"
                onClick={() => setActionInput(preset)}
                size="small"
              />
            ))}
          </Stack>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleLogAction}
            disabled={!actionInput.trim() || !selectedType}
            fullWidth
          >
            Log Action
          </Button>
        </CardContent>
      </Card>

      {/* Suggestions Panel */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Adaptive Suggestions
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Personalized recommendations based on your partner's patterns (privacy-safe)
          </Typography>

          {suggestions.map((suggestion) => (
            <Box key={suggestion.id} sx={{ mb: 2, p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" gutterBottom>
                    {suggestion.suggestion}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Chip
                      label={suggestion.category}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                    <Typography variant="body2" color="text.secondary">
                      Confidence: {suggestion.confidence}%
                    </Typography>
                    {suggestion.backfire && (
                      <Chip
                        label="Backfire Risk"
                        size="small"
                        color="warning"
                        icon={<TrendingDown />}
                      />
                    )}
                  </Box>
                </Box>
                <IconButton size="small">
                  <FavoriteBorder />
                </IconButton>
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>

      {/* What Worked */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            What Worked Well
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Actions that received positive feedback
          </Typography>

          <List>
            {whatWorkedList.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
                {index < whatWorkedList.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Recent Actions */}
      {actions.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Recent Actions
            </Typography>
            <List>
              {actions.slice(0, 5).map((action) => (
                <ListItem key={action.id}>
                  <ListItemIcon>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                      {action.type.charAt(0).toUpperCase()}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={action.action}
                    secondary={action.timestamp.toLocaleDateString()}
                  />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {action.feedback ? (
                      <Chip
                        label={action.feedback}
                        size="small"
                        color={action.feedback === 'receptive' ? 'success' : action.feedback === 'neutral' ? 'default' : 'warning'}
                      />
                    ) : (
                      <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleFeedback(action.id, 'receptive')}
                        >
                          <TrendingUp fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleFeedback(action.id, 'neutral')}
                        >
                          <CheckCircle fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleFeedback(action.id, 'withdrawn')}
                        >
                          <Cancel fontSize="small" />
                        </IconButton>
                      </Box>
                    )}
                    <IconButton
                      size="small"
                      onClick={() => handleWorkedToggle(action.id)}
                      color={action.worked ? 'success' : 'default'}
                    >
                      {action.worked ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}

      {/* Privacy Dialog */}
      <Dialog open={showPrivacyDialog} onClose={() => setShowPrivacyDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PrivacyTip color="primary" sx={{ mr: 1 }} />
            Privacy & Data Safety
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Your privacy and your partner's privacy are our top priority.
          </Typography>
          <Typography variant="h6" gutterBottom>
            What we collect:
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText 
                primary="Your actions and suggestions"
                secondary="To provide better recommendations"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText 
                primary="High-level feedback (receptive/neutral/withdrawn)"
                secondary="Never specific details about your partner"
              />
            </ListItem>
          </List>
          <Typography variant="h6" gutterBottom>
            What we NEVER collect:
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Cancel color="error" />
              </ListItemIcon>
              <ListItemText 
                primary="Your partner's personal data"
                secondary="No symptoms, moods, or private information"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Cancel color="error" />
              </ListItemIcon>
              <ListItemText 
                primary="Specific conversations or interactions"
                secondary="Only general action categories"
              />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPrivacyDialog(false)}>Got it</Button>
        </DialogActions>
      </Dialog>

      {/* Nudge Settings Dialog */}
      <Dialog open={showNudgeSettings} onClose={() => setShowNudgeSettings(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Nudge Settings</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Control when and how you receive suggestions
          </Typography>
          
          <FormControlLabel
            control={
              <Switch
                checked={nudgesEnabled}
                onChange={(e) => setNudgesEnabled(e.target.checked)}
              />
            }
            label="Enable gentle nudges and reminders"
          />
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            You'll receive helpful suggestions based on your partner's patterns, 
            but only when it's most relevant and helpful.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowNudgeSettings(false)}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Compass;
