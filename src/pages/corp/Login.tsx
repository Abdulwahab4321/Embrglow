import React from 'react';
import { Box, Card, CardContent, Typography, Alert, Container } from '@mui/material';
import { Business } from '@mui/icons-material';

const CorpLogin: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Business sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom>
              Corporate Portal Login
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Access your organization's health insights and analytics
            </Typography>
          </Box>
          
          <Alert severity="info" sx={{ mb: 3 }}>
            Corporate portal login functionality coming soon. This will provide HR teams with anonymized health insights and program adoption metrics.
          </Alert>
          
          <Typography variant="body2" color="text.secondary">
            Features will include:
          </Typography>
          <Box component="ul" sx={{ mt: 1, mb: 3 }}>
            <Typography component="li" variant="body2" color="text.secondary">
              Anonymized adoption metrics
            </Typography>
            <Typography component="li" variant="body2" color="text.secondary">
              Program impact analytics
            </Typography>
            <Typography component="li" variant="body2" color="text.secondary">
              Cultural region insights
            </Typography>
            <Typography component="li" variant="body2" color="text.secondary">
              Subscription management
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CorpLogin;
