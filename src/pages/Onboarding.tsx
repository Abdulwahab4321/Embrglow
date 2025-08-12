import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Slider,
  Chip,
  Stack,
  FormGroup,
  Checkbox,
  Alert,
  LinearProgress,
  useTheme,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import { useAnalytics } from '../contexts/AnalyticsContext';

interface OnboardingData {
  // Basics
  ageRange: string;
  phase: 'peri' | 'meno';
  pronouns: string;
  
  // Language & Region
  language: string;
  region: string;
  
  // Goals
  goals: string[];
  
  // Voice
  voiceEnabled: boolean;
  tone: 'nurturing' | 'calm' | 'pragmatic';
  
  // Sharing
  therapistSharing: boolean;
  partnerSharing: boolean;
  therapistCategories: string[];
  partnerCategories: string[];
}

const steps = [
  'Basics',
  'Language & Region',
  'Goals',
  'Voice Preferences',
  'Sharing',
  'Review',
];

const ageRanges = [
  '35-40',
  '41-45',
  '46-50',
  '51-55',
  '56-60',
  '60+',
];

const goals = [
  'Better sleep',
  'Manage hot flashes',
  'Improve mood',
  'Boost energy',
  'Enhance focus',
  'Track symptoms',
  'Understand patterns',
  'Get support',
];

const therapistCategories = [
  'mood',
  'symptoms',
  'remedies',
  'sleep',
  'energy',
  'stress',
];

const partnerCategories = [
  'mood',
  'energy',
  'general wellbeing',
  'support needs',
];

const Onboarding: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    ageRange: '',
    phase: 'peri',
    pronouns: '',
    language: 'en',
    region: 'US',
    goals: [],
    voiceEnabled: true,
    tone: 'nurturing',
    therapistSharing: false,
    partnerSharing: false,
    therapistCategories: ['mood', 'symptoms', 'remedies'],
    partnerCategories: ['mood', 'energy'],
  });

  const { updateUser } = useAuth();
  const { updatePreferences } = useUser();
  const { trackOnboarding } = useAnalytics();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleNext = () => {
    trackOnboarding(`step_${activeStep + 1}`, data);
    
    if (activeStep === steps.length - 1) {
      // Complete onboarding
      handleComplete();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleComplete = async () => {
    try {
      // Update user data
      await updateUser({
        phase: data.phase,
        pronouns: data.pronouns,
        language: data.language,
        region: data.region,
        onboardingComplete: true,
      });

      // Update preferences
      updatePreferences({
        voiceEnabled: data.voiceEnabled,
        tone: data.tone,
        language: data.language,
        region: data.region,
        privacySettings: {
          sexualHealthMasked: true, // Default to masked for privacy
          therapistSharing: data.therapistSharing,
          partnerSharing: data.partnerSharing,
          therapistCategories: data.therapistCategories,
          partnerCategories: data.partnerCategories,
        },
      });

      trackOnboarding('complete', data);
      navigate('/app/home');
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
    }
  };

  const updateData = (updates: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0: // Basics
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Tell us about yourself
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              This helps us personalize your experience
            </Typography>

            <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
              <FormLabel component="legend">Age Range</FormLabel>
              <RadioGroup
                value={data.ageRange}
                onChange={(e) => updateData({ ageRange: e.target.value })}
              >
                {ageRanges.map((range) => (
                  <FormControlLabel
                    key={range}
                    value={range}
                    control={<Radio />}
                    label={range}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
              <FormLabel component="legend">Menopause Phase</FormLabel>
              <RadioGroup
                value={data.phase}
                onChange={(e) => updateData({ phase: e.target.value as 'peri' | 'meno' })}
              >
                <FormControlLabel
                  value="peri"
                  control={<Radio />}
                  label="Perimenopause (irregular periods, symptoms starting)"
                />
                <FormControlLabel
                  value="meno"
                  control={<Radio />}
                  label="Menopause (no periods for 12+ months)"
                />
              </RadioGroup>
            </FormControl>

            <TextField
              label="Pronouns (optional)"
              value={data.pronouns}
              onChange={(e) => updateData({ pronouns: e.target.value })}
              fullWidth
              placeholder="e.g., she/her, they/them"
              helperText="We'll use these when referring to you"
            />
          </Box>
        );

      case 1: // Language & Region
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Language & Region
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              This helps us provide culturally relevant content and defaults
            </Typography>

            <TextField
              select
              label="Language"
              value={data.language}
              onChange={(e) => updateData({ language: e.target.value })}
              fullWidth
              sx={{ mb: 3 }}
            >
              <FormControlLabel value="en" control={<Radio />} label="English" />
              <FormControlLabel value="es" control={<Radio />} label="Español" />
              <FormControlLabel value="fr" control={<Radio />} label="Français" />
            </TextField>

            <TextField
              select
              label="Region"
              value={data.region}
              onChange={(e) => updateData({ region: e.target.value })}
              fullWidth
              helperText="This affects cultural defaults and remedies"
            >
              <FormControlLabel value="US" control={<Radio />} label="United States" />
              <FormControlLabel value="CA" control={<Radio />} label="Canada" />
              <FormControlLabel value="UK" control={<Radio />} label="United Kingdom" />
              <FormControlLabel value="AU" control={<Radio />} label="Australia" />
            </TextField>
          </Box>
        );

      case 2: // Goals
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              What are your goals?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Select all that apply - we'll prioritize these in your experience
            </Typography>

            <FormGroup>
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {goals.map((goal) => (
                  <Chip
                    key={goal}
                    label={goal}
                    onClick={() => {
                      const newGoals = data.goals.includes(goal)
                        ? data.goals.filter(g => g !== goal)
                        : [...data.goals, goal];
                      updateData({ goals: newGoals });
                    }}
                    color={data.goals.includes(goal) ? 'primary' : 'default'}
                    variant={data.goals.includes(goal) ? 'filled' : 'outlined'}
                    sx={{ mb: 1 }}
                  />
                ))}
              </Stack>
            </FormGroup>
          </Box>
        );

      case 3: // Voice Preferences
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Voice & Tone Preferences
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Customize how our AI assistant communicates with you
            </Typography>

            <FormControl component="fieldset" sx={{ mb: 4, width: '100%' }}>
              <FormLabel component="legend">Enable Voice (Lara)</FormLabel>
              <RadioGroup
                value={data.voiceEnabled}
                onChange={(e) => updateData({ voiceEnabled: e.target.value === 'true' })}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Yes, I'd like voice responses"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="No, text only is fine"
                />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" sx={{ width: '100%' }}>
              <FormLabel component="legend">Communication Tone</FormLabel>
              <RadioGroup
                value={data.tone}
                onChange={(e) => updateData({ tone: e.target.value as 'nurturing' | 'calm' | 'pragmatic' })}
              >
                <FormControlLabel
                  value="nurturing"
                  control={<Radio />}
                  label="Nurturing & Supportive"
                />
                <FormControlLabel
                  value="calm"
                  control={<Radio />}
                  label="Calm & Reassuring"
                />
                <FormControlLabel
                  value="pragmatic"
                  control={<Radio />}
                  label="Practical & Direct"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        );

      case 4: // Sharing
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Sharing & Privacy
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              You control what you share. These can be changed anytime in settings.
            </Typography>

            <Alert severity="info" sx={{ mb: 4 }}>
              All sharing is opt-in and can be revoked at any time. Your data is always encrypted and secure.
            </Alert>

            <FormControl component="fieldset" sx={{ mb: 4, width: '100%' }}>
              <FormLabel component="legend">Share with Therapist</FormLabel>
              <RadioGroup
                value={data.therapistSharing}
                onChange={(e) => updateData({ therapistSharing: e.target.value === 'true' })}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Yes, share weekly summaries with my therapist"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="No, keep my data private"
                />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset" sx={{ mb: 4, width: '100%' }}>
              <FormLabel component="legend">Share with Partner</FormLabel>
              <RadioGroup
                value={data.partnerSharing}
                onChange={(e) => updateData({ partnerSharing: e.target.value === 'true' })}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Yes, share insights with my partner"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="No, keep my data private"
                />
              </RadioGroup>
            </FormControl>

            {data.therapistSharing && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  What to share with therapist:
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {therapistCategories.map((category) => (
                    <Chip
                      key={category}
                      label={category}
                      onClick={() => {
                        const newCategories = data.therapistCategories.includes(category)
                          ? data.therapistCategories.filter(c => c !== category)
                          : [...data.therapistCategories, category];
                        updateData({ therapistCategories: newCategories });
                      }}
                      color={data.therapistCategories.includes(category) ? 'primary' : 'default'}
                      variant={data.therapistCategories.includes(category) ? 'filled' : 'outlined'}
                    />
                  ))}
                </Stack>
              </Box>
            )}

            {data.partnerSharing && (
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  What to share with partner:
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {partnerCategories.map((category) => (
                    <Chip
                      key={category}
                      label={category}
                      onClick={() => {
                        const newCategories = data.partnerCategories.includes(category)
                          ? data.partnerCategories.filter(c => c !== category)
                          : [...data.partnerCategories, category];
                        updateData({ partnerCategories: newCategories });
                      }}
                      color={data.partnerCategories.includes(category) ? 'primary' : 'default'}
                      variant={data.partnerCategories.includes(category) ? 'filled' : 'outlined'}
                    />
                  ))}
                </Stack>
              </Box>
            )}
          </Box>
        );

      case 5: // Review
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Review Your Preferences
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Here's what we've captured. You can always change these later in settings.
            </Typography>

            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Basics</Typography>
                <Typography variant="body2" color="text.secondary">
                  Age: {data.ageRange} • Phase: {data.phase === 'peri' ? 'Perimenopause' : 'Menopause'}
                  {data.pronouns && ` • Pronouns: ${data.pronouns}`}
                </Typography>
              </CardContent>
            </Card>

            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Goals</Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {data.goals.map((goal) => (
                    <Chip key={goal} label={goal} size="small" />
                  ))}
                </Stack>
              </CardContent>
            </Card>

            <Card variant="outlined" sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Voice & Tone</Typography>
                <Typography variant="body2" color="text.secondary">
                  Voice: {data.voiceEnabled ? 'Enabled' : 'Disabled'} • Tone: {data.tone}
                </Typography>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>Sharing</Typography>
                <Typography variant="body2" color="text.secondary">
                  Therapist: {data.therapistSharing ? 'Enabled' : 'Disabled'}
                  {data.therapistSharing && ` (${data.therapistCategories.join(', ')})`}
                  <br />
                  Partner: {data.partnerSharing ? 'Enabled' : 'Disabled'}
                  {data.partnerSharing && ` (${data.partnerCategories.join(', ')})`}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (activeStep) {
      case 0:
        return data.ageRange && data.phase;
      case 1:
        return data.language && data.region;
      case 2:
        return data.goals.length > 0;
      case 3:
        return true; // Voice preferences are optional
      case 4:
        return true; // Sharing is optional
      case 5:
        return true;
      default:
        return false;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #E91E6315 0%, #9C27B015 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Card sx={{ boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" component="h1" textAlign="center" fontWeight="bold" gutterBottom>
                Welcome! Let's personalize your experience
              </Typography>
              
              <LinearProgress
                variant="determinate"
                value={((activeStep + 1) / steps.length) * 100}
                sx={{ height: 8, borderRadius: 4, mb: 3 }}
              />
              
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>

            <Box sx={{ mb: 4, minHeight: 400 }}>
              {renderStepContent()}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!canProceed()}
              >
                {activeStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Onboarding;
