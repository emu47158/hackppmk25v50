import React, { useState } from 'react';
import { useOrganization } from '../../contexts/OrganizationContext';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { X, Users, Lock, Globe } from 'lucide-react';

interface CreateCommunityModalProps {
  onClose: () => void;
}

export const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const { createCommunity, isLoading } = useOrganization();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    try {
      await createCommunity(name, description, isPrivate);
      onClose();
    } catch (error) {
      console.error('Failed to create community:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <GlassCard className="w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Create Community</h2>
          <Button onClick={onClose} variant="ghost" size="sm">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Community Name</label>
            <Input
              type="text"
              placeholder="e.g., Development Team"
              value={name}
              onChange={setName}
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              placeholder="Brief description of this community..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
              rows={3}
              className="w-full px-4 py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 resize-none"
              style={{
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Privacy Setting</label>
            <div className="space-y-3">
              <GlassCard 
                className={`p-4 cursor-pointer transition-all duration-300 ${
                  !isPrivate ? 'ring-2 ring-blue-500/50 bg-blue-500/10' : 'hover:bg-white/15'
                }`}
                onClick={() => setIsPrivate(false)}
              >
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-green-600" />
                  <div>
                    <h4 className="font-medium text-gray-800">Public Community</h4>
                    <p className="text-sm text-gray-600">Anyone in the organization can join and see posts</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard 
                className={`p-4 cursor-pointer transition-all duration-300 ${
                  isPrivate ? 'ring-2 ring-blue-500/50 bg-blue-500/10' : 'hover:bg-white/15'
                }`}
                onClick={() => setIsPrivate(true)}
              >
                <div className="flex items-center space-x-3">
                  <Lock className="w-5 h-5 text-orange-600" />
                  <div>
                    <h4 className="font-medium text-gray-800">Private Community</h4>
                    <p className="text-sm text-gray-600">Only invited members can join and see posts</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              type="button"
              onClick={onClose}
              variant="ghost"
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!name.trim() || !description.trim() || isLoading}
              loading={isLoading}
              className="flex-1 flex items-center justify-center space-x-2"
            >
              <Users className="w-4 h-4" />
              <span>Create</span>
            </Button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};
