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
  Divider,
  IconButton,
  Tooltip,
  Badge,
  LinearProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Share,
  Email,
  Send,
  Visibility,
  VisibilityOff,
  CheckCircle,
  Cancel,
  Info,
  Warning,
  Person,
  Group,
  Schedule,
  Preview,
  Edit,
  Delete,
} from '@mui/icons-material';

interface ConsentSettings {
  mood: boolean;
  symptoms: boolean;
  remedies: boolean;
  sexualHealth: boolean;
  sleep: boolean;
  energy: boolean;
  stress: boolean;
  socialConnections: boolean;
}

interface TherapistConfig {
  email: string;
  name: string;
  frequency: 'weekly' | 'biweekly' | 'monthly';
  includePartner: boolean;
  active: boolean;
}

const TherapistShare: React.FC = () => {
  const [consentSettings, setConsentSettings] = useState<ConsentSettings>({
    mood: true,
    symptoms: true,
    remedies: true,
    sexualHealth: false, // OFF by default
    sleep: true,
    energy: true,
    stress: true,
    socialConnections: true,
  });

  const [therapistConfig, setTherapistConfig] = useState<TherapistConfig>({
    email: '',
    name: '',
    frequency: 'weekly',
    includePartner: false, // OFF by default
    active: false,
  });

  const [showPreview, setShowPreview] = useState(false);
  const [showTestDialog, setShowTestDialog] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [testEmail, setTestEmail] = useState('');

  const handleConsentChange = (category: keyof ConsentSettings) => {
    setConsentSettings(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleTherapistChange = (field: keyof TherapistConfig, value: any) => {
    setTherapistConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveConfig = () => {
    if (!therapistConfig.email || !therapistConfig.name) return;
    
    setTherapistConfig(prev => ({
      ...prev,
      active: true
    }));
  };

  const handleTestSend = async () => {
    if (!testEmail) return;
    
    setIsSending(true);
    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSending(false);
    setShowTestDialog(false);
    setTestEmail('');
  };

  const getActiveCategoriesCount = () => {
    return Object.values(consentSettings).filter(Boolean).length;
  };

  const getNextSendDate = () => {
    const now = new Date();
    switch (therapistConfig.frequency) {
      case 'weekly':
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      case 'biweekly':
        return new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
      case 'monthly':
        return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      default:
        return now;
    }
  };

  const mockSummaryData = {
    moodTrend: 'Generally stable with some fluctuations',
    commonSymptoms: ['Hot flashes', 'Sleep issues', 'Mood swings'],
    effectiveRemedies: ['Evening exercise', 'Cooling techniques', 'Stress management'],
    sleepQuality: 'Improving with new routine',
    stressLevels: 'Moderate, decreasing trend',
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Therapist Share
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Configure weekly summaries and share with your healthcare provider
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<Preview />}
            onClick={() => setShowPreview(true)}
          >
            Preview Summary
          </Button>
          <Button
            variant="outlined"
            startIcon={<Send />}
            onClick={() => setShowTestDialog(true)}
          >
            Test Send
          </Button>
        </Box>
      </Box>

      {/* Status Card */}
      {therapistConfig.active && (
        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="body1" fontWeight="bold">
            Sharing Active
          </Typography>
          <Typography variant="body2">
            Next summary will be sent to {therapistConfig.name} on {getNextSendDate().toLocaleDateString()}
          </Typography>
        </Alert>
      )}

      {/* Consent Configuration */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            What to Share
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Select which categories of information you want to include in your therapist summaries
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={consentSettings.mood}
                    onChange={() => handleConsentChange('mood')}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Mood Trends
                    <Tooltip title="Overall mood patterns and changes over time">
                      <Info fontSize="small" />
                    </Tooltip>
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={consentSettings.symptoms}
                    onChange={() => handleConsentChange('symptoms')}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Symptoms
                    <Tooltip title="Frequency and intensity of menopausal symptoms">
                      <Info fontSize="small" />
                    </Tooltip>
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={consentSettings.remedies}
                    onChange={() => handleConsentChange('remedies')}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Remedies & Treatments
                    <Tooltip title="What's working and what isn't for symptom management">
                      <Info fontSize="small" />
                    </Tooltip>
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={consentSettings.sleep}
                    onChange={() => handleConsentChange('sleep')}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Sleep Quality
                    <Tooltip title="Sleep patterns and quality metrics">
                      <Info fontSize="small" />
                    </Tooltip>
                  </Box>
                }
              />
            </FormGroup>

            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={consentSettings.energy}
                    onChange={() => handleConsentChange('energy')}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Energy Levels
                    <Tooltip title="Daily energy patterns and fatigue levels">
                      <Info fontSize="small" />
                    </Tooltip>
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={consentSettings.stress}
                    onChange={() => handleConsentChange('stress')}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Stress & Triggers
                    <Tooltip title="Stress levels and identified triggers">
                      <Info fontSize="small" />
                    </Tooltip>
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={consentSettings.socialConnections}
                    onChange={() => handleConsentChange('socialConnections')}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Social Connections
                    <Tooltip title="Impact on relationships and social life">
                      <Info fontSize="small" />
                    </Tooltip>
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={consentSettings.sexualHealth}
                    onChange={() => handleConsentChange('sexualHealth')}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Sexual Health
                    <Tooltip title="Sexual health and intimacy patterns (OFF by default for privacy)">
                      <Warning fontSize="small" color="warning" />
                    </Tooltip>
                  </Box>
                }
              />
            </FormGroup>
          </Box>

          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              label={`${getActiveCategoriesCount()} categories selected`}
              color="primary"
              variant="outlined"
            />
            {consentSettings.sexualHealth && (
              <Chip
                label="Sensitive data included"
                color="warning"
                icon={<Warning />}
              />
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Therapist Configuration */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Therapist Information
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Configure who receives your summaries and how often
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              label="Therapist Name"
              value={therapistConfig.name}
              onChange={(e) => handleTherapistChange('name', e.target.value)}
              placeholder="Dr. Sarah Johnson"
            />
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={therapistConfig.email}
              onChange={(e) => handleTherapistChange('email', e.target.value)}
              placeholder="therapist@example.com"
            />
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2, mb: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Frequency</InputLabel>
              <Select
                value={therapistConfig.frequency}
                label="Frequency"
                onChange={(e) => handleTherapistChange('frequency', e.target.value)}
              >
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="biweekly">Bi-weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </Select>
            </FormControl>

            <FormControlLabel
              control={
                <Switch
                  checked={therapistConfig.includePartner}
                  onChange={(e) => handleTherapistChange('includePartner', e.target.checked)}
                />
              }
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Group fontSize="small" />
                  Include partner insights (OFF by default)
                </Box>
              }
            />
          </Box>

          <Button
            variant="contained"
            startIcon={<Share />}
            onClick={handleSaveConfig}
            disabled={!therapistConfig.email || !therapistConfig.name}
            fullWidth
          >
            {therapistConfig.active ? 'Update Configuration' : 'Start Sharing'}
          </Button>
        </CardContent>
      </Card>

      {/* Privacy Notice */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>Privacy Notice:</strong> Your data is encrypted and shared securely. 
          You can revoke access at any time. Your therapist will only see aggregated summaries, 
          never your raw data or personal details.
        </Typography>
      </Alert>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onClose={() => setShowPreview(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Preview />
            Summary Preview
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Weekly Summary for {therapistConfig.name || 'Your Therapist'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Generated on {new Date().toLocaleDateString()}
          </Typography>

          <List>
            {consentSettings.mood && (
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Mood Trends"
                  secondary={mockSummaryData.moodTrend}
                />
              </ListItem>
            )}
            {consentSettings.symptoms && (
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Common Symptoms"
                  secondary={mockSummaryData.commonSymptoms.join(', ')}
                />
              </ListItem>
            )}
            {consentSettings.remedies && (
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Effective Remedies"
                  secondary={mockSummaryData.effectiveRemedies.join(', ')}
                />
              </ListItem>
            )}
            {consentSettings.sleep && (
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Sleep Quality"
                  secondary={mockSummaryData.sleepQuality}
                />
              </ListItem>
            )}
            {consentSettings.stress && (
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText
                  primary="Stress Levels"
                  secondary={mockSummaryData.stressLevels}
                />
              </ListItem>
            )}
          </List>

          {therapistConfig.includePartner && (
            <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Partner Insights Included
              </Typography>
              <Typography variant="body2" color="text.secondary">
                General support patterns and effective communication strategies
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPreview(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Test Send Dialog */}
      <Dialog open={showTestDialog} onClose={() => setShowTestDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Test Send Summary</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Send a test summary to your own email to preview what your therapist will receive
          </Typography>
          
          <TextField
            fullWidth
            label="Your Email"
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            placeholder="your-email@example.com"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowTestDialog(false)}>Cancel</Button>
          <Button
            onClick={handleTestSend}
            variant="contained"
            disabled={!testEmail || isSending}
            startIcon={isSending ? <LinearProgress /> : <Send />}
          >
            {isSending ? 'Sending...' : 'Send Test'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TherapistShare;
