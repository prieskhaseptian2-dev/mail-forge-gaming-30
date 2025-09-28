import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Mail, Store, BookOpen, Users, LogIn, User, Wifi, WifiOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const MobileNavigation = () => {
  const { isAuthenticated, user, isOnline, retryCount } = useAuth();
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(5); // This would come from email API

  // Mock unread count updates (would be real-time in production)
  useEffect(() => {
    const interval = setInterval(() => {
      setUnreadCount(prev => Math.max(0, prev + Math.floor(Math.random() * 3) - 1));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const navItems = [
    {
      path: '/mailbox',
      icon: Mail,
      label: 'Mail',
      badge: unreadCount > 0 ? unreadCount : null,
      requireAuth: true
    },
    {
      path: '/store',
      icon: Store,
      label: 'Store',
      badge: null,
      requireAuth: false
    },
    {
      path: '/blog',
      icon: BookOpen,
      label: 'Blog',
      badge: null,
      requireAuth: false
    },
    {
      path: '/community',
      icon: Users,
      label: 'Community',
      badge: null,
      requireAuth: false
    }
  ];

  const getActiveClass = (path: string) => {
    return location.pathname === path
      ? 'text-primary bg-primary/20 border-primary/30'
      : 'text-muted-foreground hover:text-primary';
  };

  return (
    <>
      {/* Minimalist Status Bar - Mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-2 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-primary">MailHub</span>
            <div className="flex items-center space-x-1">
              <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-primary animate-pulse' : 'bg-muted-foreground'}`}></div>
              <span className={`text-xs ${isOnline ? 'text-primary' : 'text-muted-foreground'}`}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
          
          {/* Quick Login Access Only */}
          {!isAuthenticated && (
            <NavLink to="/login">
              <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
                Sign In
              </Button>
            </NavLink>
          )}
        </div>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t border-border">
        <div className="flex items-center justify-around py-2 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            // Don't show protected routes if not authenticated
            if (item.requireAuth && !isAuthenticated) {
              return null;
            }

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`relative flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-all duration-200 min-w-[60px] ${getActiveClass(item.path)}`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5 mb-1" />
                  {item.badge && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-5 w-5 text-xs p-0 flex items-center justify-center"
                    >
                      {item.badge > 99 ? '99+' : item.badge}
                    </Badge>
                  )}
                </div>
                <span className="text-xs font-medium leading-none">
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute -top-px left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />
                )}
              </NavLink>
            );
          })}

          {/* Profile/Login button */}
          {isAuthenticated ? (
            <NavLink
              to="/profile"
              className={`relative flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-all duration-200 min-w-[60px] ${getActiveClass('/profile')}`}
            >
              <User className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium leading-none">Profile</span>
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className={`relative flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-all duration-200 min-w-[60px] ${getActiveClass('/login')}`}
            >
              <LogIn className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium leading-none">Login</span>
            </NavLink>
          )}
        </div>

        {/* Active indicator line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-border" />
      </nav>

      {/* Spacer for mobile navigation */}
      <div className="md:hidden h-20" />
    </>
  );
};