import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Slider,
  Chip,
  Stack,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Alert,
  LinearProgress,
  useTheme,
} from '@mui/material';
import {
  Save,
  Chat,
  LocalFireDepartment,
  SentimentSatisfied,
  SentimentNeutral,
  SentimentDissatisfied,
  BatteryChargingFull,
  BatteryStd,
  BatteryAlert,
  Bedtime,
} from '@mui/icons-material';
import { useAnalytics } from '../../../contexts/AnalyticsContext';

interface SoftLogData {
  hotFlash: boolean;
  mood: number;
  energy: 'low' | 'mid' | 'high';
  sleep: boolean;
  reflection: string;
  culturalRemedies: string[];
}

const SoftLog: React.FC = () => {
  const [logData, setLogData] = useState<SoftLogData>({
    hotFlash: false,
    mood: 5,
    energy: 'mid',
    sleep: false,
    reflection: '',
    culturalRemedies: [],
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { trackTracker } = useAnalytics();
  const navigate = useNavigate();
  const theme = useTheme();

  const culturalRemedies = [
    'Cooling yogurt',
    'Herbal tea',
    'Fan/AC',
    'Light clothing',
    'Cold compress',
    'Breathing exercise',
  ];

  const reflectionPrompts = [
    "What's been the highlight of your day so far?",
    "How are you feeling about your energy levels?",
    "What's one thing you're grateful for today?",
    "How did you handle any challenges today?",
    "What would make tomorrow better?",
  ];

  const currentPrompt = reflectionPrompts[new Date().getDate() % reflectionPrompts.length];

  const handleSave = async () => {
    setIsSaving(true);
    trackTracker('softlog_saved');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/app/home');
      }, 2000);
    } catch (error) {
      console.error('Failed to save log:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAndChat = async () => {
    await handleSave();
    navigate('/app/chat');
  };

  const handleCulturalRemedyToggle = (remedy: string) => {
    setLogData(prev => ({
      ...prev,
      culturalRemedies: prev.culturalRemedies.includes(remedy)
        ? prev.culturalRemedies.filter(r => r !== remedy)
        : [...prev.culturalRemedies, remedy],
    }));
  };

  const getMoodIcon = (mood: number) => {
    if (mood >= 7) return <SentimentSatisfied sx={{ color: theme.palette.success.main }} />;
    if (mood >= 4) return <SentimentNeutral sx={{ color: theme.palette.warning.main }} />;
    return <SentimentDissatisfied sx={{ color: theme.palette.error.main }} />;
  };

  const getEnergyIcon = (energy: string) => {
    switch (energy) {
      case 'high': return <BatteryChargingFull sx={{ color: theme.palette.success.main }} />;
      case 'mid': return <BatteryStd sx={{ color: theme.palette.warning.main }} />;
      case 'low': return <BatteryAlert sx={{ color: theme.palette.error.main }} />;
      default: return <BatteryStd />;
    }
  };

  const getMoodColor = (mood: number) => {
    if (mood >= 7) return theme.palette.success.main;
    if (mood >= 4) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Quick Daily Log
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Take 30 seconds to capture how you're feeling today
      </Typography>

      {showSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Log saved successfully! Redirecting to home...
        </Alert>
      )}

      <Card>
        <CardContent sx={{ p: 3 }}>
          {/* Hot Flash */}
          <Box sx={{ mb: 4 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocalFireDepartment sx={{ mr: 1, color: theme.palette.error.main }} />
                <Typography variant="h6">Hot Flash Today?</Typography>
              </FormLabel>
              <RadioGroup
                row
                value={logData.hotFlash}
                onChange={(e) => setLogData(prev => ({ ...prev, hotFlash: e.target.value === 'true' }))}
              >
                <FormControlLabel value={true} control={<Radio />} label="Yes" />
                <FormControlLabel value={false} control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Box>

          {/* Mood Slider */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              {getMoodIcon(logData.mood)}
              <Typography variant="h6" sx={{ ml: 1 }}>
                Mood: {logData.mood}/10
              </Typography>
            </Box>
            <Slider
              value={logData.mood}
              onChange={(_, value) => setLogData(prev => ({ ...prev, mood: value as number }))}
              min={1}
              max={10}
              step={1}
              marks
              valueLabelDisplay="auto"
              sx={{
                '& .MuiSlider-track': {
                  backgroundColor: getMoodColor(logData.mood),
                },
                '& .MuiSlider-thumb': {
                  backgroundColor: getMoodColor(logData.mood),
                },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="caption" color="text.secondary">Low</Typography>
              <Typography variant="caption" color="text.secondary">High</Typography>
            </Box>
          </Box>

          {/* Energy Level */}
          <Box sx={{ mb: 4 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend" sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {getEnergyIcon(logData.energy)}
                <Typography variant="h6" sx={{ ml: 1 }}>
                  Energy Level
                </Typography>
              </FormLabel>
              <RadioGroup
                row
                value={logData.energy}
                onChange={(e) => setLogData(prev => ({ ...prev, energy: e.target.value as 'low' | 'mid' | 'high' }))}
              >
                <FormControlLabel value="low" control={<Radio />} label="Low" />
                <FormControlLabel value="mid" control={<Radio />} label="Mid" />
                <FormControlLabel value="high" control={<Radio />} label="High" />
              </RadioGroup>
            </FormControl>
          </Box>

          {/* Sleep Quality */}
          <Box sx={{ mb: 4 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={logData.sleep}
                  onChange={(e) => setLogData(prev => ({ ...prev, sleep: e.target.checked }))}
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Bedtime sx={{ mr: 1 }} />
                  <Typography>Good sleep last night</Typography>
                </Box>
              }
            />
          </Box>

          {/* Cultural Remedies */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Cultural Remedies Used
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Select any remedies you've tried today
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {culturalRemedies.map((remedy) => (
                <Chip
                  key={remedy}
                  label={remedy}
                  onClick={() => handleCulturalRemedyToggle(remedy)}
                  color={logData.culturalRemedies.includes(remedy) ? 'primary' : 'default'}
                  variant={logData.culturalRemedies.includes(remedy) ? 'filled' : 'outlined'}
                  clickable
                />
              ))}
            </Stack>
          </Box>

          {/* Reflection */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Daily Reflection
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {currentPrompt}
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={logData.reflection}
              onChange={(e) => setLogData(prev => ({ ...prev, reflection: e.target.value }))}
              placeholder="Share your thoughts..."
              inputProps={{ maxLength: 100 }}
              helperText={`${logData.reflection.length}/100 characters`}
            />
          </Box>

          {/* Progress */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Log completion
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(() => {
                let completed = 0;
                if (logData.hotFlash !== undefined) completed += 20;
                if (logData.mood > 0) completed += 20;
                if (logData.energy) completed += 20;
                if (logData.sleep !== undefined) completed += 20;
                if (logData.reflection.trim()) completed += 20;
                return completed;
              })()}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={isSaving}
              startIcon={<Save />}
              sx={{ flex: 1, minWidth: 120 }}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
            
            <Button
              variant="outlined"
              onClick={handleSaveAndChat}
              disabled={isSaving}
              startIcon={<Chat />}
              sx={{ flex: 1, minWidth: 120 }}
            >
              Save & Chat
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SoftLog;
