import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Link,
  Divider
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  Business,
  Group,
  Timeline
} from '@mui/icons-material';

const AboutUs = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        {/* Company Introduction */}
        <Typography variant="h4" gutterBottom color="primary" align="center">
          About Our Company
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          Welcome to our CRM system. We are dedicated to providing efficient customer relationship 
          management solutions that help businesses grow and succeed.
        </Typography>

        <Divider sx={{ my: 4 }} />

        {/* Mission & Vision */}
        <Grid container spacing={4} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Business color="primary" sx={{ mr: 2 }} />
              <Typography variant="h6">Our Mission</Typography>
            </Box>
            <Typography variant="body1">
              To provide innovative CRM solutions that empower businesses to build stronger 
              relationships with their customers.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Timeline color="primary" sx={{ mr: 2 }} />
              <Typography variant="h6">Our Vision</Typography>
            </Box>
            <Typography variant="body1">
              To become the leading CRM solution provider, known for excellence and innovation 
              in customer relationship management.
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Team Section */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Group color="primary" sx={{ mr: 2 }} />
            <Typography variant="h5">Our Team</Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Vishal Talsaniya</Typography>
              <Typography variant="body2" color="text.secondary">
                Lead Developer & Co-founder
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Purv</Typography>
              <Typography variant="body2" color="text.secondary">
                UI/UX Designer & Co-founder
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Contact Information */}
        <Box>
          <Typography variant="h5" gutterBottom color="primary">
            Contact Us
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOn color="primary" sx={{ mr: 2 }} />
                <Typography>
                  Limboda, Botad, Gujarat
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Phone color="primary" sx={{ mr: 2 }} />
                <Link 
                  href="tel:6356079776" 
                  underline="hover" 
                  sx={{ color: 'text.primary' }}
                >
                  +91 6356079776
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Email color="primary" sx={{ mr: 2 }} />
                <Link 
                  href="mailto:vishaltalsaniya991@gmail.com" 
                  underline="hover" 
                  sx={{ color: 'text.primary' }}
                >
                  vishaltalsaniya991@gmail.com
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Footer */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} All Rights Reserved - Vishal & Purv
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUs;