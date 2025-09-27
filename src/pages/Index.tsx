import { Link } from 'react-router-dom';
import { TrendingUp, Calendar, Eye, MessageCircle, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';

const Index = () => {
  const categories = [
    { name: 'Gaming', count: 45, color: 'text-primary' },
    { name: 'Security', count: 23, color: 'text-blue-400' },
    { name: 'Hardware', count: 18, color: 'text-green-400' },
    { name: 'Technology', count: 34, color: 'text-purple-400' },
    { name: 'Reviews', count: 29, color: 'text-orange-400' },
  ];

  const featuredArticles = [
    {
      id: 1,
      category: 'Featured',
      title: 'The Ultimate Guide to Gaming Account Security',
      excerpt: 'Learn essential tips to protect your gaming accounts from hackers and maintain your digital assets safely...',
      author: 'Alex Chen',
      date: '2024-01-15',
      readTime: '8 min read',
      views: 1234,
      comments: 89,
      tags: ['Security', 'Gaming']
    },
    {
      id: 2,
      category: 'Gaming',
      title: 'Top 10 Gaming Platforms to Watch in 2024',
      excerpt: 'Discover the emerging gaming platforms that are revolutionizing the industry and creating new opportunities...',
      author: 'Sarah Martinez',
      date: '2024-01-12',
      readTime: '6 min read',
      views: 892,
      comments: 67,
      tags: ['Gaming', 'Trends']
    },
    {
      id: 3,
      category: 'Hardware',
      title: 'How to Build Your Perfect Gaming Setup on a Budget',
      excerpt: 'Create an amazing gaming experience without breaking the bank with these smart purchasing decisions...',
      author: 'Mike Johnson',
      date: '2024-01-10',
      readTime: '10 min read',
      views: 756,
      comments: 92,
      tags: ['Hardware', 'Budget']
    },
    {
      id: 4,
      category: 'Technology',
      title: 'The Future of Cross-Platform Gaming',
      excerpt: 'Exploring how cross-platform compatibility is changing the way we play and connect with other gamers...',
      author: 'Emma Wilson',
      date: '2024-01-08',
      readTime: '7 min read',
      views: 645,
      comments: 54,
      tags: ['Technology', 'Gaming']
    },
  ];

  const trendingTopics = [
    'Gaming Account Security',
    'Cross-Platform Gaming',
    'Steam Deck Reviews',
    'Gaming Laptops 2024',
    'Indie Game Spotlight',
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gaming-hero py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Gaming Insights & Articles
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Stay updated with the latest gaming trends, security tips, and industry insights
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/blog">
              <Button className="btn-gaming text-lg px-8 py-4">
                Read Latest Articles
              </Button>
            </Link>
            <Button variant="outline" className="btn-gaming-outline text-lg px-8 py-4">
              <TrendingUp className="w-5 h-5 mr-2" />
              Trending Now
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Featured Articles */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">Featured Articles</h2>
              <Link to="/blog">
                <Button variant="ghost" className="text-primary hover:text-primary-hover">
                  View All <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredArticles.map((article) => (
                <article key={article.id} className="card-gaming-feature group cursor-pointer">
                  {/* Article Image */}
                  <div className="relative mb-4 overflow-hidden rounded-lg">
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
                      <span className="text-muted-foreground">Gaming Article Image</span>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                        article.category === 'Featured' ? 'bg-primary text-primary-foreground' :
                        article.category === 'Gaming' ? 'bg-green-500 text-white' :
                        article.category === 'Hardware' ? 'bg-blue-500 text-white' :
                        'bg-purple-500 text-white'
                      }`}>
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {article.excerpt}
                    </p>

                    {/* Article Meta */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <span>{article.author}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{article.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-3 h-3" />
                          <span>{article.comments}</span>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Button className="btn-gaming-outline w-full mt-4">
                      Read Article
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories */}
            <div className="card-gaming">
              <h3 className="text-xl font-semibold text-foreground mb-4">Categories</h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <div
                    key={category.name}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                  >
                    <span className={`font-medium ${category.color}`}>{category.name}</span>
                    <span className="text-sm text-muted-foreground">{category.count}</span>
                  </div>
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
      </section>
    </div>
  );
};

export default Index;