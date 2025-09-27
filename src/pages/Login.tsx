import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, login } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/mailbox" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Pass email as address to the new API
      const success = await login(email.trim().toLowerCase(), password.trim());
      if (success) {
        toast({
          title: "Welcome to MailHub! 🎮",
          description: "Successfully logged into your gaming webmail.",
        });
        // The redirect will happen automatically via the ProtectedRoute
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials. Please check your email and password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      
      if (errorMessage.includes('Invalid credentials')) {
        toast({
          title: "Invalid credentials",
          description: "Please check your email and password and try again.",
          variant: "destructive",
        });
      } else if (errorMessage.includes('Service unavailable')) {
        toast({
          title: "Service unavailable", 
          description: "The authentication service is temporarily unavailable. Please try again later.",
          variant: "destructive",
        });
      } else if (errorMessage.includes('Network error')) {
        toast({
          title: "Connection error",
          description: "Unable to connect to server. Please check your internet connection and try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login error",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background gradient animation */}
      <div className="absolute inset-0 bg-gaming-hero opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-600/5"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="card-gaming text-center backdrop-blur-sm bg-card/95 border border-border/50 shadow-2xl">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gaming-glow mb-3 animate-glow">MailHub</h1>
            <p className="text-muted-foreground text-lg">
              Secure webmail with integrated gaming marketplace
            </p>
          </div>

          {/* Welcome Message */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-2">Welcome Back</h2>
            <p className="text-muted-foreground">Sign in to access your gaming webmail</p>
            <div className="mt-4 text-sm text-muted-foreground">
              Test account: directtest2025@tiffincrane.com / DirectTest123!
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground block text-left">
                Email
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-gaming pl-10 w-full"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground block text-left">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-gaming pl-10 pr-10 w-full"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              disabled={loading}
              className="btn-gaming w-full relative overflow-hidden group"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                <span className="group-hover:scale-105 transition-transform duration-200">
                  🎮 Sign In to MailHub
                </span>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 space-y-4">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <span className="text-primary font-medium cursor-pointer hover:underline transition-all duration-200">
                contact admin
              </span>
            </p>

            <div className="bg-gaming-subtle rounded-xl p-4 border border-primary/20">
              <div className="flex items-center space-x-2 text-sm text-foreground mb-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="font-semibold">🎮 Gaming Accounts Available</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Access premium gaming accounts marketplace after login
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};