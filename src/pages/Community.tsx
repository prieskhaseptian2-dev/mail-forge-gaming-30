import { ExternalLink, Users, MessageSquare, Crown, Gamepad2, Sword, Target, Zap } from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';

interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  category: string;
  discordInvite: string;
  features: string[];
  icon: React.ComponentType<any>;
  color: string;
  isVerified: boolean;
}

export const Community = () => {
  const communityCategories = [
    { name: 'FPS Games', count: 12, icon: Target, color: 'text-red-500' },
    { name: 'RPG Games', count: 8, icon: Sword, color: 'text-purple-500' },
    { name: 'Strategy Games', count: 6, icon: Crown, color: 'text-yellow-500' },
    { name: 'Casual Gaming', count: 10, icon: Gamepad2, color: 'text-blue-500' },
    { name: 'Esports', count: 5, icon: Zap, color: 'text-green-500' },
  ];

  const communities: Community[] = [
    {
      id: '1',
      name: 'Elite Gamers Hub',
      description: 'Premium gaming community for serious players. Join discussions about latest releases, strategies, and connect with like-minded gamers.',
      memberCount: 15420,
      category: 'General Gaming',
      discordInvite: 'https://discord.gg/elitegamers',
      features: ['24/7 Active Chat', 'Weekly Tournaments', 'Game Reviews', 'Tech Support'],
      icon: Crown,
      color: 'text-yellow-500',
      isVerified: true
    },
    {
      id: '2',
      name: 'FPS Masters',
      description: 'Competitive FPS gaming community. Improve your skills in CS:GO, Valorant, Apex Legends and more with pro players and coaches.',
      memberCount: 8756,
      category: 'FPS Games',
      discordInvite: 'https://discord.gg/fpsmasters',
      features: ['Pro Coaching', 'Team Formation', 'Scrim Matches', 'Rank Climbing'],
      icon: Target,
      color: 'text-red-500',
      isVerified: true
    },
    {
      id: '3',
      name: 'RPG Legends',
      description: 'Dive deep into role-playing games with fellow adventurers. Share builds, lore discussions, and epic gaming moments.',
      memberCount: 12334,
      category: 'RPG Games',
      discordInvite: 'https://discord.gg/rpglegends',
      features: ['Build Sharing', 'Lore Discussions', 'Co-op Gaming', 'Character Creation'],
      icon: Sword,
      color: 'text-purple-500',
      isVerified: true
    },
    {
      id: '4',
      name: 'Strategy Central',
      description: 'Master the art of strategy gaming. From RTS to turn-based, discuss tactics and compete in strategic battles.',
      memberCount: 6891,
      category: 'Strategy Games',
      discordInvite: 'https://discord.gg/strategycentral',
      features: ['Tactical Discussions', 'Strategy Guides', 'Competitive Matches', 'Analysis'],
      icon: Crown,
      color: 'text-blue-500',
      isVerified: false
    },
    {
      id: '5',
      name: 'Casual Corner',
      description: 'Relaxed gaming community for casual players. Enjoy games at your own pace with friendly and supportive members.',
      memberCount: 9543,
      category: 'Casual Gaming',
      discordInvite: 'https://discord.gg/casualcorner',
      features: ['Friendly Community', 'Game Recommendations', 'Chill Sessions', 'No Pressure'],
      icon: Gamepad2,
      color: 'text-green-500',
      isVerified: false
    },
    {
      id: '6',
      name: 'Esports Arena',
      description: 'Professional esports community. Follow tournaments, discuss matches, and connect with aspiring pro players.',
      memberCount: 11267,
      category: 'Esports',
      discordInvite: 'https://discord.gg/esportsarena',
      features: ['Tournament Updates', 'Match Analysis', 'Pro Player AMAs', 'Team Recruitment'],
      icon: Zap,
      color: 'text-yellow-500',
      isVerified: true
    }
  ];

  const communityGuidelines = [
    'Be respectful to all community members',
    'No spam or self-promotion without permission',
    'Keep discussions relevant to gaming',
    'Follow Discord Terms of Service',
    'Report any inappropriate behavior',
    'Have fun and make friends!'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gaming-hero py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Join Gaming Communities
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Connect with fellow gamers, join discussions, and participate in exciting gaming communities
          </p>
          <div className="flex items-center justify-center space-x-6 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6" />
              <span className="text-lg font-semibold">50,000+ Members</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-6 h-6" />
              <span className="text-lg font-semibold">24/7 Active Chat</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Categories */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-8">Browse by Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {communityCategories.map((category) => (
                  <div key={category.name} className="card-gaming text-center p-6 hover-lift">
                    <category.icon className={`w-8 h-8 mx-auto mb-3 ${category.color}`} />
                    <h3 className="font-semibold text-foreground mb-2">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} communities</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Communities Grid */}
            <section>
              <h2 className="text-3xl font-bold text-foreground mb-8">Gaming Communities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {communities.map((community) => (
                  <div key={community.id} className="card-gaming-feature group">
                    {/* Community Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-lg bg-muted`}>
                          <community.icon className={`w-6 h-6 ${community.color}`} />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                              {community.name}
                            </h3>
                            {community.isVerified && (
                              <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{community.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {community.memberCount.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Community Description */}
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {community.description}
                    </p>

                    {/* Community Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-foreground mb-2">Features:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {community.features.map((feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Join Button */}
                    <a 
                      href={community.discordInvite} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Button className="btn-gaming w-full">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Join Discord
                      </Button>
                    </a>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Stats */}
            <div className="card-gaming">
              <h3 className="text-xl font-semibold text-foreground mb-4">Community Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Members</span>
                  <span className="font-semibold text-foreground">50,000+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Active Communities</span>
                  <span className="font-semibold text-foreground">40+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Daily Messages</span>
                  <span className="font-semibold text-foreground">10,000+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Games Covered</span>
                  <span className="font-semibold text-foreground">200+</span>
                </div>
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="card-gaming">
              <h3 className="text-xl font-semibold text-foreground mb-4">Community Guidelines</h3>
              <div className="space-y-3">
                {communityGuidelines.map((guideline, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      {guideline}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Discord Info */}
            <div className="card-gaming bg-gaming-subtle">
              <h3 className="text-xl font-semibold text-foreground mb-4">Why Discord?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Discord provides the best gaming communication experience with voice channels, 
                screen sharing, and rich gaming integrations.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  <span>Crystal clear voice chat</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  <span>Screen sharing & streaming</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  <span>Game activity integration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  <span>Mobile & desktop apps</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};