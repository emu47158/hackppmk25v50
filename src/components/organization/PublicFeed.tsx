import React, { useState } from 'react';
import { useOrganization } from '../../contexts/OrganizationContext';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { PostCard } from './PostCard';
import { CreatePostModal } from './CreatePostModal';
import { Plus, Search } from 'lucide-react';

export const PublicFeed: React.FC = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { posts } = useOrganization();

  const publicPosts = posts.filter(post => !post.communityId && !post.isAnonymous);
  const filteredPosts = publicPosts.filter(post => 
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.authorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Public Feed</h1>
            <p className="text-gray-600">Share updates with your entire organization</p>
          </div>
          <Button
            onClick={() => setShowCreatePost(true)}
            variant="primary"
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Post</span>
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={setSearchQuery}
            className="pl-12"
          />
        </div>
      </GlassCard>

      {/* Posts */}
      <div className="space-y-6">
        {filteredPosts.length === 0 ? (
          <GlassCard className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No posts yet</h3>
            <p className="text-gray-600 mb-6">Be the first to share something with your organization!</p>
            <Button
              onClick={() => setShowCreatePost(true)}
              variant="primary"
            >
              Create First Post
            </Button>
          </GlassCard>
        ) : (
          filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <CreatePostModal
          onClose={() => setShowCreatePost(false)}
          feedType="public"
        />
      )}
    </div>
  );
};
