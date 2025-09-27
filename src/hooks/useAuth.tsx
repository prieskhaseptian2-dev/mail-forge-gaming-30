import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import api from '@/lib/api';

interface User {
  id: string;
  address: string;
  name: string;
  profile?: {
    avatar?: string;
    lastLogin?: string;
    preferences?: any;
  };
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (address: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isOnline: boolean;
  retryCount: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [retryCount, setRetryCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const checkExistingToken = async () => {
      try {
        const existingToken = api.getToken();
        if (existingToken) {
          console.log('🔍 Found existing JWT token, testing with messages endpoint...');
          
          // Verify token by trying to fetch messages
          try {
            const res = await api.getMessages();
            if (res.success) {
              // Extract user info from token storage (set during login)
              const userEmail = localStorage.getItem('user_email') || 'user@example.com';
              const userData = {
                id: 'user_id',
                address: userEmail,
                name: userEmail.split('@')[0],
              };
              setUser(userData);
              setToken(existingToken);
              console.log('✅ Token valid, user authenticated:', userEmail);
            } else {
              console.log('❌ Token invalid, clearing');
              api.setToken(null);
              localStorage.removeItem('user_email');
            }
          } catch (error) {
            console.log('❌ Token verification failed, clearing');
            api.setToken(null);
            localStorage.removeItem('user_email');
          }
        } else {
          console.log('❌ No token found');
        }
      } catch (e) {
        console.log('❌ Token verification failed:', e);
        api.setToken(null);
      } finally {
        setLoading(false);
      }
    };

    checkExistingToken();

    // Network status listeners
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const login = async (address: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const addr = address.trim().toLowerCase();
      const pwd = password.trim();

      console.log('🔐 Attempting login with JWT...');
      const result = await api.login(addr, pwd);

      if (!result?.success) {
        toast({
          title: 'Login failed',
          description: result?.message || 'Invalid credentials',
          variant: 'destructive',
        });
        return false;
      }

      if (result.success && result.user) {
        // Store user email for session persistence
        localStorage.setItem('user_email', result.user.address);
        
        const userData = {
          id: result.user.id,
          address: result.user.address,
          name: result.user.address.split('@')[0],
        };
        setUser(userData);
        setToken(api.getToken());
        toast({ title: 'Login successful', description: `Welcome ${userData.address}` });
        console.log('✅ JWT Login successful for:', userData.address);
        return true;
      }

      toast({ title: 'Login failed', description: 'Invalid credentials', variant: 'destructive' });
      return false;
    } catch (error) {
      console.error('❌ Login error:', error);
      toast({
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear all auth state
      api.setToken(null);
      localStorage.removeItem('user_email');
      setUser(null);
      setToken(null);
      console.log('✅ Logged out successfully');
      toast({
        title: 'Signed out successfully',
        description: 'You have been logged out of MailHub',
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        loading,
        login,
        logout,
        isOnline,
        retryCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};