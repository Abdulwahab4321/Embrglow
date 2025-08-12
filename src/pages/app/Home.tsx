import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
  LinearProgress,
  Alert,
  Skeleton,
  useTheme,
} from '@mui/material';
import {
  Chat,
  Timeline,
  Insights,
  Explore as Compass,
  Waves,
  Share,
  TrendingUp,
  LocalFireDepartment,
  Bedtime,
  Lightbulb,
  Notifications,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { useAnalytics } from '../../contexts/AnalyticsContext';

interface DashboardData {
  mood: {
    today: number;
    trend: 'up' | 'down' | 'stable';
  };
  hotFlashes: {
    lastTrigger: string;
    count: number;
  };
  sleep: {
    lastNight: number;
    quality: 'good' | 'fair' | 'poor';
  };
  energy: {
    level: 'low' | 'mid' | 'high';
    trend: 'up' | 'down' | 'stable';
  };
  insights: {
    patterns: string[];
    suggestions: string[];
  };
}

const Home: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { trackHomeTile } = useAnalytics();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    // Simulate loading dashboard data
    const loadDashboardData = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setDashboardData({
          mood: {
            today: 7,
            trend: 'up',
          },
          hotFlashes: {
            lastTrigger: 'Caffeine (2pm)',
            count: 3,
          },
          sleep: {
            lastNight: 7.5,
            quality: 'good',
          },
          energy: {
            level: 'mid',
            trend: 'stable',
          },
          insights: {
            patterns: [
              'Hot flashes ↑ after caffeine (2-4pm)',
              'Better sleep with evening routine',
              'Mood improves with morning exercise',
            ],
            suggestions: [
              'Try herbal tea instead of coffee',
              'Consider evening meditation',
              'Track your exercise patterns',
            ],
          },
        });
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const quickTiles = [
    {
      title: 'Chat Now',
      description: 'Get support & insights',
      icon: Chat,
      color: '#E91E63',
      path: '/app/chat',
      action: 'chat',
    },
    {
      title: 'Log Today',
      description: 'Quick daily check-in',
      icon: Timeline,
      color: '#9C27B0',
      path: '/app/tracker/soft',
      action: 'soft_log',
    },
    {
      title: 'EmberTides',
      description: 'Visual energy tracking',
      icon: Waves,
      color: '#2196F3',
      path: '/app/embertides',
      action: 'embertides',
    },
    {
      title: 'Insights',
      description: 'View patterns & trends',
      icon: Insights,
      color: '#4CAF50',
      path: '/app/insights',
      action: 'insights',
    },
    {
      title: 'Compass',
      description: 'Partner support guide',
      icon: Compass,
      color: '#FF9800',
      path: '/app/compass',
      action: 'compass',
    },
    {
      title: 'Therapist Summary',
      description: 'Share with your therapist',
      icon: Share,
      color: '#795548',
      path: '/app/therapist/share',
      action: 'therapist_share',
    },
  ];

  const handleTileClick = (action: string, path: string) => {
    trackHomeTile(action);
    navigate(path);
  };

  const getMoodColor = (mood: number) => {
    if (mood >= 7) return theme.palette.success.main;
    if (mood >= 4) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  const getSleepQualityColor = (quality: string) => {
    switch (quality) {
      case 'good': return theme.palette.success.main;
      case 'fair': return theme.palette.warning.main;
      case 'poor': return theme.palette.error.main;
      default: return theme.palette.grey[500];
    }
  };

  const getEnergyColor = (level: string) => {
    switch (level) {
      case 'high': return theme.palette.success.main;
      case 'mid': return theme.palette.warning.main;
      case 'low': return theme.palette.error.main;
      default: return theme.palette.grey[500];
    }
  };

  if (loading) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          Welcome back, {user?.name || 'there'}!
        </Typography>
                 <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
           {quickTiles.map((tile, index) => (
             <Box key={index}>
               <Skeleton variant="rectangular" height={120} />
             </Box>
           ))}
         </Box>
      </Box>
    );
  }

  return (
    <Box>
      {/* Welcome Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {user?.name || 'there'}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's your daily overview and quick actions
        </Typography>
      </Box>

             {/* Quick Tiles */}
       <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3, mb: 4 }}>
         {quickTiles.map((tile, index) => {
           const Icon = tile.icon;
           return (
             <Box key={index}>
               <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                  },
                }}
                onClick={() => handleTileClick(tile.action, tile.path)}
              >
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      backgroundColor: `${tile.color}15`,
                      color: tile.color,
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    <Icon sx={{ fontSize: 30 }} />
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {tile.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tile.description}
                  </Typography>
                                 </CardContent>
               </Card>
             </Box>
           );
         })}
       </Box>

             {/* Mini Widgets */}
       <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3, mb: 4 }}>
         {/* Mood Today */}
         <Box>
           <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp sx={{ mr: 1, color: getMoodColor(dashboardData!.mood.today) }} />
                <Typography variant="h6">Mood Today</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h3" sx={{ color: getMoodColor(dashboardData!.mood.today), mr: 2 }}>
                  {dashboardData!.mood.today}/10
                </Typography>
                <Chip
                  label={dashboardData!.mood.trend === 'up' ? 'Improving' : dashboardData!.mood.trend === 'down' ? 'Declining' : 'Stable'}
                  color={dashboardData!.mood.trend === 'up' ? 'success' : dashboardData!.mood.trend === 'down' ? 'error' : 'default'}
                  size="small"
                />
              </Box>
                             <LinearProgress
                 variant="determinate"
                 value={dashboardData!.mood.today * 10}
                 sx={{
                   height: 8,
                   borderRadius: 4,
                   backgroundColor: theme.palette.grey[200],
                   '& .MuiLinearProgress-bar': {
                     backgroundColor: getMoodColor(dashboardData!.mood.today),
                   },
                 }}
                              />
             </CardContent>
           </Card>
         </Box>

         {/* Last Hot Flash */}
         <Box>
           <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocalFireDepartment sx={{ mr: 1, color: theme.palette.error.main }} />
                <Typography variant="h6">Last Hot Flash</Typography>
              </Box>
              <Typography variant="h4" color="error" gutterBottom>
                {dashboardData!.hotFlashes.count} today
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last trigger: {dashboardData!.hotFlashes.lastTrigger}
                                            </Typography>
             </CardContent>
           </Card>
         </Box>

         {/* Sleep Last Night */}
         <Box>
           <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Bedtime sx={{ mr: 1, color: getSleepQualityColor(dashboardData!.sleep.quality) }} />
                <Typography variant="h6">Sleep Last Night</Typography>
              </Box>
              <Typography variant="h4" sx={{ color: getSleepQualityColor(dashboardData!.sleep.quality) }} gutterBottom>
                {dashboardData!.sleep.lastNight}h
              </Typography>
                             <Chip
                 label={dashboardData!.sleep.quality.charAt(0).toUpperCase() + dashboardData!.sleep.quality.slice(1)}
                 color={dashboardData!.sleep.quality === 'good' ? 'success' : dashboardData!.sleep.quality === 'fair' ? 'warning' : 'error'}
                 size="small"
                              />
             </CardContent>
           </Card>
         </Box>

         {/* Energy Level */}
         <Box>
           <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Lightbulb sx={{ mr: 1, color: getEnergyColor(dashboardData!.energy.level) }} />
                <Typography variant="h6">Energy Level</Typography>
              </Box>
              <Typography variant="h4" sx={{ color: getEnergyColor(dashboardData!.energy.level) }} gutterBottom>
                {dashboardData!.energy.level.charAt(0).toUpperCase() + dashboardData!.energy.level.slice(1)}
              </Typography>
              <Chip
                label={dashboardData!.energy.trend === 'up' ? 'Rising' : dashboardData!.energy.trend === 'down' ? 'Falling' : 'Stable'}
                color={dashboardData!.energy.trend === 'up' ? 'success' : dashboardData!.energy.trend === 'down' ? 'error' : 'default'}
                size="small"
                             />
             </CardContent>
           </Card>
         </Box>
       </Box>

             {/* Nudges & Insights */}
       <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
         {/* Daily Prompt */}
         <Box>
           <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Notifications sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="h6">Daily Prompt</Typography>
              </Box>
              <Typography variant="body1" gutterBottom>
                "How are you feeling about your energy levels today? What's contributing to that?"
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleTileClick('chat', '/app/chat')}
              >
                Chat about this
                                            </Button>
             </CardContent>
           </Card>
         </Box>

         {/* Pattern Alert */}
         <Box>
           <Alert
            severity="info"
            icon={<Lightbulb />}
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => handleTileClick('insights', '/app/insights')}
              >
                View Details
              </Button>
            }
          >
            <Typography variant="subtitle2" gutterBottom>
              Pattern Detected
            </Typography>
            <Typography variant="body2">
              We noticed your hot flashes increase after caffeine consumption. 
              Consider tracking this more closely.
                         </Typography>
           </Alert>
         </Box>
       </Box>
    </Box>
  );
};

export default Home;
