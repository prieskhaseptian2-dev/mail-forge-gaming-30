import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, Settings, User, Mail } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

export const Header = () => {
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();

  const navItems = [
    { name: 'Mail', path: '/mailbox', icon: Mail, count: 12, requiresAuth: true },
    { name: 'Gaming', path: '/store', icon: null },
    { name: 'Blog', path: '/blog', icon: null },
    { name: 'Community', path: '/community', icon: null },
  ];

  const isActive = (path: string) => {
    if (path === '/mailbox' && location.pathname === '/mailbox') return true;
    if (path === '/store' && location.pathname === '/store') return true;
    if (path === '/blog' && (location.pathname === '/blog' || location.pathname === '/')) return true;
    if (path === '/community' && location.pathname === '/community') return true;
    return false;
  };

  return (
    <header className="bg-card/95 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center hover-glow">
            <span className="text-2xl md:text-3xl font-bold text-gaming-glow">MailHub</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              if (item.requiresAuth && !isAuthenticated) return null;
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`nav-gaming relative ${isActive(item.path) ? 'nav-gaming-active' : ''}`}
                >
                  {item.icon && <item.icon className="w-5 h-5 mr-2" />}
                  <span>{item.name}</span>
                  {item.count && (
                    <span className="badge-unread ml-2 animate-pulse">{item.count}</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-3">
            {/* Search Bar */}
            <div className="hidden lg:flex items-center relative">
              <Search className="w-5 h-5 absolute left-3 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="input-gaming pl-10 w-64 xl:w-80 text-sm"
              />
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-2">
              {/* Mobile Search */}
              <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground hover:text-foreground">
                <Search className="w-5 h-5" />
              </Button>
              
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <Settings className="w-5 h-5" />
              </Button>
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <User className="w-5 h-5" />
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={logout}
                    className="text-sm btn-gaming-outline hidden sm:flex"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Link to="/login">
                  <Button variant="default" className="btn-gaming text-sm">
                    🎮 Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};