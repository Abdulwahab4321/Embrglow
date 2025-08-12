import React from 'react';
import { Box, Card, CardContent, Typography, Alert } from '@mui/material';
import { Timeline } from '@mui/icons-material';

const DeepLog: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Detailed Log</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Comprehensive symptom and wellness tracking
      </Typography>
      <Alert severity="info" sx={{ mb: 3 }}>
        Detailed logging with customizable sections for comprehensive symptom tracking.
      </Alert>
      <Card>
        <CardContent>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Timeline sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>Detailed Tracking</Typography>
            <Typography variant="body2" color="text.secondary">
              Comprehensive logging with customizable sections and privacy controls.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DeepLog;
