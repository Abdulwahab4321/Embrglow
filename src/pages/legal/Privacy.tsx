import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { Security } from '@mui/icons-material';

const Privacy: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Privacy Policy</Typography>
      <Card>
        <CardContent>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Security sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>Privacy Policy</Typography>
            <Typography variant="body2" color="text.secondary">
              Our commitment to protecting your privacy and data security.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Privacy;
