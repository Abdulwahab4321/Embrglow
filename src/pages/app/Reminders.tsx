import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  FormGroup,
  Chip,
  Stack,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Slider,
  InputAdornment,
  Tooltip,
  Badge,
  LinearProgress,
} from '@mui/material';
import {
  Alarm,
  Add,
  Edit,
  Delete,
  PlayArrow,
  Pause,
  Notifications,
  NotificationsOff,
  Email,
  Phone,
  Schedule,
  Bedtime,
  Snooze,
  VolumeUp,
  VolumeOff,
  Info,
  Warning,
  CheckCircle,
  Cancel,
  MoreVert,
  Menu,
} from '@mui/icons-material';

interface Reminder {
  id: string;
  title: string;
  description: string;
  time: string;
  days: string[];
  channels: ('in-app' | 'email' | 'push')[];
  active: boolean;
  quietHours: boolean;
  snoozeRules: {
    enabled: boolean;
    maxSnoozes: number;
    snoozeInterval: number; // minutes
  };
  lastTriggered?: Date;
  nextTrigger?: Date;
}

const Reminders: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: '1',
      title: 'Daily Soft Log',
      description: 'Quick daily check-in for symptoms and mood',
      time: '20:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      channels: ['in-app', 'push'],
      active: true,
      quietHours: true,
      snoozeRules: {
        enabled: true,
        maxSnoozes: 3,
        snoozeInterval: 15,
      },
      lastTriggered: new Date(Date.now() - 24 * 60 * 60 * 1000),
      nextTrigger: new Date(Date.now() + 2 * 60 * 60 * 1000),
    },
    {
      id: '2',
      title: 'Bedtime Routine',
      description: 'Prepare for better sleep with relaxation techniques',
      time: '21:30',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      channels: ['in-app', 'push'],
      active: true,
      quietHours: true,
      snoozeRules: {
        enabled: false,
        maxSnoozes: 0,
        snoozeInterval: 0,
      },
      lastTriggered: new Date(Date.now() - 12 * 60 * 60 * 1000),
      nextTrigger: new Date(Date.now() + 1.5 * 60 * 60 * 1000),
    },
    {
      id: '3',
      title: 'Hydration Check',
      description: 'Stay hydrated throughout the day',
      time: '10:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      channels: ['in-app'],
      active: false,
      quietHours: false,
      snoozeRules: {
        enabled: true,
        maxSnoozes: 2,
        snoozeInterval: 30,
      },
    },
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const [showTestDialog, setShowTestDialog] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const [newReminder, setNewReminder] = useState<Partial<Reminder>>({
    title: '',
    description: '',
    time: '09:00',
    days: [],
    channels: ['in-app'],
    active: true,
    quietHours: true,
    snoozeRules: {
      enabled: true,
      maxSnoozes: 3,
      snoozeInterval: 15,
    },
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const channelOptions = [
    { value: 'in-app', label: 'In-App', icon: <Notifications /> },
    { value: 'email', label: 'Email', icon: <Email /> },
    { value: 'push', label: 'Push Notification', icon: <Phone /> },
  ];

  const handleAddReminder = () => {
    if (!newReminder.title || newReminder.days?.length === 0) return;

    const reminder: Reminder = {
      id: Date.now().toString(),
      title: newReminder.title!,
      description: newReminder.description || '',
      time: newReminder.time!,
      days: newReminder.days!,
      channels: newReminder.channels!,
      active: newReminder.active!,
      quietHours: newReminder.quietHours!,
      snoozeRules: newReminder.snoozeRules!,
    };

    setReminders([...reminders, reminder]);
    setNewReminder({
      title: '',
      description: '',
      time: '09:00',
      days: [],
      channels: ['in-app'],
      active: true,
      quietHours: true,
      snoozeRules: {
        enabled: true,
        maxSnoozes: 3,
        snoozeInterval: 15,
      },
    });
    setShowAddDialog(false);
  };

  const handleEditReminder = () => {
    if (!editingReminder) return;

    setReminders(reminders.map(r => 
      r.id === editingReminder.id ? editingReminder : r
    ));
    setEditingReminder(null);
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const handleToggleActive = (id: string) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, active: !r.active } : r
    ));
  };

  const handleTestNotification = async () => {
    setIsSending(true);
    // Simulate sending test notification
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSending(false);
    setShowTestDialog(false);
  };

  const getNextTriggerTime = (reminder: Reminder) => {
    if (reminder.nextTrigger) {
      return reminder.nextTrigger.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return 'Not scheduled';
  };

  const getStatusColor = (reminder: Reminder) => {
    if (!reminder.active) return 'default';
    if (reminder.nextTrigger && reminder.nextTrigger < new Date()) return 'warning';
    return 'success';
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Reminders
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Set gentle nudges for daily routines and self-care
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<PlayArrow />}
            onClick={() => setShowTestDialog(true)}
          >
            Test Notification
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setShowAddDialog(true)}
          >
            Add Reminder
          </Button>
        </Box>
      </Box>

      {/* Reminders List */}
      {reminders.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Alarm sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              No reminders set
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Create your first reminder to get started with gentle daily nudges
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setShowAddDialog(true)}
            >
              Create First Reminder
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={2}>
          {reminders.map((reminder) => (
            <Card key={reminder.id}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Typography variant="h6">
                        {reminder.title}
                      </Typography>
                      <Chip
                        label={reminder.active ? 'Active' : 'Paused'}
                        size="small"
                        color={getStatusColor(reminder)}
                        variant="outlined"
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {reminder.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Schedule fontSize="small" />
                        <Typography variant="body2">
                          {reminder.time} • {reminder.days.join(', ')}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Notifications fontSize="small" />
                        <Typography variant="body2">
                          Next: {getNextTriggerTime(reminder)}
                        </Typography>
                      </Box>
                    </Box>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {reminder.channels.map((channel) => {
                        const option = channelOptions.find(c => c.value === channel);
                        return (
                          <Chip
                            key={channel}
                            icon={option?.icon}
                            label={option?.label}
                            size="small"
                            variant="outlined"
                          />
                        );
                      })}
                      {reminder.quietHours && (
                        <Chip
                          icon={<Bedtime />}
                          label="Quiet Hours"
                          size="small"
                          variant="outlined"
                        />
                      )}
                      {reminder.snoozeRules.enabled && (
                        <Chip
                          icon={<Snooze />}
                          label="Snooze Enabled"
                          size="small"
                          variant="outlined"
                        />
                      )}
                    </Stack>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleToggleActive(reminder.id)}
                    >
                      {reminder.active ? <Pause /> : <PlayArrow />}
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => setEditingReminder(reminder)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteReminder(reminder.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}

      {/* Add/Edit Reminder Dialog */}
      <Dialog 
        open={showAddDialog || !!editingReminder} 
        onClose={() => {
          setShowAddDialog(false);
          setEditingReminder(null);
        }} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          {editingReminder ? 'Edit Reminder' : 'Add New Reminder'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              label="Reminder Title"
              value={editingReminder?.title || newReminder.title}
              onChange={(e) => {
                if (editingReminder) {
                  setEditingReminder({ ...editingReminder, title: e.target.value });
                } else {
                  setNewReminder({ ...newReminder, title: e.target.value });
                }
              }}
              placeholder="e.g., Daily Soft Log"
            />
            <TextField
              fullWidth
              label="Time"
              type="time"
              value={editingReminder?.time || newReminder.time}
              onChange={(e) => {
                if (editingReminder) {
                  setEditingReminder({ ...editingReminder, time: e.target.value });
                } else {
                  setNewReminder({ ...newReminder, time: e.target.value });
                }
              }}
            />
          </Box>

          <TextField
            fullWidth
            label="Description (optional)"
            multiline
            rows={2}
            value={editingReminder?.description || newReminder.description}
            onChange={(e) => {
              if (editingReminder) {
                setEditingReminder({ ...editingReminder, description: e.target.value });
              } else {
                setNewReminder({ ...newReminder, description: e.target.value });
              }
            }}
            placeholder="Brief description of what this reminder is for"
            sx={{ mb: 3 }}
          />

          <Typography variant="h6" gutterBottom>
            Days of Week
          </Typography>
          <FormGroup sx={{ mb: 3 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 1 }}>
              {daysOfWeek.map((day) => (
                <FormControlLabel
                  key={day}
                  control={
                    <Checkbox
                      checked={(editingReminder?.days || newReminder.days || []).includes(day)}
                      onChange={(e) => {
                        const currentDays = editingReminder?.days || newReminder.days || [];
                        const newDays = e.target.checked
                          ? [...currentDays, day]
                          : currentDays.filter(d => d !== day);
                        
                        if (editingReminder) {
                          setEditingReminder({ ...editingReminder, days: newDays });
                        } else {
                          setNewReminder({ ...newReminder, days: newDays });
                        }
                      }}
                    />
                  }
                  label={day.slice(0, 3)}
                />
              ))}
            </Box>
          </FormGroup>

          <Typography variant="h6" gutterBottom>
            Notification Channels
          </Typography>
          <FormGroup sx={{ mb: 3 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 1 }}>
              {channelOptions.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={(editingReminder?.channels || newReminder.channels || []).includes(option.value as any)}
                      onChange={(e) => {
                        const currentChannels = editingReminder?.channels || newReminder.channels || [];
                        const newChannels = e.target.checked
                          ? [...currentChannels, option.value as any]
                          : currentChannels.filter(c => c !== option.value);
                        
                        if (editingReminder) {
                          setEditingReminder({ ...editingReminder, channels: newChannels });
                        } else {
                          setNewReminder({ ...newReminder, channels: newChannels });
                        }
                      }}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {option.icon}
                      {option.label}
                    </Box>
                  }
                />
              ))}
            </Box>
          </FormGroup>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2, mb: 3 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={editingReminder?.quietHours ?? newReminder.quietHours}
                  onChange={(e) => {
                    if (editingReminder) {
                      setEditingReminder({ ...editingReminder, quietHours: e.target.checked });
                    } else {
                      setNewReminder({ ...newReminder, quietHours: e.target.checked });
                    }
                  }}
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Bedtime fontSize="small" />
                  Respect quiet hours (10 PM - 8 AM)
                </Box>
              }
            />

            <FormControlLabel
              control={
                <Switch
                  checked={editingReminder?.snoozeRules?.enabled ?? newReminder.snoozeRules?.enabled}
                  onChange={(e) => {
                    if (editingReminder) {
                      setEditingReminder({
                        ...editingReminder,
                        snoozeRules: { ...editingReminder.snoozeRules, enabled: e.target.checked }
                      });
                    } else {
                      setNewReminder({
                        ...newReminder,
                        snoozeRules: { ...newReminder.snoozeRules!, enabled: e.target.checked }
                      });
                    }
                  }}
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Snooze fontSize="small" />
                  Allow snoozing
                </Box>
              }
            />
          </Box>

          {(editingReminder?.snoozeRules?.enabled ?? newReminder.snoozeRules?.enabled) && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" gutterBottom>
                Snooze Settings
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
                <TextField
                  label="Max Snoozes"
                  type="number"
                  value={editingReminder?.snoozeRules?.maxSnoozes ?? newReminder.snoozeRules?.maxSnoozes}
                  onChange={(e) => {
                    if (editingReminder) {
                      setEditingReminder({
                        ...editingReminder,
                        snoozeRules: { ...editingReminder.snoozeRules, maxSnoozes: parseInt(e.target.value) }
                      });
                    } else {
                      setNewReminder({
                        ...newReminder,
                        snoozeRules: { ...newReminder.snoozeRules!, maxSnoozes: parseInt(e.target.value) }
                      });
                    }
                  }}
                  InputProps={{ inputProps: { min: 1, max: 10 } }}
                />
                <TextField
                  label="Snooze Interval (minutes)"
                  type="number"
                  value={editingReminder?.snoozeRules?.snoozeInterval ?? newReminder.snoozeRules?.snoozeInterval}
                  onChange={(e) => {
                    if (editingReminder) {
                      setEditingReminder({
                        ...editingReminder,
                        snoozeRules: { ...editingReminder.snoozeRules, snoozeInterval: parseInt(e.target.value) }
                      });
                    } else {
                      setNewReminder({
                        ...newReminder,
                        snoozeRules: { ...newReminder.snoozeRules!, snoozeInterval: parseInt(e.target.value) }
                      });
                    }
                  }}
                  InputProps={{ inputProps: { min: 5, max: 120 } }}
                />
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setShowAddDialog(false);
            setEditingReminder(null);
          }}>
            Cancel
          </Button>
          <Button
            onClick={editingReminder ? handleEditReminder : handleAddReminder}
            variant="contained"
            disabled={!editingReminder?.title && !newReminder.title}
          >
            {editingReminder ? 'Save Changes' : 'Create Reminder'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Test Notification Dialog */}
      <Dialog open={showTestDialog} onClose={() => setShowTestDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Test Notification</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Send a test notification to verify your reminder settings are working correctly
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowTestDialog(false)}>Cancel</Button>
          <Button
            onClick={handleTestNotification}
            variant="contained"
            disabled={isSending}
            startIcon={isSending ? <LinearProgress /> : <PlayArrow />}
          >
            {isSending ? 'Sending...' : 'Send Test'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Reminders;
