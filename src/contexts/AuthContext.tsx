import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
  phase?: 'peri' | 'meno';
  pronouns?: string;
  language?: string;
  region?: string;
  onboardingComplete?: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<string>;
  signup: (email: string, password: string, name: string) => Promise<string>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          // Mock token verification - in a real app, this would be an API call
          // For now, we'll just check if the token exists and create a mock user
          const mockUser = {
            id: '1',
            email: 'user@example.com',
            name: 'Demo User',
            phase: 'peri' as const,
            pronouns: 'she/her',
            language: 'en',
            region: 'US',
            onboardingComplete: true,
          };
          setUser(mockUser);
        } catch (error) {
          console.error('Auth verification failed:', error);
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [token]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login - in a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      const mockUser = {
        id: '1',
        email: email,
        name: email.split('@')[0],
        phase: 'peri' as const,
        pronouns: 'she/her',
        language: 'en',
        region: 'US',
        onboardingComplete: false,
      };
      
      setToken(mockToken);
      setUser(mockUser);
      localStorage.setItem('token', mockToken);
      
      // Return the path to navigate to
      if (mockUser.onboardingComplete) {
        return '/app/home';
      } else {
        return '/onboarding';
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Mock signup - in a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      const mockUser = {
        id: '1',
        email: email,
        name: name,
        phase: 'peri' as const,
        pronouns: 'she/her',
        language: 'en',
        region: 'US',
        onboardingComplete: false,
      };
      
      setToken(mockToken);
      setUser(mockUser);
      localStorage.setItem('token', mockToken);
      
      // Always go to onboarding after signup
      return '/onboarding';
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    // Navigation will be handled by the component calling logout
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    signup,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
