
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

// Define user type
export interface Member {
  id: string;
  email: string;
  name: string;
  role: "member" | "admin";
}

// Define profile type to match the database structure
interface Profile {
  name: string | null;
  role: string | null;
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

// Provider component
export const MemberProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [member, setMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  // Set up authentication listener and check for existing session
  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        if (currentSession?.user) {
          // Don't call Supabase inside the callback directly to avoid deadlocks
          setTimeout(() => {
            fetchUserProfile(currentSession.user);
          }, 0);
        } else {
          setMember(null);
          setIsLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      if (currentSession?.user) {
        fetchUserProfile(currentSession.user);
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Helper function to fetch user profile data
  const fetchUserProfile = async (user: User) => {
    try {
      // Using type assertion with explicit type for better type safety
      const { data, error } = await supabase
        .from('profiles' as any)
        .select('name, role')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error);
        setMember(null);
      } else if (data) {
        // Explicitly type the data as Profile
        const profileData = data as Profile;
        
        // Create member object from Supabase data
        setMember({
          id: user.id,
          email: user.email || '',
          name: profileData.name || user.email?.split('@')[0] || 'User',
          role: (profileData.role as "admin" | "member") || "member"
        });
      }
    } catch (error) {
      console.error("Error in profile fetch:", error);
      setMember(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
        return false;
      } else {
        toast({
          title: "Welcome back!",
          description: "You're now logged in",
        });
        return true;
      }
    } catch (error: any) {
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
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem("member");
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout error",
        description: "An error occurred during logout",
        variant: "destructive",
      });
    }
  };

  // Register function
  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          }
        }
      });
      
      if (error) {
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive",
        });
        return false;
      } else {
        toast({
          title: "Registration successful",
          description: "Your account has been created. You can now log in.",
        });
        return true;
      }
    } catch (error: any) {
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
