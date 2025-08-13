import React, { useState } from 'react';
import { useOrganization } from '../../contexts/OrganizationContext';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { X, Image, Send } from 'lucide-react';

interface CreatePostModalProps {
  onClose: () => void;
  feedType: 'public' | 'community' | 'anonymous';
  communityId?: string;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ 
  onClose, 
  feedType, 
  communityId 
}) => {
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const { createPost, isLoading } = useOrganization();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await createPost(
        content, 
        images, 
        communityId, 
        feedType === 'anonymous'
      );
      onClose();
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const addSampleImage = () => {
    const sampleImages = [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop'
    ];
    
    if (images.length < 4) {
      const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
      setImages(prev => [...prev, randomImage]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <GlassCard className="w-full max-w-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Create {feedType === 'anonymous' ? 'Anonymous' : feedType === 'community' ? 'Community' : 'Public'} Post
          </h2>
          <Button onClick={onClose} variant="ghost" size="sm">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <textarea
              placeholder={`What's on your mind?${feedType === 'anonymous' ? ' (This will be posted anonymously)' : ''}`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isLoading}
              rows={4}
              className="w-full px-4 py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 resize-none"
              style={{
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            />
          </div>

          {/* Images */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-32 object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors duration-300"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <Button
              type="button"
              onClick={addSampleImage}
              variant="ghost"
              disabled={images.length >= 4 || isLoading}
              className="flex items-center space-x-2"
            >
              <Image className="w-4 h-4" />
              <span>Add Image ({images.length}/4)</span>
            </Button>

            <div className="flex items-center space-x-3">
              <Button
                type="button"
                onClick={onClose}
                variant="ghost"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={!content.trim() || isLoading}
                loading={isLoading}
                className="flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Post</span>
              </Button>
            </div>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};
