"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";

// Define user type
export interface Member {
  id: string;
  email: string;
  name: string;
  role: "member" | "admin";
}

// Context type
interface MemberContextType {
  member: Member | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<boolean>;
}

// Create context
const MemberContext = createContext<MemberContextType | undefined>(undefined);

// Mock users for demo purposes - in a real app, this would be in a database
const MOCK_USERS = [
  {
    id: "1",
    email: "admin@stmarys.com",
    password: "password123", // In a real app, never store plain text passwords
    name: "Admin User",
    role: "admin" as const,
  },
  {
    id: "2",
    email: "member@stmarys.com",
    password: "password123",
    name: "Parish Member",
    role: "member" as const,
  },
];

// Provider component
export const MemberProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [member, setMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("member");
    if (storedUser) {
      try {
        setMember(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user", error);
        localStorage.removeItem("member");
      }
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Find user (in a real app, this would be an API call)
      const user = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Create member object (omitting password)
        const memberData: Member = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
        
        setMember(memberData);
        localStorage.setItem("member", JSON.stringify(memberData));
        toast({
          title: "Welcome back!",
          description: `You're now logged in as ${user.name}`,
        });
        return true;
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("member");
    setMember(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  // Register function (simplified)
  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      if (MOCK_USERS.some(u => u.email === email)) {
        toast({
          title: "Registration failed",
          description: "Email already in use",
          variant: "destructive",
        });
        return false;
      }
      
      // In a real app, this would create a new user in the database
      toast({
        title: "Registration successful",
        description: "Your account has been created. You can now log in.",
      });
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const contextValue: MemberContextType = {
    member,
    isLoading,
    isAuthenticated: !!member,
    login,
    logout,
    register,
  };

  return (
    <MemberContext.Provider value={contextValue}>
      {children}
    </MemberContext.Provider>
  );
};

// Custom hook for using the member context
export const useMember = () => {
  const context = useContext(MemberContext);
  if (context === undefined) {
    throw new Error("useMember must be used within a MemberProvider");
  }
  return context;
};
