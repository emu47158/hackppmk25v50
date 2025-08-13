import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Users, Mail, Lock, User, AtSign, Heart } from 'lucide-react';

export const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const { login, register, isLoading } = useAuth();

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!isLogin) {
      if (!name.trim()) {
        newErrors.name = 'Full name is required';
      }
      
      if (!nickname.trim()) {
        newErrors.nickname = 'Nickname is required';
      }
      
      if (!username.trim()) {
        newErrors.username = 'Username is required';
      } else if (username.length < 3) {
        newErrors.username = 'Username must be at least 3 characters';
      } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        newErrors.username = 'Username can only contain letters, numbers, and underscores';
      }
      
      if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, name, nickname, username);
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setNickname('');
    setUsername('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20"></div>
      
      <GlassCard className="w-full max-w-md p-8 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 mb-4">
            <Users className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">SocialOrg</h1>
          <p className="text-gray-600">Connect with your organization</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={setName}
                  className="pl-12"
                  disabled={isLoading}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div className="relative">
                <Heart className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Nickname"
                  value={nickname}
                  onChange={setNickname}
                  className="pl-12"
                  disabled={isLoading}
                />
                {errors.nickname && <p className="text-red-500 text-sm mt-1">{errors.nickname}</p>}
              </div>

              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={setUsername}
                  className="pl-12"
                  disabled={isLoading}
                />
                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
              </div>
            </>
          )}
          
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <Input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={setEmail}
              className="pl-12"
              disabled={isLoading}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={setPassword}
              className="pl-12"
              disabled={isLoading}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {!isLogin && (
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                className="pl-12"
                disabled={isLoading}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full mt-6"
            loading={isLoading}
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={switchMode}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
            disabled={isLoading}
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </GlassCard>
    </div>
  );
};
