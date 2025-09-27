import { NavLink } from 'react-router-dom';
import { Mail, Github, Twitter, MessageCircle, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Subscribed! 🎮",
      description: "Welcome to the MailHub gaming community!",
    });
    
    setEmail('');
    setIsSubscribing(false);
  };

  const footerSections = {
    navigation: {
      title: 'Navigation',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Store', path: '/store' },
        { name: 'Blog', path: '/blog' },
        { name: 'Community', path: '/community' },
        { name: 'Login', path: '/login' }
      ]
    },
    products: {
      title: 'Products',
      links: [
        { name: 'Gaming Accounts', path: '/store?category=accounts' },
        { name: 'Premium Services', path: '/store?category=premium' },
        { name: 'Verification Process', path: '/verification' },
        { name: 'Account Recovery', path: '/recovery' },
        { name: 'Pricing', path: '/pricing' }
      ]
    },
    resources: {
      title: 'Resources',
      links: [
        { name: 'Gaming Guides', path: '/blog?category=guides' },
        { name: 'Security Tips', path: '/blog?category=security' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Documentation', path: '/docs' },
        { name: 'API Access', path: '/api-docs' }
      ]
    },
    legal: {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Support', path: '/support' },
        { name: 'Contact', path: '/contact' }
      ]
    }
  };

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Mail className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-bold text-gaming-glow">MailHub</h3>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              The ultimate gaming webmail platform. Secure email with integrated 
              gaming marketplace for premium accounts and services.
            </p>

            {/* Newsletter Signup */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Stay Updated</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-gaming flex-1"
                  required
                />
                <Button 
                  type="submit" 
                  className="btn-gaming px-4"
                  disabled={isSubscribing}
                >
                  {isSubscribing ? 'Joining...' : 'Join'}
                </Button>
              </form>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h4 className="font-semibold text-foreground mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links & Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground font-medium">Connect:</span>
              <div className="flex space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0 hover:bg-primary/20 hover:text-primary"
                >
                  <Hash className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0 hover:bg-primary/20 hover:text-primary"
                >
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0 hover:bg-primary/20 hover:text-primary"
                >
                  <Github className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0 hover:bg-primary/20 hover:text-primary"
                >
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">
                © 2024 MailHub Gaming Platform. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Secure webmail • Gaming marketplace • Premium accounts
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};