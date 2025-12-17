import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api/client';
import { Loader } from '../components/Loader/Loader';

// Define a flexible User type to accommodate varying response structures from the API.
type User = any;

interface AuthContextType {
  user: User | null;
  login: (email: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await api.getProfile();
        setUser(res.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const login = async (email: string) => {
    // Use a fixed password for all users to simplify the login process for this assignment.
    await api.login(email, 'password123');
    const res = await api.getProfile();
    setUser(res.data);
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
  };

  if (loading) {
    return <Loader fullScreen />;
  }
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
