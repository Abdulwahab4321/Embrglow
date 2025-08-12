import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Description } from '@mui/icons-material';

const Terms: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Terms of Service</Typography>
      <Card>
        <CardContent>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Description sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>Terms of Service</Typography>
            <Typography variant="body2" color="text.secondary">
              Terms and conditions for using our service.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Terms;
