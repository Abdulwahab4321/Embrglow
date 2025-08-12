import React from 'react';
import { Box, Card, CardContent, Typography, Alert } from '@mui/material';
import { HelpOutline as HelpIcon } from '@mui/icons-material';

const Help: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Help & Support</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Get help and find answers to your questions
      </Typography>
      <Alert severity="info" sx={{ mb: 3 }}>
        FAQ, documentation, and support contact information.
      </Alert>
      <Card>
        <CardContent>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <HelpIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>Support Center</Typography>
            <Typography variant="body2" color="text.secondary">
              Find answers to common questions and get support.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Help;
