import React from 'react';
import { Box, Card, CardContent, Typography, Alert } from '@mui/material';
import { Person } from '@mui/icons-material';

const TherapistLogin: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Therapist Portal</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Access patient summaries and provide feedback
      </Typography>
      <Alert severity="info" sx={{ mb: 3 }}>
        Secure login for healthcare providers to view patient summaries.
      </Alert>
      <Card>
        <CardContent>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Person sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>Therapist Login</Typography>
            <Typography variant="body2" color="text.secondary">
              Secure access to patient summaries and feedback tools.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TherapistLogin;
