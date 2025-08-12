import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Stack,
  Chip,
  useTheme,
  useMediaQuery,
  Avatar,
  IconButton,
} from '@mui/material';
import {
  Chat,
  Timeline,
  Explore as Compass,
  Security,
  Favorite,
  Psychology,
  Support,
  Verified,
  ArrowForward,
  PlayArrow,
  Star,
  AccessTime,
  Group,
  HealthAndSafety,
  Translate,
  Lock,
  Visibility,
} from '@mui/icons-material';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useAnalytics } from '../contexts/AnalyticsContext';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { trackCTA } = useAnalytics();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const handleGetStarted = () => {
    trackCTA('signup', 'hero');
    navigate('/signup');
  };

  // const handleLearnMore = () => {
  //   trackCTA('learn_more', 'hero');
  //   document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  // };

  const handleFeatureClick = (featureName: string) => {
    trackCTA('feature_click', featureName);
    // In a real app, this would navigate to the specific feature
    console.log(`Clicked on ${featureName}`);
  };

  const handleWatchDemo = () => {
    trackCTA('watch_demo', 'hero');
    setIsVideoPlaying(true);
  };

  const features = [
    {
      icon: Chat,
      title: 'AI Chat Assistant',
      description: 'Get empathetic support with our M→N→O sequence: Mirror your feelings, Normalize your experience, Offer personalized guidance.',
      color: '#E91E63',
      benefits: ['24/7 Support', 'Cultural Sensitivity', 'Quick Facts Mode'],
    },
    {
      icon: Timeline,
      title: 'Smart Tracker',
      description: 'Lightweight daily logs or detailed deep tracking. Understand your patterns with visual insights and correlations.',
      color: '#9C27B0',
      benefits: ['Soft & Deep Logs', 'Pattern Recognition', 'Export Data'],
    },
    {
      icon: Compass,
      title: 'Partner Compass',
      description: 'Help partners understand and support your journey with adaptive suggestions and privacy-safe insights.',
      color: '#2196F3',
      benefits: ['Action Logging', 'Adaptive Suggestions', 'Privacy Controls'],
    },
  ];

  const trustFeatures = [
    {
      icon: Security,
      title: 'Privacy First',
      description: 'Your data is yours. Granular control over what you share with partners and therapists.',
      details: 'End-to-end encryption, HIPAA compliance, and complete data ownership.',
    },
    {
      icon: Psychology,
      title: 'Cultural Sensitivity',
      description: 'Respectful of diverse cultural practices, terminology, and traditional remedies.',
      details: 'Multi-language support, cultural glossary, and region-specific defaults.',
    },
    {
      icon: Support,
      title: 'Compassionate Support',
      description: 'Always here when you need us, with understanding and evidence-based guidance.',
      details: 'Women-led team, 24/7 availability, and community-driven insights.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      phase: 'Perimenopause',
      text: 'This app has been a game-changer. The AI chat understands exactly what I\'m going through.',
      rating: 5,
    },
    {
      name: 'Maria L.',
      phase: 'Menopause',
      text: 'The cultural sensitivity and glossary helped me understand terms from my community.',
      rating: 5,
    },
    {
      name: 'Jennifer K.',
      phase: 'Postmenopause',
      text: 'My partner uses the Compass feature and it\'s made our communication so much better.',
      rating: 5,
    },
  ];

  const stats = [
    { number: '50K+', label: 'Women Supported', icon: Group },
    { number: '95%', label: 'Satisfaction Rate', icon: Star },
    { number: '24/7', label: 'AI Support', icon: AccessTime },
    { number: '15+', label: 'Languages', icon: Translate },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
             {/* Hero Section with Enhanced Animation */}
       <motion.div
         style={{ opacity, scale }}
         initial={{ opacity: 0, y: 50 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8 }}
       >
                   <Box
            sx={{
              background: `linear-gradient(135deg, rgba(233, 30, 99, 0.03) 0%, rgba(156, 39, 176, 0.03) 50%, rgba(33, 150, 243, 0.02) 100%)`,
              pt: { xs: 2, md: 4 },
              pb: { xs: 8, md: 16 },
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 20% 80%, rgba(233, 30, 99, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(156, 39, 176, 0.05) 0%, transparent 50%)',
                zIndex: 0,
              },
            }}
          >
           <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
             {/* Logo and Sign In Button Row */}
             <Box
               sx={{
                 display: 'flex',
                 justifyContent: 'space-between',
                 alignItems: 'center',
                 mb: { xs: 4, md: 6 },
               }}
             >
               {/* Logo */}
               <motion.div
                 initial={{ opacity: 0, x: -30 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.6, delay: 0.2 }}
                 whileHover={{ scale: 1.05 }}
               >
                 <Box
                   sx={{
                     display: 'flex',
                     alignItems: 'center',
                     cursor: 'pointer',
                   }}
                   onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                 >
                   <Box
                     sx={{
                       width: 56,
                       height: 56,
                       borderRadius: '16px',
                       background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       mr: 2,
                       boxShadow: '0 8px 24px rgba(233, 30, 99, 0.3)',
                       position: 'relative',
                       '&::before': {
                         content: '""',
                         position: 'absolute',
                         top: -3,
                         left: -3,
                         right: -3,
                         bottom: -3,
                         borderRadius: '19px',
                         background: `linear-gradient(135deg, ${theme.palette.primary.light}30, ${theme.palette.secondary.light}30)`,
                         zIndex: -1,
                       },
                     }}
                   >
                     <Favorite sx={{ color: 'white', fontSize: 32 }} />
                   </Box>
                   <Box>
                     <Typography
                       variant="h5"
                       sx={{
                         fontWeight: 700,
                         background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                         backgroundClip: 'text',
                         WebkitBackgroundClip: 'text',
                         WebkitTextFillColor: 'transparent',
                         letterSpacing: '-0.5px',
                       }}
                     >
                       MenoCare
                     </Typography>
                     <Typography
                       variant="caption"
                       sx={{
                         color: theme.palette.text.secondary,
                         fontWeight: 500,
                         letterSpacing: '0.5px',
                         textTransform: 'uppercase',
                         fontSize: '0.75rem',
                       }}
                     >
                       Your Health Journey
                     </Typography>
                   </Box>
                 </Box>
               </motion.div>

               {/* Sign In Button */}
               <motion.div
                 initial={{ opacity: 0, x: 30 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.6, delay: 0.3 }}
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
               >
                 <Button
                   variant="outlined"
                   size="large"
                   onClick={() => navigate('/login')}
                   sx={{
                     borderColor: theme.palette.primary.main,
                     color: theme.palette.primary.main,
                     fontWeight: 600,
                     px: 4,
                     py: 1.5,
                     borderRadius: '30px',
                     textTransform: 'none',
                     fontSize: '1rem',
                     boxShadow: '0 4px 16px rgba(233, 30, 99, 0.15)',
                     '&:hover': {
                       borderColor: theme.palette.primary.dark,
                       backgroundColor: `${theme.palette.primary.main}08`,
                       boxShadow: '0 6px 20px rgba(233, 30, 99, 0.25)',
                     },
                   }}
                 >
                   Sign In
                 </Button>
               </motion.div>
             </Box>

             {/* Main Hero Content */}
             <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 6, alignItems: 'center' }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Typography
                  variant={isMobile ? 'h3' : 'h2'}
                  component="h1"
                  fontWeight="bold"
                  color="text.primary"
                  gutterBottom
                  sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 2,
                  }}
                >
                  Your Journey Through
                  <Box component="span" display="block" sx={{ 
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    Menopause
                  </Box>
                  Supported & Understood
                </Typography>
                
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{ mb: 4, lineHeight: 1.8, fontSize: '1.1rem' }}
                >
                  Navigate this transformative phase with AI-powered insights, 
                  cultural sensitivity, and compassionate support designed specifically for you.
                  Join thousands of women who are finding clarity and confidence.
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleGetStarted}
                      endIcon={<ArrowForward />}
                      sx={{
                        py: 1.5,
                        px: 4,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        boxShadow: '0 8px 32px rgba(233, 30, 99, 0.3)',
                        '&:hover': {
                          background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                          boxShadow: '0 12px 40px rgba(233, 30, 99, 0.4)',
                        },
                      }}
                    >
                      Get Started Free
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={handleWatchDemo}
                      startIcon={<PlayArrow />}
                      sx={{
                        py: 1.5,
                        px: 4,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        '&:hover': {
                          borderColor: theme.palette.primary.dark,
                          backgroundColor: `${theme.palette.primary.main}08`,
                        },
                      }}
                    >
                      Watch Demo
                    </Button>
                  </motion.div>
                </Stack>

                <Stack direction="row" spacing={3} alignItems="center">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Star sx={{ color: '#FFD700', mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      4.9/5 from 2,000+ reviews
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Verified sx={{ color: 'success.main', mr: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      HIPAA Compliant
                    </Typography>
                  </Box>
                </Stack>
              </motion.div>

                                                           <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: { xs: 350, md: 550 },
                      position: 'relative',
                    }}
                  >
                    {/* Hero Image with Enhanced Design */}
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: 280, md: 450 },
                          height: { xs: 280, md: 450 },
                          borderRadius: '30px',
                          position: 'relative',
                          overflow: 'hidden',
                          boxShadow: '0 25px 80px rgba(233, 30, 99, 0.25)',
                          filter: 'drop-shadow(0 12px 40px rgba(233, 30, 99, 0.4))',
                          border: `3px solid ${theme.palette.primary.light}30`,
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `linear-gradient(135deg, rgba(233, 30, 99, 0.1) 0%, rgba(156, 39, 176, 0.1) 100%)`,
                            zIndex: 1,
                          },
                        }}
                      >
                        {/* Hero Image */}
                        <Box
                          component="img"
                          src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                          alt="Woman embracing health and wellness journey"
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'relative',
                            zIndex: 0,
                          }}
                        />
                        
                        {/* Overlay with Text */}
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: 'linear-gradient(transparent 0%, rgba(0,0,0,0.7) 100%)',
                            color: 'white',
                            p: 3,
                            zIndex: 2,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              textAlign: 'center',
                              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                            }}
                          >
                            Your Health Journey
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              textAlign: 'center',
                              opacity: 0.9,
                              mt: 0.5,
                              textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                            }}
                          >
                            Supported & Understood
                          </Typography>
                        </Box>
                      </Box>
                    </motion.div>
                    
                    {/* Floating Elements Around Image */}
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{
                        position: 'absolute',
                        top: '8%',
                        right: '8%',
                      }}
                    >
                      <Box
                        sx={{
                          width: 70,
                          height: 70,
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 12px 35px rgba(233, 30, 99, 0.3)',
                          border: '2px solid rgba(255,255,255,0.3)',
                        }}
                      >
                        <Chat sx={{ color: 'white', fontSize: 28 }} />
                      </Box>
                    </motion.div>

                    <motion.div
                      animate={{
                        y: [0, -20, 0],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.5,
                      }}
                      style={{
                        position: 'absolute',
                        bottom: '15%',
                        left: '3%',
                      }}
                    >
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, ${theme.palette.secondary.light}, ${theme.palette.primary.light})`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 10px 30px rgba(156, 39, 176, 0.3)',
                          border: '2px solid rgba(255,255,255,0.3)',
                        }}
                      >
                        <Timeline sx={{ color: 'white', fontSize: 24 }} />
                      </Box>
                    </motion.div>

                    {/* Additional Floating Elements */}
                    <motion.div
                      animate={{
                        x: [0, 10, 0],
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                      }}
                      style={{
                        position: 'absolute',
                        top: '60%',
                        right: '5%',
                      }}
                    >
                      <Box
                        sx={{
                          width: 45,
                          height: 45,
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, ${theme.palette.secondary.main}40, ${theme.palette.primary.main}40)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 8px 25px rgba(156, 39, 176, 0.25)',
                          border: '2px solid rgba(255,255,255,0.2)',
                        }}
                      >
                        <Star sx={{ color: theme.palette.secondary.main, fontSize: 20 }} />
                      </Box>
                    </motion.div>

                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 3,
                      }}
                      style={{
                        position: 'absolute',
                        bottom: '40%',
                        left: '8%',
                      }}
                    >
                      <Box
                        sx={{
                          width: 35,
                          height: 35,
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}30, ${theme.palette.secondary.main}30)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 6px 20px rgba(233, 30, 99, 0.2)',
                          border: '1px solid rgba(255,255,255,0.2)',
                        }}
                      >
                        <Verified sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
                      </Box>
                    </motion.div>
                  </Box>
                </motion.div>
            </Box>
          </Container>
        </Box>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
                 <Box 
           sx={{ 
             py: { xs: 8, md: 12 }, 
             background: `linear-gradient(135deg, rgba(233, 30, 99, 0.02) 0%, rgba(156, 39, 176, 0.02) 50%, rgba(33, 150, 243, 0.01) 100%)`,
             position: 'relative',
             overflow: 'hidden',
             '&::before': {
               content: '""',
               position: 'absolute',
               top: 0,
               left: 0,
               right: 0,
               bottom: 0,
               background: 'radial-gradient(circle at 25% 25%, rgba(233, 30, 99, 0.03) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(156, 39, 176, 0.03) 0%, transparent 50%)',
               zIndex: 0,
             },
           }}
         >
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h3"
                component="h2"
                textAlign="center"
                fontWeight="bold"
                gutterBottom
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 6,
                }}
              >
                Trusted by Thousands
              </Typography>
            </motion.div>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 4 }}>
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <Card
                      sx={{
                        textAlign: 'center',
                        p: 3,
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
                          transform: 'translateY(-8px)',
                        },
                      }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                      >
                        <Box
                          sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 2,
                            boxShadow: '0 8px 24px rgba(233, 30, 99, 0.2)',
                          }}
                        >
                          <Icon sx={{ color: 'white', fontSize: 32 }} />
                        </Box>
                      </motion.div>
                      <Typography 
                        variant="h3" 
                        component="div" 
                        fontWeight="bold" 
                        sx={{
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          mb: 1,
                        }}
                      >
                        {stat.number}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" fontWeight={500}>
                        {stat.label}
                      </Typography>
                    </Card>
                  </motion.div>
                );
              })}
            </Box>
          </Container>
        </Box>
      </motion.div>

      {/* Features Section */}
             <Box 
         id="features" 
         sx={{ 
           py: { xs: 8, md: 12 },
           background: `linear-gradient(135deg, rgba(233, 30, 99, 0.01) 0%, rgba(156, 39, 176, 0.01) 50%, rgba(33, 150, 243, 0.005) 100%)`,
           position: 'relative',
           overflow: 'hidden',
           '&::before': {
             content: '""',
             position: 'absolute',
             top: 0,
             left: 0,
             right: 0,
             bottom: 0,
             background: 'radial-gradient(circle at 20% 80%, rgba(233, 30, 99, 0.02) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(156, 39, 176, 0.02) 0%, transparent 50%)',
             zIndex: 0,
           },
         }}
       >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h3"
              component="h2"
              textAlign="center"
              fontWeight="bold"
              gutterBottom
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 3,
              }}
            >
              Everything You Need
            </Typography>
            
            <Typography
              variant="h6"
              color="text.secondary"
              textAlign="center"
              sx={{ mb: 8, maxWidth: 700, mx: 'auto', lineHeight: 1.6 }}
            >
              Comprehensive tools designed with your unique needs in mind, backed by AI and cultural sensitivity
            </Typography>
          </motion.div>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      transition: 'all 0.3s ease-in-out',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.9) 100%)',
                      },
                    }}
                    onClick={() => handleFeatureClick(feature.title)}
                  >
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                                               <Box
                         sx={{
                           width: 120,
                           height: 120,
                           borderRadius: '50%',
                           background: `linear-gradient(135deg, rgba(233, 30, 99, 0.08), rgba(156, 39, 176, 0.08))`,
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           mx: 'auto',
                           mb: 3,
                           border: `3px solid rgba(233, 30, 99, 0.15)`,
                           boxShadow: `0 8px 32px rgba(233, 30, 99, 0.1)`,
                         }}
                       >
                                                     <Icon
                             sx={{
                               fontSize: 56,
                               color: theme.palette.primary.main,
                             }}
                           />
                        </Box>
                      </motion.div>
                      
                                             <Typography
                         variant="h5"
                         component="h3"
                         fontWeight="bold"
                         gutterBottom
                         sx={{ mb: 2, color: theme.palette.primary.main }}
                       >
                         {feature.title}
                       </Typography>
                      
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ lineHeight: 1.7, mb: 4 }}
                      >
                        {feature.description}
                      </Typography>

                      <Stack spacing={2}>
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <motion.div
                            key={benefitIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: benefitIndex * 0.1 }}
                            viewport={{ once: true }}
                          >
                                                         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                               <Box
                                 sx={{
                                   width: 8,
                                   height: 8,
                                   borderRadius: '50%',
                                   backgroundColor: theme.palette.primary.main,
                                   mr: 2,
                                   boxShadow: `0 2px 8px rgba(233, 30, 99, 0.2)`,
                                 }}
                               />
                              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                                {benefit}
                              </Typography>
                            </Box>
                          </motion.div>
                        ))}
                      </Stack>

                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        viewport={{ once: true }}
                      >
                                                 <Button
                           variant="outlined"
                           size="small"
                           sx={{
                             mt: 3,
                             borderColor: theme.palette.primary.main,
                             color: theme.palette.primary.main,
                             '&:hover': {
                               borderColor: theme.palette.primary.main,
                               backgroundColor: `${theme.palette.primary.main}10`,
                             },
                           }}
                         >
                           Learn More
                         </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </Box>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
                 <Box 
           sx={{ 
             py: { xs: 8, md: 12 }, 
             background: `linear-gradient(135deg, rgba(233, 30, 99, 0.02) 0%, rgba(156, 39, 176, 0.02) 50%, rgba(33, 150, 243, 0.01) 100%)`,
             position: 'relative',
             overflow: 'hidden',
             '&::before': {
               content: '""',
               position: 'absolute',
               top: 0,
               left: 0,
               right: 0,
               bottom: 0,
               background: 'radial-gradient(circle at 30% 30%, rgba(233, 30, 99, 0.03) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(156, 39, 176, 0.03) 0%, transparent 50%)',
               zIndex: 0,
             },
           }}
         >
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h3"
                component="h2"
                textAlign="center"
                fontWeight="bold"
                gutterBottom
                sx={{ 
                  mb: 6,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                What Women Are Saying
              </Typography>
            </motion.div>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      p: 4,
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
                        transform: 'translateY(-8px)',
                      },
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <Star sx={{ color: '#FFD700', fontSize: 24, mr: 0.5 }} />
                          </motion.div>
                        ))}
                      </Box>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mb: 4, fontStyle: 'italic', lineHeight: 1.7, fontSize: '1.1rem' }}
                      >
                        "{testimonial.text}"
                      </Typography>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          sx={{
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            mr: 2,
                            width: 48,
                            height: 48,
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                          }}
                        >
                          {testimonial.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                            {testimonial.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.8 }}>
                            {testimonial.phase}
                          </Typography>
                        </Box>
                      </Box>
                    </motion.div>
                  </Card>
                </motion.div>
              ))}
            </Box>
          </Container>
        </Box>
      </motion.div>

      {/* Trust & Privacy Section */}
             <Box 
         sx={{ 
           py: { xs: 8, md: 12 },
           background: `linear-gradient(135deg, rgba(233, 30, 99, 0.01) 0%, rgba(156, 39, 176, 0.01) 50%, rgba(33, 150, 243, 0.005) 100%)`,
           position: 'relative',
           overflow: 'hidden',
           '&::before': {
             content: '""',
             position: 'absolute',
             top: 0,
             left: 0,
             right: 0,
             bottom: 0,
             background: 'radial-gradient(circle at 25% 75%, rgba(233, 30, 99, 0.02) 0%, transparent 50%), radial-gradient(circle at 75% 25%, rgba(156, 39, 176, 0.02) 0%, transparent 50%)',
             zIndex: 0,
           },
         }}
       >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h3"
              component="h2"
              textAlign="center"
              fontWeight="bold"
              gutterBottom
              sx={{ 
                mb: 6,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Trust & Privacy
            </Typography>
            
            <Typography
              variant="h6"
              color="text.secondary"
              textAlign="center"
              sx={{ mb: 8, maxWidth: 700, mx: 'auto', lineHeight: 1.6 }}
            >
              Your privacy and trust are our top priorities. We're committed to protecting your data and providing a safe, supportive environment.
            </Typography>
          </motion.div>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4, mb: 6 }}>
            {trustFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <Card
                    sx={{
                      textAlign: 'center',
                      p: 4,
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        boxShadow: '0 16px 48px rgba(0,0,0,0.15)',
                        transform: 'translateY(-8px)',
                      },
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Box
                        sx={{
                          width: 100,
                          height: 100,
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 3,
                          boxShadow: '0 8px 32px rgba(233, 30, 99, 0.2)',
                        }}
                      >
                        <Icon
                          sx={{
                            fontSize: 48,
                            color: 'white',
                          }}
                        />
                      </Box>
                    </motion.div>
                    
                    <Typography
                      variant="h5"
                      component="h3"
                      fontWeight="bold"
                      gutterBottom
                      sx={{ mb: 2, color: theme.palette.primary.main }}
                    >
                      {feature.title}
                    </Typography>
                    
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ lineHeight: 1.6, mb: 3 }}
                    >
                      {feature.description}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.5, opacity: 0.8, fontStyle: 'italic' }}
                    >
                      {feature.details}
                    </Typography>
                  </Card>
                </motion.div>
              );
            })}
          </Box>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" flexWrap="wrap">
                {[
                  { icon: HealthAndSafety, label: "HIPAA Compliant", color: "success" },
                  { icon: Lock, label: "End-to-End Encrypted", color: "primary" },
                  { icon: Group, label: "Women-Led Team", color: "secondary" },
                  { icon: Visibility, label: "Transparent Privacy", color: "info" },
                ].map((chip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Chip
                      icon={<chip.icon />}
                      label={chip.label}
                      color={chip.color as any}
                      variant="outlined"
                      sx={{ 
                        fontSize: '0.9rem', 
                        py: 1.5,
                        px: 2,
                        fontWeight: 500,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        '&:hover': {
                          boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                        },
                      }}
                    />
                  </motion.div>
                ))}
              </Stack>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Final CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
                 <Box
           sx={{
             py: { xs: 8, md: 12 },
             background: `linear-gradient(135deg, rgba(233, 30, 99, 0.03) 0%, rgba(156, 39, 176, 0.03) 50%, rgba(33, 150, 243, 0.02) 100%)`,
             position: 'relative',
             overflow: 'hidden',
             '&::before': {
               content: '""',
               position: 'absolute',
               top: 0,
               left: 0,
               right: 0,
               bottom: 0,
               background: 'radial-gradient(circle at 30% 70%, rgba(233, 30, 99, 0.04) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(156, 39, 176, 0.04) 0%, transparent 50%)',
               zIndex: 0,
             },
           }}
         >
          <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h3"
                component="h2"
                fontWeight="bold"
                gutterBottom
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 3,
                }}
              >
                Ready to Start Your Journey?
              </Typography>
              
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mb: 6, lineHeight: 1.7, maxWidth: 600, mx: 'auto' }}
              >
                Join thousands of women who are navigating this phase with confidence, support, and understanding. 
                Your journey is unique, and we're here to support you every step of the way.
              </Typography>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleGetStarted}
                  endIcon={<ArrowForward />}
                  sx={{
                    py: 2,
                    px: 6,
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    boxShadow: '0 12px 40px rgba(233, 30, 99, 0.3)',
                    '&:hover': {
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                      boxShadow: '0 16px 50px rgba(233, 30, 99, 0.4)',
                    },
                  }}
                >
                  Get Started Today - It's Free
                </Button>
              </motion.div>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 3, opacity: 0.8 }}
              >
                No credit card required • 30-day free trial • Cancel anytime
              </Typography>
            </Box>
          </Container>
        </Box>
      </motion.div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.8)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={() => setIsVideoPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={{
                width: '90%',
                maxWidth: 800,
                height: 'auto',
                backgroundColor: 'white',
                borderRadius: 16,
                padding: 20,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Box sx={{ position: 'relative' }}>
                <IconButton
                  onClick={() => setIsVideoPlaying(false)}
                  sx={{
                    position: 'absolute',
                    top: -10,
                    right: -10,
                    bgcolor: 'white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    '&:hover': { bgcolor: 'grey.100' },
                  }}
                >
                  <Typography variant="h6">×</Typography>
                </IconButton>
                <Box
                  sx={{
                    width: '100%',
                    height: 400,
                    bgcolor: 'grey.200',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    Demo Video Coming Soon
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Welcome;
