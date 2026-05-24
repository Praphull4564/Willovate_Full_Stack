import { api } from './api';
import type { AuthResponse, LoginCredentials } from '../types/auth.types';

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', {
      email: credentials.email,
      password: credentials.password,
    });
    // Backend wraps response in { success, data }
    const data = response.data.data ?? response.data;
    return {
      token: data.token,
      user: {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
      },
    };
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', payload);
    const data = response.data.data ?? response.data;
    return {
      token: data.token,
      user: {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
      },
    };
  },

  me: async (): Promise<AuthResponse['user']> => {
    const response = await api.get('/auth/me');
    const data = response.data.data ?? response.data;
    return data;
  },
};
