import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { ContactSupport } from '@mui/icons-material';

const Contact: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>Contact Us</Typography>
      <Card>
        <CardContent>
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <ContactSupport sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>Contact Support</Typography>
            <Typography variant="body2" color="text.secondary">
              Get in touch with our support team.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Contact;
