import React, { createContext, useContext, useState, useEffect } from 'react';
import { Organization, Community, Post } from '../types';

interface OrganizationContextType {
  currentOrganization: Organization | null;
  userOrganizations: Organization[];
  communities: Community[];
  posts: Post[];
  setCurrentOrganization: (org: Organization) => void;
  joinOrganization: (orgId: string) => Promise<void>;
  createOrganization: (orgId: string, name: string, description: string) => Promise<void>;
  createCommunity: (name: string, description: string, isPrivate: boolean) => Promise<void>;
  createPost: (content: string, images: string[], communityId?: string, isAnonymous?: boolean) => Promise<void>;
  isLoading: boolean;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
};

export const OrganizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentOrganization, setCurrentOrganizationState] = useState<Organization | null>(null);
  const [userOrganizations, setUserOrganizations] = useState<Organization[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  const mockOrganizations: Organization[] = [
    {
      id: 'tech-corp',
      name: 'Tech Corp',
      description: 'Leading technology company focused on innovation',
      createdBy: '1',
      members: ['1', '2', '3'],
      admins: ['1'],
      createdAt: new Date('2024-01-01')
    },
    {
      id: 'design-studio',
      name: 'Design Studio',
      description: 'Creative design agency specializing in digital experiences',
      createdBy: '1',
      members: ['1', '4', '5'],
      admins: ['1'],
      createdAt: new Date('2024-02-01')
    }
  ];

  const mockCommunities: Community[] = [
    {
      id: 'dev-team',
      name: 'Development Team',
      description: 'Internal discussions for the development team',
      organizationId: 'tech-corp',
      members: ['1', '2'],
      createdBy: '1',
      isPrivate: true,
      createdAt: new Date('2024-01-15')
    },
    {
      id: 'design-team',
      name: 'Design Team',
      description: 'Creative discussions and feedback',
      organizationId: 'tech-corp',
      members: ['1', '3'],
      createdBy: '1',
      isPrivate: false,
      createdAt: new Date('2024-01-20')
    }
  ];

  const mockPosts: Post[] = [
    {
      id: '1',
      content: 'Excited to announce our new product launch! 🚀 We\'ve been working hard on this for months.',
      images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop'],
      authorId: '1',
      authorName: 'John Doe',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      organizationId: 'tech-corp',
      createdAt: new Date('2024-03-15T10:30:00'),
      likes: 24,
      comments: 8
    },
    {
      id: '2',
      content: 'Great team meeting today! Looking forward to implementing the new features discussed.',
      images: [],
      authorId: '2',
      authorName: 'Jane Smith',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      organizationId: 'tech-corp',
      communityId: 'dev-team',
      createdAt: new Date('2024-03-14T15:45:00'),
      likes: 12,
      comments: 3
    },
    {
      id: '3',
      content: 'Anonymous feedback: The new office layout is much better for collaboration.',
      images: [],
      authorId: '3',
      authorName: 'Anonymous',
      organizationId: 'tech-corp',
      isAnonymous: true,
      createdAt: new Date('2024-03-13T09:15:00'),
      likes: 18,
      comments: 5
    }
  ];

  useEffect(() => {
    // Load stored organization
    const storedOrg = localStorage.getItem('currentOrganization');
    if (storedOrg) {
      const org = JSON.parse(storedOrg);
      setCurrentOrganizationState(org);
      setUserOrganizations(mockOrganizations);
      setCommunities(mockCommunities.filter(c => c.organizationId === org.id));
      setPosts(mockPosts.filter(p => p.organizationId === org.id));
    }
  }, []);

  const setCurrentOrganization = (org: Organization) => {
    setCurrentOrganizationState(org);
    localStorage.setItem('currentOrganization', JSON.stringify(org));
    setCommunities(mockCommunities.filter(c => c.organizationId === org.id));
    setPosts(mockPosts.filter(p => p.organizationId === org.id));
  };

  const joinOrganization = async (orgId: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const org = mockOrganizations.find(o => o.id === orgId);
      if (org) {
        setUserOrganizations(prev => [...prev, org]);
        setCurrentOrganization(org);
      } else {
        throw new Error('Organization not found');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const createOrganization = async (orgId: string, name: string, description: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newOrg: Organization = {
        id: orgId,
        name,
        description,
        createdBy: '1',
        members: ['1'],
        admins: ['1'],
        createdAt: new Date()
      };
      setUserOrganizations(prev => [...prev, newOrg]);
      setCurrentOrganization(newOrg);
    } finally {
      setIsLoading(false);
    }
  };

  const createCommunity = async (name: string, description: string, isPrivate: boolean) => {
    if (!currentOrganization) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newCommunity: Community = {
        id: Date.now().toString(),
        name,
        description,
        organizationId: currentOrganization.id,
        members: ['1'],
        createdBy: '1',
        isPrivate,
        createdAt: new Date()
      };
      setCommunities(prev => [...prev, newCommunity]);
    } finally {
      setIsLoading(false);
    }
  };

  const createPost = async (content: string, images: string[], communityId?: string, isAnonymous?: boolean) => {
    if (!currentOrganization) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newPost: Post = {
        id: Date.now().toString(),
        content,
        images,
        authorId: isAnonymous ? 'anonymous' : '1',
        authorName: isAnonymous ? 'Anonymous' : 'John Doe',
        authorAvatar: isAnonymous ? undefined : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        organizationId: currentOrganization.id,
        communityId,
        isAnonymous,
        createdAt: new Date(),
        likes: 0,
        comments: 0
      };
      setPosts(prev => [newPost, ...prev]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OrganizationContext.Provider value={{
      currentOrganization,
      userOrganizations,
      communities,
      posts,
      setCurrentOrganization,
      joinOrganization,
      createOrganization,
      createCommunity,
      createPost,
      isLoading
    }}>
      {children}
    </OrganizationContext.Provider>
  );
};
