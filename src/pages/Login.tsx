import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().trim().email('Invalid email address').max(255, 'Email too long'),
  password: z.string().trim().min(6, 'Password must be at least 6 characters').max(100, 'Password too long'),
});

const signupSchema = loginSchema.extend({
  name: z.string().trim().max(100, 'Name too long').optional(),
});

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const { isAuthenticated, login, signup } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/mailbox" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate input
      const schema = isSignup ? signupSchema : loginSchema;
      const validation = schema.safeParse({ email, password, name: isSignup ? name : undefined });
      
      if (!validation.success) {
        toast({
          title: 'Validation error',
          description: validation.error.errors[0].message,
          variant: 'destructive',
        });
        setLoading(false);
        return;
      }

      if (isSignup) {
        const success = await signup(email, password, name);
        if (success) {
          setIsSignup(false);
          setPassword('');
        }
      } else {
        const success = await login(email, password);
        if (success) {
          toast({
            title: "Welcome to MailHub! 🎮",
            description: "Successfully logged into your gaming webmail.",
          });
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      toast({
        title: isSignup ? "Signup error" : "Login error",
        description: errorMessage,
        variant: "destructive",
      });
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
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              {isSignup ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-muted-foreground">
              {isSignup ? 'Sign up to access your gaming webmail' : 'Sign in to access your gaming webmail'}
            </p>
            {!isSignup && (
              <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm text-foreground font-medium">Demo Admin Account:</p>
                <p className="text-xs text-muted-foreground mt-1">
                  admin@mailhub.demo / Admin123!
                </p>
              </div>
            )}
          </div>

          {/* Login/Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field (Signup only) */}
            {isSignup && (
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground block text-left">
                  Name (Optional)
                </label>
                <div className="relative">
                  <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-gaming pl-10 w-full"
                  />
                </div>
              </div>
            )}

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
                  placeholder={isSignup ? 'Create a password (min 6 chars)' : 'Enter your password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-gaming pl-10 pr-10 w-full"
                  required
                  minLength={6}
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

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="btn-gaming w-full relative overflow-hidden group"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground"></div>
                  <span>{isSignup ? 'Creating Account...' : 'Signing In...'}</span>
                </div>
              ) : (
                <span className="group-hover:scale-105 transition-transform duration-200">
                  🎮 {isSignup ? 'Create Account' : 'Sign In to MailHub'}
                </span>
              )}
            </Button>
          </form>

          {/* Toggle Signup/Login */}
          <div className="mt-8 space-y-4">
            <p className="text-sm text-muted-foreground">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignup(!isSignup);
                  setPassword('');
                  setName('');
                }}
                className="text-primary font-medium cursor-pointer hover:underline transition-all duration-200"
              >
                {isSignup ? 'Sign In' : 'Sign Up'}
              </button>
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
