import { useState } from 'react';
import { Calendar, Eye, MessageCircle, Filter, Search } from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  views: number;
  comments: number;
  category: string;
  tags: string[];
  featured: boolean;
}

export const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'All Posts', id: 'all', count: 149 },
    { name: 'Gaming', id: 'gaming', count: 45 },
    { name: 'Security', id: 'security', count: 23 },
    { name: 'Hardware', id: 'hardware', count: 18 },
    { name: 'Technology', id: 'technology', count: 34 },
    { name: 'Reviews', id: 'reviews', count: 29 },
  ];

  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'The Ultimate Guide to Gaming Account Security',
      excerpt: 'Learn essential tips to protect your gaming accounts from hackers and maintain your digital assets safely. This comprehensive guide covers two-factor authentication, password management, and more.',
      author: 'Alex Chen',
      date: '2024-01-15',
      readTime: '8 min read',
      views: 1234,
      comments: 89,
      category: 'security',
      tags: ['Security', 'Gaming', 'Guide'],
      featured: true
    },
    {
      id: '2',
      title: 'Top 10 Gaming Platforms to Watch in 2024',
      excerpt: 'Discover the emerging gaming platforms that are revolutionizing the industry and creating new opportunities for gamers worldwide.',
      author: 'Sarah Martinez',
      date: '2024-01-12',
      readTime: '6 min read',
      views: 892,
      comments: 67,
      category: 'gaming',
      tags: ['Gaming', 'Platforms', 'Trends'],
      featured: true
    },
    {
      id: '3',
      title: 'How to Build Your Perfect Gaming Setup on a Budget',
      excerpt: 'Create an amazing gaming experience without breaking the bank with these smart purchasing decisions and optimization tips.',
      author: 'Mike Johnson',
      date: '2024-01-10',
      readTime: '10 min read',
      views: 756,
      comments: 92,
      category: 'hardware',
      tags: ['Hardware', 'Budget', 'Setup'],
      featured: false
    },
    {
      id: '4',
      title: 'The Future of Cross-Platform Gaming',
      excerpt: 'Exploring how cross-platform compatibility is changing the way we play and connect with other gamers across different devices.',
      author: 'Emma Wilson',
      date: '2024-01-08',
      readTime: '7 min read',
      views: 645,
      comments: 54,
      category: 'technology',
      tags: ['Technology', 'Gaming', 'Cross-Platform'],
      featured: false
    },
    {
      id: '5',
      title: 'Steam Deck vs Nintendo Switch: Complete Comparison',
      excerpt: 'A detailed comparison of two popular handheld gaming devices, covering performance, game library, and value for money.',
      author: 'David Kim',
      date: '2024-01-05',
      readTime: '12 min read',
      views: 1567,
      comments: 123,
      category: 'reviews',
      tags: ['Reviews', 'Hardware', 'Gaming'],
      featured: false
    },
    {
      id: '6',
      title: 'Indie Game Spotlight: Hidden Gems of 2024',
      excerpt: 'Discover amazing indie games that deserve your attention, from innovative puzzle games to groundbreaking narratives.',
      author: 'Lisa Park',
      date: '2024-01-03',
      readTime: '9 min read',
      views: 543,
      comments: 76,
      category: 'gaming',
      tags: ['Gaming', 'Indie', 'Reviews'],
      featured: false
    }
  ];

  const trendingTopics = [
    'Gaming Account Security',
    'Cross-Platform Gaming',
    'Steam Deck Reviews',
    'Gaming Laptops 2024',
    'Indie Game Spotlight',
    'Hardware Optimization',
    'Gaming Technology',
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      gaming: 'bg-primary text-primary-foreground',
      security: 'bg-red-500 text-white',
      hardware: 'bg-blue-500 text-white',
      technology: 'bg-purple-500 text-white',
      reviews: 'bg-green-500 text-white',
    };
    return colors[category] || 'bg-gray-500 text-white';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Quick Mailbox Access */}
      <div className="md:hidden bg-muted/50 border-b border-border px-4 py-2">
        <Link to="/mailbox" className="text-sm text-primary hover:text-primary-hover">
          ← Back to Mailbox
        </Link>
      </div>
      
      {/* Hero Section */}
      <section className="relative bg-gaming-hero py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Gaming Insights & Articles
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Stay updated with the latest gaming trends, security tips, and industry insights
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-gaming pl-12 pr-4 w-full text-lg py-4"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-primary/20 hover:text-foreground'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Featured Posts */}
            {selectedCategory === 'all' && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">Featured Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blogPosts.filter(post => post.featured).map((post) => (
                    <article key={post.id} className="card-gaming-feature group cursor-pointer">
                      <div className="space-y-4">
                        {/* Featured Badge & Category */}
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-md">
                            Featured
                          </span>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-md ${getCategoryColor(post.category)}`}>
                            {post.category.toUpperCase()}
                          </span>
                        </div>

                        {/* Article Image Placeholder */}
                        <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                          <span className="text-muted-foreground">Article Image</span>
                        </div>

                        {/* Article Content */}
                        <div className="space-y-3">
                          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {post.excerpt}
                          </p>

                          {/* Article Meta */}
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center space-x-4">
                              <span>{post.author}</span>
                              <span>•</span>
                              <span>{post.date}</span>
                              <span>•</span>
                              <span>{post.readTime}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-1">
                                <Eye className="w-3 h-3" />
                                <span>{post.views}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageCircle className="w-3 h-3" />
                                <span>{post.comments}</span>
                              </div>
                            </div>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* All Articles */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                {selectedCategory === 'all' ? 'Latest Articles' : `${categories.find(c => c.id === selectedCategory)?.name} Articles`}
              </h2>
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <article key={post.id} className="card-gaming group cursor-pointer">
                    <div className="flex flex-col md:flex-row md:space-x-6">
                      {/* Article Image */}
                      <div className="md:w-64 flex-shrink-0 mb-4 md:mb-0">
                        <div className="aspect-video md:aspect-square bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                          <span className="text-muted-foreground text-sm">Article Image</span>
                        </div>
                      </div>

                      {/* Article Content */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-md ${getCategoryColor(post.category)}`}>
                            {post.category.toUpperCase()}
                          </span>
                          {post.featured && (
                            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-md">
                              Featured
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>

                        <p className="text-muted-foreground leading-relaxed">
                          {post.excerpt}
                        </p>

                        {/* Article Meta */}
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            <span>{post.author}</span>
                            <span>•</span>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{post.date}</span>
                            </div>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{post.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{post.comments}</span>
                            </div>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories */}
            <div className="card-gaming">
              <h3 className="text-xl font-semibold text-foreground mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.filter(cat => cat.id !== 'all').map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span className="font-medium capitalize">{category.name}</span>
                    <span className="text-sm">{category.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Topics */}
            <div className="card-gaming">
              <h3 className="text-xl font-semibold text-foreground mb-4">Trending Topics</h3>
              <div className="space-y-2">
                {trendingTopics.map((topic, index) => (
                  <div
                    key={topic}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                  >
                    <span className="text-primary font-semibold text-sm">#{index + 1}</span>
                    <span className="text-sm text-foreground">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="card-gaming bg-gaming-subtle">
              <h3 className="text-xl font-semibold text-foreground mb-4">Stay Updated</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get the latest gaming insights delivered to your inbox
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input-gaming w-full"
                />
                <Button className="btn-gaming w-full">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};