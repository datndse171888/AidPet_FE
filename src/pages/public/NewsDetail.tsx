import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Eye, Tag, ArrowLeft, Share2, Heart } from 'lucide-react';
import { Post } from '../../types/Post';
import { Button } from '../../components/ui/Button';
import { navigationService } from '../../utils/NavigationService';
import { formatDate } from '../../utils/FormatUtil';

export const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (id) {
      // Mock data - replace with actual API call
      const mockPost: Post = {
        id: id,
        topic: 'Help Us Save Abandoned Puppies',
        htmlContent: `
          <div class="prose max-w-none">
            <p>We recently rescued several abandoned puppies who need urgent medical care and loving homes. These adorable little ones were found in poor condition but are now receiving the care they need at our shelter.</p>
            
            <h3>Their Story</h3>
            <p>Last week, our rescue team received a call about several puppies found abandoned in a cardboard box behind a local store. When we arrived, we found five puppies, approximately 6-8 weeks old, who were clearly malnourished and in need of immediate medical attention.</p>
            
            <h3>Current Condition</h3>
            <p>Thanks to the dedicated care of our veterinary team and volunteers, all five puppies are now healthy and thriving. They've received their first round of vaccinations, have been dewormed, and are eating well.</p>
            
            <h3>Looking for Forever Homes</h3>
            <p>These precious puppies are now ready to find their forever families. They are:</p>
            <ul>
              <li>Playful and energetic</li>
              <li>Good with children and other pets</li>
              <li>Up to date on vaccinations</li>
              <li>Microchipped for safety</li>
            </ul>
            
            <h3>How You Can Help</h3>
            <p>If you're interested in adopting one of these wonderful puppies, please contact us to schedule a meet-and-greet. We also accept donations to help cover medical expenses for future rescues.</p>
            
            <p>Every animal deserves a loving home, and with your help, we can continue to make a difference in their lives.</p>
          </div>
        `,
        deltaContent: '{"ops":[{"insert":"We recently rescued several abandoned puppies..."}]}',
        categoryBlog: {
          id: '1', name: 'Rescue Stories'
        },
        thumbnail: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800',
        view: 245,
        stamp: '2024-01-15T10:00:00Z',
        author_id: 'shelter123',
      };

      const mockRelatedPosts: Post[] = [
        {
          id: '2',
          topic: 'Cat Adoption Event This Weekend',
          htmlContent: '<p>Join us this weekend for our special cat adoption event!</p>',
          deltaContent: '{"ops":[{"insert":"Join us this weekend..."}]}',
          categoryBlog: { id: '2', name: 'Adoption Events' },
          thumbnail: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=400',
          view: 189,
          stamp: '2024-01-10T14:30:00Z',
          author_id: 'shelter456',
        },
        {
          id: '3',
          topic: 'Success Story: Max Finds His Forever Home',
          htmlContent: '<p>We are thrilled to share the heartwarming story of Max!</p>',
          deltaContent: '{"ops":[{"insert":"We are thrilled..."}]}',
          categoryBlog: { id: '5', name: 'Success Stories' },
          thumbnail: 'https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg?auto=compress&cs=tinysrgb&w=400',
          view: 428,
          stamp: '2024-01-03T11:20:00Z',
          author_id: 'shelter456',
        }
      ];

      setTimeout(() => {
        setPost(mockPost);
        setRelatedPosts(mockRelatedPosts);
        setIsLoading(false);
      }, 1000);
    }
  }, [id]);

  const handleGoBack = () => {
    navigationService.goBack();
  };

  const handleRelatedPostClick = (postId: string) => {
    navigationService.goTo(`/news/${postId}`);
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-64 bg-gray-300 rounded mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
        <Button onClick={handleGoBack} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Back Button */}
          <Button 
            onClick={handleGoBack} 
            variant="outline" 
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to News
          </Button>

          {/* Article Header */}
          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={post.thumbnail}
              alt={post.topic}
              className="w-full h-64 md:h-80 object-cover"
            />
            
            <div className="p-6 md:p-8">
              {/* Category and Meta */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-700">
                  <Tag className="h-4 w-4 mr-1" />
                  {post.categoryBlog.name}
                </span>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{formatDate(post.stamp)}</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>{post.view.toLocaleString()} views</span>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                {post.topic}
              </h1>

              {/* Content */}
              <div 
                className="prose max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.htmlContent }}
              />

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                <div className="flex items-center space-x-4">
                  <Button size="sm" variant="outline">
                    <Heart className="h-4 w-4 mr-2" />
                    Like
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
                <span className="text-sm text-gray-500">
                  Article #{post.id}
                </span>
              </div>
            </div>
          </article>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Related Posts */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
              <div className="space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <div 
                    key={relatedPost.id}
                    onClick={() => handleRelatedPostClick(relatedPost.id)}
                    className="cursor-pointer group"
                  >
                    <img
                      src={relatedPost.thumbnail}
                      alt={relatedPost.topic}
                      className="w-full h-24 object-cover rounded-lg mb-2 group-hover:opacity-80 transition-opacity"
                    />
                    <h4 className="text-sm font-medium text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {relatedPost.topic}
                    </h4>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Eye className="h-3 w-3 mr-1" />
                      <span>{relatedPost.view} views</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  Rescue Stories
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  Adoption Events
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  Success Stories
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  Health Tips
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};