"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  avatarUrl?: string;
  phone?: string;
  location?: string;
  bio?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserProfile: (updatedUser: User) => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  resetPassword: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const DEFAULT_PASSWORD = "password123";
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // For demo purposes, we'll just use a simple state variable for the password
  // In a real app, this would be handled securely on the server
  const [currentPassword, setCurrentPassword] = useState(DEFAULT_PASSWORD);

  // Check for saved auth token on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        // In a real app, you would validate the stored token with your backend
        const storedUser = localStorage.getItem("vanam_user");
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        
        // Always ensure we have the default password available for testing
        console.log("Using default password for testing:", DEFAULT_PASSWORD);
      } catch (error) {
        console.error("Error restoring auth state:", error);
        localStorage.removeItem("vanam_user");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    setIsLoading(true);
    try {
      // In a real app, make an API call to your auth endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any password for testing
      // This is just for demonstration - in a real app, you would validate credentials properly
      
      // Simulate successful login with mock user data
      const mockUser: User = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email,
        phone: "",
        location: "",
        bio: "I'm a tree enthusiast passionate about reforestation and environmental conservation.",
      };
      
      setUser(mockUser);
      localStorage.setItem("vanam_user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    // Simulate API call
    setIsLoading(true);
    try {
      // In a real app, make an API call to your registration endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store the password
      setCurrentPassword(password);
      
      // Simulate successful registration with mock user data
      const mockUser: User = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        name,
        email,
        phone: "",
        location: "",
        bio: "",
      };
      
      setUser(mockUser);
      localStorage.setItem("vanam_user", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("vanam_user");
  };

  const updateUserProfile = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem("vanam_user", JSON.stringify(updatedUser));
  };
  
  const changePassword = async (providedCurrentPassword: string, newPassword: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // In a real app, make an API call to your change password endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Current system password:", currentPassword);
      console.log("Default password:", DEFAULT_PASSWORD);
      console.log("Password provided by user:", providedCurrentPassword);
      
      // For demo purposes, always accept the default password
      if (providedCurrentPassword !== currentPassword && providedCurrentPassword !== DEFAULT_PASSWORD) {
        console.error("Password verification failed");
        throw new Error("Current password is incorrect");
      }
      
      // Update password
      console.log("Password verification successful");
      setCurrentPassword(newPassword);
      console.log("Password updated to:", newPassword);
    } catch (error) {
      console.error("Password change error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password to default (for testing purposes)
  const resetPassword = () => {
    setCurrentPassword(DEFAULT_PASSWORD);
    console.log("Password reset to default:", DEFAULT_PASSWORD);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    updateUserProfile,
    changePassword,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}; 