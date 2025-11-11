"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { AuthState, Profile } from "@/lib/types";
import { mockProfiles } from "@/lib/mock-data";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (nickname: string, avatar_url?: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    // Load auth state from localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setAuthState({
        user: JSON.parse(savedUser),
        isAuthenticated: true,
      });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in production, this would call an API
    // For demo purposes, any email/password combination works
    if (email && password) {
      const user = mockProfiles[0]; // Use first mock profile
      setAuthState({
        user,
        isAuthenticated: true,
      });
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
    localStorage.removeItem("user");
  };

  const updateProfile = (nickname: string, avatar_url?: string) => {
    if (authState.user) {
      const updatedUser: Profile = {
        ...authState.user,
        nickname,
        avatar_url: avatar_url || authState.user.avatar_url,
        updated_at: new Date().toISOString(),
      };
      setAuthState({
        user: updatedUser,
        isAuthenticated: true,
      });
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{ ...authState, login, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
