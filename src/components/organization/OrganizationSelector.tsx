import React, { useState } from 'react';
import { useOrganization } from '../../contexts/OrganizationContext';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Building2, Plus, Search } from 'lucide-react';

export const OrganizationSelector: React.FC = () => {
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [orgId, setOrgId] = useState('');
  const [orgName, setOrgName] = useState('');
  const [orgDescription, setOrgDescription] = useState('');
  const { joinOrganization, createOrganization, isLoading } = useOrganization();

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await joinOrganization(orgId);
    } catch (error) {
      alert('Organization not found. Please check the ID and try again.');
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createOrganization(orgId, orgName, orgDescription);
    } catch (error) {
      alert('Failed to create organization. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20"></div>
      
      <GlassCard className="w-full max-w-2xl p-8 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 mb-4">
            <Building2 className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Join an Organization</h1>
          <p className="text-gray-600">Connect with your team and start collaborating</p>
        </div>

        {!showJoinForm && !showCreateForm && (
          <div className="grid md:grid-cols-2 gap-6">
            <GlassCard className="p-6 text-center" onClick={() => setShowJoinForm(true)}>
              <Search className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Join Existing</h3>
              <p className="text-gray-600 mb-4">Enter an organization ID to join an existing team</p>
              <Button variant="secondary" size="sm">Join Organization</Button>
            </GlassCard>

            <GlassCard className="p-6 text-center" onClick={() => setShowCreateForm(true)}>
              <Plus className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Create New</h3>
              <p className="text-gray-600 mb-4">Start your own organization and invite team members</p>
              <Button variant="secondary" size="sm">Create Organization</Button>
            </GlassCard>
          </div>
        )}

        {showJoinForm && (
          <form onSubmit={handleJoin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organization ID</label>
              <Input
                type="text"
                placeholder="Enter organization ID (e.g., tech-corp)"
                value={orgId}
                onChange={setOrgId}
                disabled={isLoading}
              />
              <p className="text-sm text-gray-500 mt-1">Ask your admin for the organization ID</p>
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
                loading={isLoading}
              >
                Join Organization
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowJoinForm(false)}
                disabled={isLoading}
              >
                Back
              </Button>
            </div>
          </form>
        )}

        {showCreateForm && (
          <form onSubmit={handleCreate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organization ID</label>
              <Input
                type="text"
                placeholder="my-company (lowercase, no spaces)"
                value={orgId}
                onChange={setOrgId}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name</label>
              <Input
                type="text"
                placeholder="My Company"
                value={orgName}
                onChange={setOrgName}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                placeholder="Brief description of your organization..."
                value={orgDescription}
                onChange={(e) => setOrgDescription(e.target.value)}
                disabled={isLoading}
                rows={3}
                className="w-full px-4 py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 resize-none"
                style={{
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                }}
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                variant="primary"
                className="flex-1"
                loading={isLoading}
              >
                Create Organization
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowCreateForm(false)}
                disabled={isLoading}
              >
                Back
              </Button>
            </div>
          </form>
        )}
      </GlassCard>
    </div>
  );
};
