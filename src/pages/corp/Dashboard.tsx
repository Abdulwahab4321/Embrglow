import React from 'react';
import { Box, Card, CardContent, Typography, Alert } from '@mui/material';
import { Analytics } from '@mui/icons-material';

const CorpDashboard: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Corporate Dashboard</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Program analytics and insights
      </Typography>
      <Alert severity="info" sx={{ mb: 3 }}>
        Anonymized analytics and insights for HR professionals.
      </Alert>
      <Card>
        <CardContent>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Analytics sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>Program Analytics</Typography>
            <Typography variant="body2" color="text.secondary">
              View anonymized program adoption and impact metrics.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CorpDashboard;
