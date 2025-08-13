import React, { useState } from 'react';
import { useOrganization } from '../../contexts/OrganizationContext';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { PostCard } from './PostCard';
import { CreatePostModal } from './CreatePostModal';
import { CreateCommunityModal } from './CreateCommunityModal';
import { Plus, Users, Lock, Globe } from 'lucide-react';

export const CommunityFeed: React.FC = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showCreateCommunity, setShowCreateCommunity] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);
  const { communities, posts } = useOrganization();

  const communityPosts = posts.filter(post => 
    post.communityId && (!selectedCommunity || post.communityId === selectedCommunity)
  );

  const selectedCommunityData = communities.find(c => c.id === selectedCommunity);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Communities</h1>
            <p className="text-gray-600">Connect with specific groups within your organization</p>
          </div>
          <Button
            onClick={() => setShowCreateCommunity(true)}
            variant="primary"
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Community</span>
          </Button>
        </div>

        {/* Communities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {communities.map((community) => (
            <GlassCard
              key={community.id}
              className={`p-4 cursor-pointer transition-all duration-300 ${
                selectedCommunity === community.id 
                  ? 'ring-2 ring-blue-500/50 bg-blue-500/10' 
                  : 'hover:bg-white/15'
              }`}
              onClick={() => setSelectedCommunity(
                selectedCommunity === community.id ? null : community.id
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {community.isPrivate ? (
                    <Lock className="w-5 h-5 text-orange-600" />
                  ) : (
                    <Globe className="w-5 h-5 text-green-600" />
                  )}
                  <h3 className="font-semibold text-gray-800">{community.name}</h3>
                </div>
                <span className="text-xs text-gray-500 bg-white/20 px-2 py-1 rounded-full">
                  {community.members.length} members
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{community.description}</p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Users className="w-3 h-3" />
                <span>{community.isPrivate ? 'Private' : 'Public'} Community</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </GlassCard>

      {/* Selected Community Feed */}
      {selectedCommunity && (
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              {selectedCommunityData?.isPrivate ? (
                <Lock className="w-6 h-6 text-orange-600" />
              ) : (
                <Globe className="w-6 h-6 text-green-600" />
              )}
              <div>
                <h2 className="text-xl font-bold text-gray-800">{selectedCommunityData?.name}</h2>
                <p className="text-gray-600">{selectedCommunityData?.description}</p>
              </div>
            </div>
            <Button
              onClick={() => setShowCreatePost(true)}
              variant="primary"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Post</span>
            </Button>
          </div>

          {/* Community Posts */}
          <div className="space-y-4">
            {communityPosts.filter(post => post.communityId === selectedCommunity).length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No posts yet</h3>
                <p className="text-gray-600 mb-4">Start the conversation in this community!</p>
                <Button
                  onClick={() => setShowCreatePost(true)}
                  variant="secondary"
                >
                  Create First Post
                </Button>
              </div>
            ) : (
              communityPosts
                .filter(post => post.communityId === selectedCommunity)
                .map((post) => (
                  <PostCard key={post.id} post={post} />
                ))
            )}
          </div>
        </GlassCard>
      )}

      {/* All Community Posts */}
      {!selectedCommunity && communityPosts.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800">Recent Community Posts</h2>
          {communityPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* Create Post Modal */}
      {showCreatePost && selectedCommunity && (
        <CreatePostModal
          onClose={() => setShowCreatePost(false)}
          feedType="community"
          communityId={selectedCommunity}
        />
      )}

      {/* Create Community Modal */}
      {showCreateCommunity && (
        <CreateCommunityModal
          onClose={() => setShowCreateCommunity(false)}
        />
      )}
    </div>
  );
};
