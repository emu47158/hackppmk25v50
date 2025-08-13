export interface User {
  id: string;
  email: string;
  name: string;
  nickname?: string;
  username?: string;
  avatar?: string;
}

export interface Organization {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  members: string[];
  admins: string[];
  createdAt: Date;
}

export interface Post {
  id: string;
  content: string;
  images: string[];
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  organizationId: string;
  communityId?: string;
  isAnonymous?: boolean;
  createdAt: Date;
  likes: number;
  comments: number;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  organizationId: string;
  members: string[];
  createdBy: string;
  isPrivate: boolean;
  createdAt: Date;
}
