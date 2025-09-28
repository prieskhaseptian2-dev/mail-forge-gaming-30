import { useState } from 'react';
import { ShoppingCart, Star, Trophy, Users, Clock, Eye, Filter, Mail } from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface GameAccount {
  id: string;
  platform: string;
  title: string;
  level: number;
  gamesCount: number;
  rating: number;
  reviews: number;
  originalPrice: number;
  currentPrice: number;
  discount: number;
  achievements: string[];
  featured: boolean;
  condition: 'Excellent' | 'Very Good' | 'Good';
}

export const Store = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const platforms = [
    { id: 'steam', name: 'Steam Accounts', icon: '🎮', count: 165, color: 'bg-gaming-steam' },
    { id: 'epic', name: 'Epic Games', icon: '🚀', count: 89, color: 'bg-gaming-epic' },
    { id: 'playstation', name: 'PlayStation', icon: '🎯', count: 67, color: 'bg-gaming-playstation' },
    { id: 'xbox', name: 'Xbox', icon: '🎪', count: 52, color: 'bg-gaming-xbox' },
    { id: 'origin', name: 'Origin', icon: '⭐', count: 34, color: 'bg-gaming-origin' },
    { id: 'battlenet', name: 'Battle.net', icon: '⚔️', count: 23, color: 'bg-gaming-battlenet' },
  ];

  const gameAccounts: GameAccount[] = [
    {
      id: '1',
      platform: 'steam',
      title: 'Steam Account - Premium',
      level: 45,
      gamesCount: 25,
      rating: 4.8,
      reviews: 156,
      originalPrice: 39.99,
      currentPrice: 25.99,
      discount: 35,
      achievements: ['🏆', '💎', '🎯', '⭐', '🎮'],
      featured: true,
      condition: 'Excellent'
    },
    {
      id: '2',
      platform: 'epic',
      title: 'Epic Games Account',
      level: 23,
      gamesCount: 12,
      rating: 4.6,
      reviews: 89,
      originalPrice: 29.99,
      currentPrice: 19.99,
      discount: 33,
      achievements: ['🏆', '💎', '🎯', '⭐'],
      featured: true,
      condition: 'Very Good'
    },
    {
      id: '3',
      platform: 'playstation',
      title: 'PlayStation Plus Account',
      level: 67,
      gamesCount: 50,
      rating: 4.7,
      reviews: 234,
      originalPrice: 59.99,
      currentPrice: 45.99,
      discount: 23,
      achievements: ['🏆', '💎', '🎯', '⭐', '🎮'],
      featured: true,
      condition: 'Excellent'
    },
    {
      id: '4',
      platform: 'xbox',
      title: 'Xbox Game Pass Ultimate',
      level: 52,
      gamesCount: 35,
      rating: 4.7,
      reviews: 178,
      originalPrice: 49.99,
      currentPrice: 35.99,
      discount: 28,
      achievements: ['🏆', '💎', '🎯', '⭐', '🎮'],
      featured: false,
      condition: 'Excellent'
    },
  ];

  const trustIndicators = [
    {
      icon: Trophy,
      title: '500+',
      subtitle: 'Verified Accounts',
      color: 'text-yellow-500'
    },
    {
      icon: Users,
      title: '10k+',
      subtitle: 'Happy Customers',
      color: 'text-blue-500'
    },
    {
      icon: Clock,
      title: '24/7',
      subtitle: 'Support Available',
      color: 'text-green-500'
    }
  ];

  const filteredAccounts = gameAccounts.filter(account => 
    selectedPlatform === 'all' || account.platform === selectedPlatform
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Quick Navigation */}
      <div className="bg-muted/50 border-b border-border px-4 py-2">
        <Link to="/mailbox" className="text-sm text-primary hover:text-primary/80 flex items-center space-x-1">
          <Mail className="w-4 h-4" />
          <span>← Back to Mailbox</span>
        </Link>
      </div>
      
      {/* Hero Section */}
      <section className="relative bg-gaming-hero py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Premium Gaming Accounts
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover verified gaming accounts with exclusive content, achievements, and premium features
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-gaming text-lg px-8 py-4">
              <Eye className="w-5 h-5 mr-2" />
              Browse Accounts
            </Button>
            <Button variant="outline" className="btn-gaming-outline text-lg px-8 py-4">
              <Filter className="w-5 h-5 mr-2" />
              Verification Process
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Browse by Platform */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">Browse by Platform</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`card-gaming text-center p-6 transition-all duration-300 hover-lift ${
                  selectedPlatform === platform.id ? 'ring-2 ring-primary' : ''
                }`}
              >
                <div className="text-4xl mb-3">{platform.icon}</div>
                <h3 className="font-semibold text-foreground mb-2">{platform.name}</h3>
                <p className="text-sm text-muted-foreground">{platform.count} accounts</p>
              </button>
            ))}
          </div>
        </section>

        {/* Featured Accounts */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Featured Accounts</h2>
            <Button variant="ghost" className="text-primary hover:text-primary-hover">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAccounts.map((account) => (
              <div key={account.id} className="card-gaming-feature group">
                {/* Account Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className={`badge-platform ${getPlatformColor(account.platform)}`}>
                      {account.platform.toUpperCase()}
                    </span>
                    {account.featured && (
                      <span className="badge-platform bg-primary text-primary-foreground">
                        Featured
                      </span>
                    )}
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    account.condition === 'Excellent' ? 'bg-green-500/20 text-green-400' :
                    account.condition === 'Very Good' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {account.condition}
                  </span>
                </div>

                {/* Account Visual */}
                <div className="relative mb-4 p-6 bg-gradient-to-br from-muted/50 to-muted rounded-lg">
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    {account.achievements.map((achievement, index) => (
                      <span key={index} className="text-2xl">{achievement}</span>
                    ))}
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Level {account.level}</div>
                    <div className="text-sm text-muted-foreground">{account.gamesCount} games</div>
                  </div>
                </div>

                {/* Account Info */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {account.title}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            i < Math.floor(account.rating) 
                              ? 'text-yellow-500 fill-current' 
                              : 'text-muted-foreground'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {account.rating} ({account.reviews} reviews)
                    </span>
                  </div>

                  {/* Account Stats */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">
                      <span className="font-medium text-foreground">{account.level}</span> Level
                    </div>
                    <div className="text-muted-foreground">
                      <span className="font-medium text-foreground">{account.gamesCount}</span> Games
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-foreground">
                        ${account.currentPrice}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        ${account.originalPrice}
                      </span>
                      <span className="text-sm font-semibold text-red-400">
                        -{account.discount}%
                      </span>
                    </div>
                    
                    <Button className="btn-gaming w-full">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trustIndicators.map((indicator, index) => (
            <div key={index} className="card-gaming text-center">
              <indicator.icon className={`w-12 h-12 mx-auto mb-4 ${indicator.color}`} />
              <h3 className="text-2xl font-bold text-foreground mb-2">{indicator.title}</h3>
              <p className="text-muted-foreground">{indicator.subtitle}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

const getPlatformColor = (platform: string): string => {
  const colors: Record<string, string> = {
    steam: 'bg-blue-600',
    epic: 'bg-gray-600',
    playstation: 'bg-blue-500',
    xbox: 'bg-green-600',
    origin: 'bg-orange-500',
    battlenet: 'bg-blue-400',
  };
  return colors[platform] || 'bg-gray-600';
};