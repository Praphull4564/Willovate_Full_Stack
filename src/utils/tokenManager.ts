import { ENV } from '../config/env';
import type { User } from '../types/auth.types';

const USER_KEY = 'smart_offer_user';

export const tokenManager = {
  setToken: (token: string): void => {
    localStorage.setItem(ENV.TOKEN_KEY, token);
  },

  getToken: (): string | null => {
    return localStorage.getItem(ENV.TOKEN_KEY);
  },

  removeToken: (): void => {
    localStorage.removeItem(ENV.TOKEN_KEY);
  },

  setUser: (user: User): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser: (): User | null => {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr) as User;
    } catch {
      return null;
    }
  },

  clearStorage: (): void => {
    localStorage.removeItem(ENV.TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};
