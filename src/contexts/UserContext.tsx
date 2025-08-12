import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface UserPreferences {
  voiceEnabled: boolean;
  tone: 'nurturing' | 'calm' | 'pragmatic';
  ttsSpeed: number;
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  reduceMotion: boolean;
  language: string;
  region: string;
  culturalDefaults: string[];
  privacySettings: {
    sexualHealthMasked: boolean;
    therapistSharing: boolean;
    partnerSharing: boolean;
    therapistCategories: string[];
    partnerCategories: string[];
  };
  reminders: {
    softLog: boolean;
    bedtime: boolean;
    hydration: boolean;
    custom: Array<{
      id: string;
      title: string;
      time: string;
      days: string[];
      enabled: boolean;
    }>;
  };
}

interface UserContextType {
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  updatePrivacySettings: (updates: Partial<UserPreferences['privacySettings']>) => void;
  updateReminders: (updates: Partial<UserPreferences['reminders']>) => void;
  addCustomReminder: (reminder: UserPreferences['reminders']['custom'][0]) => void;
  removeCustomReminder: (id: string) => void;
  resetPreferences: () => void;
}

const defaultPreferences: UserPreferences = {
  voiceEnabled: true,
  tone: 'nurturing',
  ttsSpeed: 1.0,
  fontSize: 'medium',
  highContrast: false,
  reduceMotion: false,
  language: 'en',
  region: 'US',
  culturalDefaults: [],
  privacySettings: {
    sexualHealthMasked: true,
    therapistSharing: false,
    partnerSharing: false,
    therapistCategories: ['mood', 'symptoms', 'remedies'],
    partnerCategories: ['mood', 'energy'],
  },
  reminders: {
    softLog: true,
    bedtime: false,
    hydration: false,
    custom: [],
  },
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);

  useEffect(() => {
    if (user) {
      // Load user preferences from localStorage or API
      const savedPreferences = localStorage.getItem(`user_preferences_${user.id}`);
      if (savedPreferences) {
        try {
          const parsed = JSON.parse(savedPreferences);
          setPreferences({ ...defaultPreferences, ...parsed });
        } catch (error) {
          console.error('Failed to parse saved preferences:', error);
        }
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      // Save preferences to localStorage whenever they change
      localStorage.setItem(`user_preferences_${user.id}`, JSON.stringify(preferences));
      
      // Also sync to backend if user is authenticated
      const syncPreferences = async () => {
        try {
          await fetch('/api/user/preferences', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(preferences),
          });
        } catch (error) {
          console.error('Failed to sync preferences:', error);
        }
      };
      
      syncPreferences();
    }
  }, [preferences, user]);

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...updates }));
  };

  const updatePrivacySettings = (updates: Partial<UserPreferences['privacySettings']>) => {
    setPreferences(prev => ({
      ...prev,
      privacySettings: { ...prev.privacySettings, ...updates }
    }));
  };

  const updateReminders = (updates: Partial<UserPreferences['reminders']>) => {
    setPreferences(prev => ({
      ...prev,
      reminders: { ...prev.reminders, ...updates }
    }));
  };

  const addCustomReminder = (reminder: UserPreferences['reminders']['custom'][0]) => {
    setPreferences(prev => ({
      ...prev,
      reminders: {
        ...prev.reminders,
        custom: [...prev.reminders.custom, reminder]
      }
    }));
  };

  const removeCustomReminder = (id: string) => {
    setPreferences(prev => ({
      ...prev,
      reminders: {
        ...prev.reminders,
        custom: prev.reminders.custom.filter(r => r.id !== id)
      }
    }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  const value: UserContextType = {
    preferences,
    updatePreferences,
    updatePrivacySettings,
    updateReminders,
    addCustomReminder,
    removeCustomReminder,
    resetPreferences,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
