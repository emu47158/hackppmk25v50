import React from 'react';
import { Post } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <GlassCard className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {post.authorAvatar ? (
            <img
              src={post.authorAvatar}
              alt={post.authorName}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-400/20 to-gray-600/20 flex items-center justify-center">
              <span className="text-gray-600 font-semibold">?</span>
            </div>
          )}
          <div>
            <h3 className="font-semibold text-gray-800">{post.authorName}</h3>
            <p className="text-sm text-gray-600">{formatDate(post.createdAt)}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-800 leading-relaxed">{post.content}</p>
      </div>

      {/* Images */}
      {post.images.length > 0 && (
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-2">
            {post.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Post image ${index + 1}`}
                className="rounded-xl object-cover w-full h-48"
              />
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-white/20">
        <div className="flex items-center space-x-6">
          <Button variant="ghost" size="sm" className="flex items-center space-x-2">
            <Heart className="w-4 h-4" />
            <span>{post.likes}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center space-x-2">
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments}</span>
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          <Share className="w-4 h-4" />
        </Button>
      </div>
    </GlassCard>
  );
};
