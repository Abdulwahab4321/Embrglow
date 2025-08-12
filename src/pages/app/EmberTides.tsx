import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Slider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  useTheme,
} from '@mui/material';
import { Waves, Send } from '@mui/icons-material';
import { useAnalytics } from '../../contexts/AnalyticsContext';

const EmberTides: React.FC = () => {
  const [energyLevel, setEnergyLevel] = useState<number>(5);
  const [focusLevel, setFocusLevel] = useState<number>(5);
  const [tensionLevel, setTensionLevel] = useState<number>(3);
  const [selectedState, setSelectedState] = useState<'energy' | 'focus' | 'tension'>('energy');
  const { trackEmberTides } = useAnalytics();
  const theme = useTheme();

  const handleLog = () => {
    trackEmberTides('log');
    // In a real app, this would save the data
    console.log('Logged EmberTides:', { selectedState, energyLevel, focusLevel, tensionLevel });
  };

  const handleSendToChat = () => {
    trackEmberTides('to_chat');
    // In a real app, this would open chat with context
    console.log('Sending to chat:', { selectedState, energyLevel, focusLevel, tensionLevel });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        EmberTides
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Visual energy tracking through gesture-based interactions
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        This is a visual tracking tool. In the full implementation, you would interact with a canvas 
        to set your energy, focus, and tension levels through gestures.
      </Alert>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Waves sx={{ fontSize: 64, color: theme.palette.primary.main, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Visual Energy Tracker
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tap and drag to set your current state
            </Typography>
          </Box>

          {/* State Selection */}
          <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
            <FormLabel component="legend">Track Your State</FormLabel>
            <RadioGroup
              row
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value as 'energy' | 'focus' | 'tension')}
            >
              <FormControlLabel value="energy" control={<Radio />} label="Energy" />
              <FormControlLabel value="focus" control={<Radio />} label="Focus" />
              <FormControlLabel value="tension" control={<Radio />} label="Tension" />
            </RadioGroup>
          </FormControl>

          {/* Energy Level */}
          {selectedState === 'energy' && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Energy Level: {energyLevel}/10
              </Typography>
              <Slider
                value={energyLevel}
                onChange={(_, value) => setEnergyLevel(value as number)}
                min={1}
                max={10}
                step={1}
                marks
                valueLabelDisplay="auto"
                sx={{
                  '& .MuiSlider-track': {
                    backgroundColor: theme.palette.success.main,
                  },
                  '& .MuiSlider-thumb': {
                    backgroundColor: theme.palette.success.main,
                  },
                }}
              />
            </Box>
          )}

          {/* Focus Level */}
          {selectedState === 'focus' && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Focus Level: {focusLevel}/10
              </Typography>
              <Slider
                value={focusLevel}
                onChange={(_, value) => setFocusLevel(value as number)}
                min={1}
                max={10}
                step={1}
                marks
                valueLabelDisplay="auto"
                sx={{
                  '& .MuiSlider-track': {
                    backgroundColor: theme.palette.info.main,
                  },
                  '& .MuiSlider-thumb': {
                    backgroundColor: theme.palette.info.main,
                  },
                }}
              />
            </Box>
          )}

          {/* Tension Level */}
          {selectedState === 'tension' && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Tension Level: {tensionLevel}/10
              </Typography>
              <Slider
                value={tensionLevel}
                onChange={(_, value) => setTensionLevel(value as number)}
                min={1}
                max={10}
                step={1}
                marks
                valueLabelDisplay="auto"
                sx={{
                  '& .MuiSlider-track': {
                    backgroundColor: theme.palette.warning.main,
                  },
                  '& .MuiSlider-thumb': {
                    backgroundColor: theme.palette.warning.main,
                  },
                }}
              />
            </Box>
          )}

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={handleLog}
              startIcon={<Waves />}
            >
              Log State
            </Button>
            <Button
              variant="outlined"
              onClick={handleSendToChat}
              startIcon={<Send />}
            >
              Send to Chat
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Last 7 Days
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Your energy, focus, and tension patterns over the past week would be displayed here as a visual chart.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EmberTides;
