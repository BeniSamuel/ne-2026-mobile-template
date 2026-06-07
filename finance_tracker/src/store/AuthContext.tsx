import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/auth.service';
import { LoginPayload, SignupPayload, User } from '../types/auth.types';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  error: string;
  login: (payload: LoginPayload) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function restoreSession() {
      try {
        const savedUser = await authService.getSavedUser();
        setUser(savedUser);
      } catch {
        setError('Could not restore your session.');
      } finally {
        setIsLoading(false);
      }
    }

    restoreSession();
  }, []);

  async function login(payload: LoginPayload) {
    setIsLoading(true);
    setError('');

    try {
      const authenticatedUser = await authService.login(payload);
      setUser(authenticatedUser);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Login failed.');
    } finally {
      setIsLoading(false);
    }
  }

  async function signup(payload: SignupPayload) {
    setIsLoading(true);
    setError('');

    try {
      const authenticatedUser = await authService.signup(payload);
      setUser(authenticatedUser);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Signup failed.');
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    setIsLoading(true);
    await authService.logout();
    setUser(null);
    setIsLoading(false);
  }

  const value = useMemo(
    () => ({
      user,
      isLoading,
      error,
      login,
      signup,
      logout,
      clearError: () => setError(''),
    }),
    [user, isLoading, error],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }

  return context;
}
