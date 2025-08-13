import React, { useState } from 'react';
import { useOrganization } from '../../contexts/OrganizationContext';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { PostCard } from './PostCard';
import { CreatePostModal } from './CreatePostModal';
import { Plus, Search, UserX, Shield } from 'lucide-react';

export const AnonymousFeed: React.FC = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { posts } = useOrganization();

  const anonymousPosts = posts.filter(post => post.isAnonymous);
  const filteredPosts = anonymousPosts.filter(post => 
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Anonymous Feed</h1>
            <p className="text-gray-600">Share feedback and thoughts anonymously</p>
          </div>
          <Button
            onClick={() => setShowCreatePost(true)}
            variant="primary"
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Post Anonymously</span>
          </Button>
        </div>

        {/* Privacy Notice */}
        <GlassCard className="p-4 mb-4 bg-blue-500/10 border-blue-500/20">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-blue-800 mb-1">Privacy Protected</h3>
              <p className="text-sm text-blue-700">
                Your identity is completely anonymous. Posts cannot be traced back to you, 
                allowing for honest feedback and open discussions.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <Input
            type="text"
            placeholder="Search anonymous posts..."
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
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-600/20 flex items-center justify-center mx-auto mb-4">
              <UserX className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No anonymous posts yet</h3>
            <p className="text-gray-600 mb-6">
              Share your thoughts, feedback, or concerns anonymously. 
              Your identity will remain completely private.
            </p>
            <Button
              onClick={() => setShowCreatePost(true)}
              variant="primary"
            >
              Post Anonymously
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
          feedType="anonymous"
        />
      )}
    </div>
  );
};
