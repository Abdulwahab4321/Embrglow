import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  FormControlLabel,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Stack,
  useTheme,
} from '@mui/material';
import {
  VolumeUp,
  Palette,
  Security,
  DataUsage,
  Accessibility,
  Delete,
  Download,
  Save,
} from '@mui/icons-material';
import { useUser } from '../../contexts/UserContext';
import { useAnalytics } from '../../contexts/AnalyticsContext';

const Settings: React.FC = () => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const { preferences, updatePreferences, updatePrivacySettings, resetPreferences } = useUser();
  const { trackSettings } = useAnalytics();
  const theme = useTheme();

  const handleSettingChange = (key: string, value: any) => {
    updatePreferences({ [key]: value });
    trackSettings(key);
  };

  const handlePrivacyChange = (key: string, value: any) => {
    updatePrivacySettings({ [key]: value });
    trackSettings(`privacy_${key}`);
  };

  const handleDeleteAccount = () => {
    // Implement account deletion
    trackSettings('account_delete');
    setShowDeleteDialog(false);
  };

  const handleExportData = () => {
    // Implement data export
    trackSettings('data_export');
    setShowExportDialog(false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Customize your experience and manage your data
      </Typography>

      {/* Voice & Tone */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <VolumeUp sx={{ mr: 1 }} />
            <Typography variant="h6">Voice & Tone</Typography>
          </Box>
          
          <FormControlLabel
            control={
              <Switch
                checked={preferences.voiceEnabled}
                onChange={(e) => handleSettingChange('voiceEnabled', e.target.checked)}
              />
            }
            label="Enable Voice (Lara TTS)"
            sx={{ mb: 2 }}
          />
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" gutterBottom>
              TTS Speed
            </Typography>
            <Slider
              value={preferences.ttsSpeed}
              onChange={(_, value) => handleSettingChange('ttsSpeed', value)}
              min={0.5}
              max={2}
              step={0.1}
              marks
              valueLabelDisplay="auto"
              sx={{ maxWidth: 300 }}
            />
          </Box>
          
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Communication Tone</InputLabel>
            <Select
              value={preferences.tone}
              label="Communication Tone"
              onChange={(e) => handleSettingChange('tone', e.target.value)}
            >
              <MenuItem value="nurturing">Nurturing & Supportive</MenuItem>
              <MenuItem value="calm">Calm & Reassuring</MenuItem>
              <MenuItem value="pragmatic">Practical & Direct</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      {/* Accessibility */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Accessibility sx={{ mr: 1 }} />
            <Typography variant="h6">Accessibility</Typography>
          </Box>
          
          <FormControl sx={{ minWidth: 200, mb: 2 }}>
            <InputLabel>Font Size</InputLabel>
            <Select
              value={preferences.fontSize}
              label="Font Size"
              onChange={(e) => handleSettingChange('fontSize', e.target.value)}
            >
              <MenuItem value="small">Small</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="large">Large</MenuItem>
            </Select>
          </FormControl>
          
          <FormControlLabel
            control={
              <Switch
                checked={preferences.highContrast}
                onChange={(e) => handleSettingChange('highContrast', e.target.checked)}
              />
            }
            label="High Contrast Mode"
            sx={{ mb: 2 }}
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={preferences.reduceMotion}
                onChange={(e) => handleSettingChange('reduceMotion', e.target.checked)}
              />
            }
            label="Reduce Motion"
          />
        </CardContent>
      </Card>

      {/* Language & Region */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Language & Region
          </Typography>
          
          <FormControl sx={{ minWidth: 200, mb: 2 }}>
            <InputLabel>Language</InputLabel>
            <Select
              value={preferences.language}
              label="Language"
              onChange={(e) => handleSettingChange('language', e.target.value)}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="es">Español</MenuItem>
              <MenuItem value="fr">Français</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Region</InputLabel>
            <Select
              value={preferences.region}
              label="Region"
              onChange={(e) => handleSettingChange('region', e.target.value)}
            >
              <MenuItem value="US">United States</MenuItem>
              <MenuItem value="CA">Canada</MenuItem>
              <MenuItem value="UK">United Kingdom</MenuItem>
              <MenuItem value="AU">Australia</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Security sx={{ mr: 1 }} />
            <Typography variant="h6">Privacy & Sharing</Typography>
          </Box>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            You control what you share. All sharing is opt-in and can be revoked at any time.
          </Alert>
          
          <FormControlLabel
            control={
              <Switch
                checked={preferences.privacySettings.sexualHealthMasked}
                onChange={(e) => handlePrivacyChange('sexualHealthMasked', e.target.checked)}
              />
            }
            label="Mask Sexual Health Fields"
            sx={{ mb: 2 }}
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={preferences.privacySettings.therapistSharing}
                onChange={(e) => handlePrivacyChange('therapistSharing', e.target.checked)}
              />
            }
            label="Share with Therapist"
            sx={{ mb: 2 }}
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={preferences.privacySettings.partnerSharing}
                onChange={(e) => handlePrivacyChange('partnerSharing', e.target.checked)}
              />
            }
            label="Share with Partner"
            sx={{ mb: 2 }}
          />
          
          {preferences.privacySettings.therapistSharing && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                What to share with therapist:
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {preferences.privacySettings.therapistCategories.map((category) => (
                  <Chip key={category} label={category} size="small" />
                ))}
              </Stack>
            </Box>
          )}
          
          {preferences.privacySettings.partnerSharing && (
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                What to share with partner:
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {preferences.privacySettings.partnerCategories.map((category) => (
                  <Chip key={category} label={category} size="small" />
                ))}
              </Stack>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <DataUsage sx={{ mr: 1 }} />
            <Typography variant="h6">Data Management</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={() => setShowExportDialog(true)}
            >
              Export My Data
            </Button>
            
            <Button
              variant="outlined"
              color="error"
              startIcon={<Delete />}
              onClick={() => setShowDeleteDialog(true)}
            >
              Delete Account
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Reset Preferences */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Reset Preferences
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Reset all preferences to default values. This cannot be undone.
          </Typography>
          <Button
            variant="outlined"
            onClick={resetPreferences}
            startIcon={<Save />}
          >
            Reset to Defaults
          </Button>
        </CardContent>
      </Card>

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data.
          </Typography>
          <TextField
            fullWidth
            label="Type 'DELETE' to confirm"
            variant="outlined"
            placeholder="DELETE"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDeleteAccount} color="error" variant="contained">
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>

      {/* Export Data Dialog */}
      <Dialog open={showExportDialog} onClose={() => setShowExportDialog(false)}>
        <DialogTitle>Export Data</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Choose what data you'd like to export:
          </Typography>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="All logs and entries"
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Preferences and settings"
          />
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Chat history"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowExportDialog(false)}>Cancel</Button>
          <Button onClick={handleExportData} variant="contained">
            Export Data
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings;
