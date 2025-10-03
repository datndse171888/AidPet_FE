import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, Eye, Tag } from 'lucide-react';
import { Post } from '../../types/Post';
import { NewsPostCard } from '../../components/ui/card/NewsPostCard';
import { navigationService } from '../../services/navigator/NavigationService';

export const News: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - replace with actual API call
  useEffect(() => {
    setIsLoading(true);
    const mockPosts: Post[] = [
      {
        id: '1',
        topic: 'Help Us Save Abandoned Puppies',
        htmlContent: '<p>We recently rescued several abandoned puppies who need urgent medical care and loving homes. These adorable little ones were found in poor condition but are now receiving the care they need.</p>',
        deltaContent: '{"ops":[{"insert":"We recently rescued several abandoned puppies..."}]}',
        categoryBlog: {
          id: '1', name: 'Rescue Stories'
        },
        thumbnail: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400',
        view: 245,
        stamp: '2024-01-15T10:00:00Z',
        author_id: 'shelter123',
      },
      {
        id: '2',
        topic: 'Cat Adoption Event This Weekend',
        htmlContent: '<p>Join us this weekend for our special cat adoption event! We have many beautiful cats looking for their forever homes. All cats are vaccinated and spayed/neutered.</p>',
        deltaContent: '{"ops":[{"insert":"Join us this weekend for our special cat adoption event..."}]}',
        categoryBlog: {
          id: '2', name: 'Adoption Events'
        },
        thumbnail: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=400',
        stamp: '2024-01-10T14:30:00Z',
        view: 189,
        author_id: 'shelter456',
      },
      {
        id: '3',
        topic: 'Volunteer Training Program',
        htmlContent: '<p>We are starting a new volunteer training program next month. Learn how to properly care for animals and help us make a difference in their lives.</p>',
        deltaContent: '{"ops":[{"insert":"We are starting a new volunteer training program..."}]}',
        categoryBlog: {
          id: '3', name: 'Volunteer Programs'
        },
        thumbnail: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=400',
        stamp: '2024-01-08T09:15:00Z',
        view: 156,
        author_id: 'shelter789',
      },
      {
        id: '4',
        topic: 'Pet Health Tips for Winter',
        htmlContent: '<p>Winter is coming and it\'s important to keep your pets healthy during the cold season. Here are some essential tips to help your furry friends stay warm and comfortable.</p>',
        deltaContent: '{"ops":[{"insert":"Winter is coming and it\'s important to keep your pets healthy..."}]}',
        categoryBlog: {
          id: '4', name: 'Health Tips'
        },
        thumbnail: 'https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&w=400',
        stamp: '2024-01-05T16:45:00Z',
        view: 312,
        author_id: 'shelter123',
      },
      {
        id: '5',
        topic: 'Success Story: Max Finds His Forever Home',
        htmlContent: '<p>We are thrilled to share the heartwarming story of Max, a German Shepherd who found his perfect family after months of waiting. This is what makes our work so rewarding!</p>',
        deltaContent: '{"ops":[{"insert":"We are thrilled to share the heartwarming story of Max..."}]}',
        categoryBlog: {
          id: '5', name: 'Success Stories'
        },
        thumbnail: 'https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg?auto=compress&cs=tinysrgb&w=400',
        stamp: '2024-01-03T11:20:00Z',
        view: 428,
        author_id: 'shelter456',
      },
      {
        id: '6',
        topic: 'Fundraising Gala: A Night for Animals',
        htmlContent: '<p>Join us for our annual fundraising gala to support animal welfare initiatives. An evening of entertainment, delicious food, and making a difference in the lives of animals in need.</p>',
        deltaContent: '{"ops":[{"insert":"Join us for our annual fundraising gala..."}]}',
        categoryBlog: {
          id: '2', name: 'Adoption Events'
        },
        thumbnail: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=400',
        stamp: '2024-01-01T14:10:00Z',
        view: 203,
        author_id: 'shelter789',
      }
    ];

    // Simulate loading delay
    setTimeout(() => {
      setPosts(mockPosts);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Get unique categories
  const categories = Array.from(new Set(posts.map(post => post.categoryBlog.name)));

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === '' || post.categoryBlog.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePostClick = (postId: string) => {
    navigationService.goTo(`/news/${postId}`);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar - Search and Filters */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Search */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Search News</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Categories Filter */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Categories</h3>
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === '' 
                      ? 'bg-orange-100 text-orange-700 font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  All Categories ({posts.length})
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === category
                        ? 'bg-orange-100 text-orange-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category} ({posts.filter(p => p.categoryBlog.name === category).length})
                  </button>
                ))}
              </div>

              <button
                onClick={clearFilters}
                className="w-full mt-4 px-3 py-2 text-sm text-orange-600 border border-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
              >
                Clear Filters
              </button>
            </div>

            {/* Stats */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Posts</span>
                  <span className="font-semibold text-gray-900">{posts.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Categories</span>
                  <span className="font-semibold text-gray-900">{categories.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Views</span>
                  <span className="font-semibold text-gray-900">
                    {posts.reduce((sum, post) => sum + post.view, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Latest News & Updates</h1>
            <p className="text-gray-600">
              Stay updated with the latest stories, events, and news from our community
            </p>
            <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
              <span>Showing {filteredPosts.length} of {posts.length} posts</span>
              {(searchQuery || selectedCategory) && (
                <button
                  onClick={clearFilters}
                  className="text-orange-600 hover:text-orange-700 underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Posts Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              <span className="ml-3 text-gray-600">Loading news...</span>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <NewsPostCard
                  key={post.id}
                  post={post}
                  onClick={() => handlePostClick(post.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-500 text-lg mb-4">
                {searchQuery || selectedCategory 
                  ? 'No posts found matching your criteria' 
                  : 'No news posts available'
                }
              </div>
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-orange-600 border border-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};