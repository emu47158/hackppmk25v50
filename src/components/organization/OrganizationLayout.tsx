import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useOrganization } from '../../contexts/OrganizationContext';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { PublicFeed } from './PublicFeed';
import { CommunityFeed } from './CommunityFeed';
import { AnonymousFeed } from './AnonymousFeed';
import { ChatPage } from './ChatPage';
import { 
  ChevronDown, 
  LogOut, 
  Plus, 
  Globe, 
  Users, 
  UserX, 
  MessageCircle,
  Building2
} from 'lucide-react';

type ActivePage = 'public' | 'community' | 'anonymous' | 'chat';

export const OrganizationLayout: React.FC = () => {
  const [activePage, setActivePage] = useState<ActivePage>('public');
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const [showJoinCreate, setShowJoinCreate] = useState(false);
  const { user, logout } = useAuth();
  const { currentOrganization, userOrganizations, setCurrentOrganization } = useOrganization();

  const handleOrgSwitch = (org: any) => {
    setCurrentOrganization(org);
    setShowOrgDropdown(false);
  };

  const renderActivePage = () => {
    switch (activePage) {
      case 'public':
        return <PublicFeed />;
      case 'community':
        return <CommunityFeed />;
      case 'anonymous':
        return <AnonymousFeed />;
      case 'chat':
        return <ChatPage />;
      default:
        return <PublicFeed />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10"></div>
      
      <div className="relative z-10 flex h-screen">
        {/* Left Sidebar */}
        <div className="w-80 p-6 space-y-6">
          {/* Organization Selector */}
          <GlassCard className="p-4">
            <div>
              <button
                onClick={() => setShowOrgDropdown(!showOrgDropdown)}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-colors duration-300"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">{currentOrganization?.name}</p>
                    <p className="text-sm text-gray-600">{currentOrganization?.members.length} members</p>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${showOrgDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Content - Now part of the flow */}
              <div className={`overflow-hidden transition-all duration-300 ${showOrgDropdown ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="mt-2 p-2 rounded-xl backdrop-blur-md bg-white/10 border border-white/20">
                  {userOrganizations.map((org) => (
                    <button
                      key={org.id}
                      onClick={() => handleOrgSwitch(org)}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors duration-300"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-gray-800">{org.name}</p>
                        <p className="text-xs text-gray-600">{org.members.length} members</p>
                      </div>
                    </button>
                  ))}
                  <hr className="border-white/20 my-2" />
                  <button
                    onClick={() => setShowJoinCreate(true)}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors duration-300 text-blue-600"
                  >
                    <Plus className="w-5 h-5" />
                    <span className="font-medium">Join/Create Organization</span>
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Navigation */}
          <GlassCard className="p-4">
            <nav className="space-y-2">
              <button
                onClick={() => setActivePage('public')}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                  activePage === 'public' 
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-700' 
                    : 'hover:bg-white/10 text-gray-700'
                }`}
              >
                <Globe className="w-5 h-5" />
                <span className="font-medium">Public</span>
              </button>

              <button
                onClick={() => setActivePage('community')}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                  activePage === 'community' 
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-700' 
                    : 'hover:bg-white/10 text-gray-700'
                }`}
              >
                <Users className="w-5 h-5" />
                <span className="font-medium">Community</span>
              </button>

              <button
                onClick={() => setActivePage('anonymous')}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                  activePage === 'anonymous' 
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-700' 
                    : 'hover:bg-white/10 text-gray-700'
                }`}
              >
                <UserX className="w-5 h-5" />
                <span className="font-medium">Anonymous</span>
              </button>

              <button
                onClick={() => setActivePage('chat')}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                  activePage === 'chat' 
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-700' 
                    : 'hover:bg-white/10 text-gray-700'
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">Chat</span>
              </button>
            </nav>
          </GlassCard>

          {/* User Profile */}
          <GlassCard className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800">{user?.name}</p>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
              </div>
              <Button
                onClick={logout}
                variant="ghost"
                size="sm"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </GlassCard>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {renderActivePage()}
        </div>
      </div>
    </div>
  );
};
