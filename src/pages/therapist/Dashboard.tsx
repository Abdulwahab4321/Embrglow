import React from 'react';
import { Box, Card, CardContent, Typography, Alert } from '@mui/material';
import { Dashboard } from '@mui/icons-material';

const TherapistDashboard: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Therapist Dashboard</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        View patient summaries and provide feedback
      </Typography>
      <Alert severity="info" sx={{ mb: 3 }}>
        Dashboard for healthcare providers to view patient summaries and send feedback.
      </Alert>
      <Card>
        <CardContent>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Dashboard sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>Patient Summaries</Typography>
            <Typography variant="body2" color="text.secondary">
              View weekly summaries and provide feedback to patients.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TherapistDashboard;
