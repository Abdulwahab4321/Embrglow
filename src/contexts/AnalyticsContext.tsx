import React, { createContext, useContext, ReactNode } from 'react';

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
  timestamp?: number;
}

interface AnalyticsContextType {
  track: (event: string, properties?: Record<string, any>) => void;
  trackPageView: (page: string) => void;
  trackCTA: (cta: string, location: string) => void;
  trackAuth: (action: 'signup_start' | 'signup_success' | 'login_start' | 'login_success') => void;
  trackOnboarding: (step: string, selections?: Record<string, any>) => void;
  trackHomeTile: (tile: string) => void;
  trackChat: (action: 'send' | 'turn_received' | 'save_to_tracker' | 'quick_facts_used') => void;
  trackTracker: (action: 'open' | 'mode_toggle' | 'softlog_saved' | 'deeplog_saved') => void;
  trackEmberTides: (action: 'log' | 'to_chat') => void;
  trackInsights: (action: 'view' | 'pattern_click' | 'export_clicked') => void;
  trackCompass: (action: 'action_logged' | 'suggestion_shown' | 'backfire_triggered') => void;
  trackTherapist: (action: 'share_enabled' | 'share_disabled' | 'test_send') => void;
  trackSettings: (key: string) => void;
  trackHelp: (action: 'search' | 'ticket_submit') => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

interface AnalyticsProviderProps {
  children: ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const sendAnalytics = (event: AnalyticsEvent) => {
    // In production, this would send to your analytics service
    // For now, we'll log to console and could send to a mock endpoint
    console.log('Analytics Event:', event);
    
    // Example: Send to analytics service
    // fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(event),
    // });
  };

  const track = (event: string, properties?: Record<string, any>) => {
    sendAnalytics({
      event,
      properties,
      timestamp: Date.now(),
    });
  };

  const trackPageView = (page: string) => {
    track('page_view', { page });
  };

  const trackCTA = (cta: string, location: string) => {
    track('cta_click', { cta, location });
  };

  const trackAuth = (action: 'signup_start' | 'signup_success' | 'login_start' | 'login_success') => {
    track(action);
  };

  const trackOnboarding = (step: string, selections?: Record<string, any>) => {
    track('onboarding_step', { step, selections });
  };

  const trackHomeTile = (tile: string) => {
    track('home_tile_click', { tile });
  };

  const trackChat = (action: 'send' | 'turn_received' | 'save_to_tracker' | 'quick_facts_used') => {
    track(`chat_${action}`);
  };

  const trackTracker = (action: 'open' | 'mode_toggle' | 'softlog_saved' | 'deeplog_saved') => {
    track(`tracker_${action}`);
  };

  const trackEmberTides = (action: 'log' | 'to_chat') => {
    track(`embertides_${action}`);
  };

  const trackInsights = (action: 'view' | 'pattern_click' | 'export_clicked') => {
    track(`insight_${action}`);
  };

  const trackCompass = (action: 'action_logged' | 'suggestion_shown' | 'backfire_triggered') => {
    track(`compass_${action}`);
  };

  const trackTherapist = (action: 'share_enabled' | 'share_disabled' | 'test_send') => {
    track(`therapist_${action}`);
  };

  const trackSettings = (key: string) => {
    track('setting_changed', { key });
  };

  const trackHelp = (action: 'search' | 'ticket_submit') => {
    track(`help_${action}`);
  };

  const value: AnalyticsContextType = {
    track,
    trackPageView,
    trackCTA,
    trackAuth,
    trackOnboarding,
    trackHomeTile,
    trackChat,
    trackTracker,
    trackEmberTides,
    trackInsights,
    trackCompass,
    trackTherapist,
    trackSettings,
    trackHelp,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};
