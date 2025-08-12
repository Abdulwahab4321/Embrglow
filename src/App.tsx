import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import { AnalyticsProvider } from './contexts/AnalyticsContext';

// Public pages
import Welcome from './pages/Welcome';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import Onboarding from './pages/Onboarding';

// App pages (protected)
import Home from './pages/app/Home';
import Chat from './pages/app/Chat';
import TrackerIndex from './pages/app/tracker/TrackerIndex';
import SoftLog from './pages/app/tracker/SoftLog';
import DeepLog from './pages/app/tracker/DeepLog';
import EmberTides from './pages/app/EmberTides';
import Insights from './pages/app/Insights';
import Compass from './pages/app/Compass';
import TherapistShare from './pages/app/therapist/Share';
import Glossary from './pages/app/Glossary';
import Reminders from './pages/app/Reminders';
import Settings from './pages/app/Settings';
import Help from './pages/app/Help';

// Therapist portal
import TherapistLogin from './pages/therapist/Login';
import TherapistDashboard from './pages/therapist/Dashboard';

// Corporate portal
import CorpLogin from './pages/corp/Login';
import CorpDashboard from './pages/corp/Dashboard';

// Legal pages
import Privacy from './pages/legal/Privacy';
import Terms from './pages/legal/Terms';
import Contact from './pages/legal/Contact';

// Components
import ProtectedRoute from './components/auth/ProtectedRoute';
import AppLayout from './components/layout/AppLayout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#E91E63', // Pink for women's health theme
      light: '#F8BBD9',
      dark: '#C2185B',
    },
    secondary: {
      main: '#9C27B0', // Purple
      light: '#E1BEE7',
      dark: '#7B1FA2',
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AnalyticsProvider>
        <AuthProvider>
          <UserProvider>
            <Router>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Welcome />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/onboarding" element={<Onboarding />} />
                
                {/* Legal pages */}
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/contact" element={<Contact />} />

                {/* Protected app routes */}
                <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                  <Route index element={<Navigate to="/app/home" replace />} />
                  <Route path="home" element={<Home />} />
                  <Route path="chat" element={<Chat />} />
                  <Route path="tracker" element={<TrackerIndex />} />
                  <Route path="tracker/soft" element={<SoftLog />} />
                  <Route path="tracker/deep" element={<DeepLog />} />
                  <Route path="embertides" element={<EmberTides />} />
                  <Route path="insights" element={<Insights />} />
                  <Route path="compass" element={<Compass />} />
                  <Route path="therapist/share" element={<TherapistShare />} />
                  <Route path="glossary" element={<Glossary />} />
                  <Route path="reminders" element={<Reminders />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="help" element={<Help />} />
                </Route>

                {/* Therapist portal */}
                <Route path="/therapist/login" element={<TherapistLogin />} />
                <Route path="/therapist/dashboard" element={<TherapistDashboard />} />

                {/* Corporate portal */}
                <Route path="/corp/login" element={<CorpLogin />} />
                <Route path="/corp/dashboard" element={<CorpDashboard />} />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
          </UserProvider>
        </AuthProvider>
      </AnalyticsProvider>
    </ThemeProvider>
  );
}

export default App;
