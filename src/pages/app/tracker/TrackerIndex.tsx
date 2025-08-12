import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Alert,
  Skeleton,
  useTheme,
} from '@mui/material';
import {
  Timeline,
  Add,
  LocalFireDepartment,
  SentimentSatisfied,
  SentimentNeutral,
  SentimentDissatisfied,
  BatteryChargingFull,
  BatteryStd,
  BatteryAlert,
  Bedtime,
  CalendarToday,
} from '@mui/icons-material';
import { useAnalytics } from '../../../contexts/AnalyticsContext';

interface LogEntry {
  id: string;
  date: Date;
  type: 'soft' | 'deep';
  hotFlash: boolean;
  mood: number;
  energy: 'low' | 'mid' | 'high';
  sleep?: boolean;
  reflection?: string;
}

const TrackerIndex: React.FC = () => {
  const [mode, setMode] = useState<'soft' | 'deep'>('soft');
  const [recentLogs, setRecentLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { trackTracker } = useAnalytics();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    loadRecentLogs();
  }, []);

  const loadRecentLogs = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      setRecentLogs([
        {
          id: '1',
          date: new Date(),
          type: 'soft',
          hotFlash: true,
          mood: 6,
          energy: 'mid',
          sleep: true,
          reflection: 'Feeling better today after good sleep',
        },
        {
          id: '2',
          date: new Date(Date.now() - 24 * 60 * 60 * 1000),
          type: 'soft',
          hotFlash: false,
          mood: 8,
          energy: 'high',
          sleep: true,
        },
        {
          id: '3',
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          type: 'deep',
          hotFlash: true,
          mood: 4,
          energy: 'low',
        },
      ]);
    } catch (error) {
      console.error('Failed to load recent logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleModeChange = (newMode: 'soft' | 'deep') => {
    setMode(newMode);
    trackTracker('mode_toggle');
  };

  const handleStartLog = () => {
    const path = mode === 'soft' ? '/app/tracker/soft' : '/app/tracker/deep';
    navigate(path);
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

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const renderLogEntry = (log: LogEntry) => (
    <ListItem
      key={log.id}
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 2,
        mb: 1,
        '&:hover': {
          bgcolor: 'action.hover',
        },
      }}
    >
      <ListItemIcon>
        <Timeline />
      </ListItemIcon>
      <ListItemText
        primary={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {formatDate(log.date)}
            </Typography>
            <Chip
              label={log.type === 'soft' ? 'Quick Log' : 'Detailed Log'}
              size="small"
              color={log.type === 'soft' ? 'primary' : 'secondary'}
              variant="outlined"
            />
          </Box>
        }
        secondary={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {getMoodIcon(log.mood)}
              <Typography variant="body2">
                Mood: {log.mood}/10
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {getEnergyIcon(log.energy)}
              <Typography variant="body2">
                Energy: {log.energy}
              </Typography>
            </Box>
            
            {log.hotFlash && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <LocalFireDepartment sx={{ color: theme.palette.error.main, fontSize: 16 }} />
                <Typography variant="body2" color="error">
                  Hot flash
                </Typography>
              </Box>
            )}
            
            {log.sleep && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Bedtime sx={{ color: theme.palette.success.main, fontSize: 16 }} />
                <Typography variant="body2" color="success.main">
                  Good sleep
                </Typography>
              </Box>
            )}
          </Box>
        }
      />
    </ListItem>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Symptom Tracker
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Choose your logging style and view recent entries
      </Typography>

      {/* Mode Toggle */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Logging Mode
          </Typography>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(_, newMode) => newMode && handleModeChange(newMode)}
            sx={{ width: '100%' }}
          >
            <ToggleButton value="soft" sx={{ flex: 1 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Quick Log
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  30 seconds • Daily essentials
                </Typography>
              </Box>
            </ToggleButton>
            <ToggleButton value="deep" sx={{ flex: 1 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Detailed Log
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  5-10 minutes • Comprehensive tracking
                </Typography>
              </Box>
            </ToggleButton>
          </ToggleButtonGroup>
        </CardContent>
      </Card>

      {/* Start Logging */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              {mode === 'soft' ? 'Quick Daily Check-in' : 'Detailed Symptom Tracking'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {mode === 'soft' 
                ? 'Capture your daily mood, energy, and key symptoms in just 30 seconds.'
                : 'Track detailed symptoms, triggers, and patterns for deeper insights.'
              }
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={handleStartLog}
              startIcon={<Add />}
              sx={{ px: 4 }}
            >
              Start {mode === 'soft' ? 'Quick Log' : 'Detailed Log'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Recent Entries */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CalendarToday sx={{ mr: 1 }} />
            <Typography variant="h6">
              Recent Entries
            </Typography>
          </Box>
          
          {loading ? (
            <Box>
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} variant="rectangular" height={80} sx={{ mb: 1, borderRadius: 2 }} />
              ))}
            </Box>
          ) : recentLogs.length > 0 ? (
            <List>
              {recentLogs.map(renderLogEntry)}
            </List>
          ) : (
            <Alert severity="info">
              No logs yet. Start your first log to begin tracking your symptoms and patterns.
            </Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default TrackerIndex;
