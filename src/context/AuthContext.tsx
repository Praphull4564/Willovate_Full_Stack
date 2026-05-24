import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, LoginCredentials } from '../types/auth.types';
import { authService } from '../services/authService';
import type { RegisterPayload } from '../services/authService';
import { tokenManager } from '../utils/tokenManager';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = () => {
      const token = tokenManager.getToken();
      const storedUser = tokenManager.getUser();
      if (token && storedUser) {
        setUser(storedUser);
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const response = await authService.login(credentials);
    tokenManager.setToken(response.token);
    tokenManager.setUser(response.user);
    setUser(response.user);
  };

  const register = async (payload: RegisterPayload) => {
    const response = await authService.register(payload);
    tokenManager.setToken(response.token);
    tokenManager.setUser(response.user);
    setUser(response.user);
  };

  const logout = () => {
    tokenManager.clearStorage();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
