import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, getUserFromToken } from '@/helpers/auth';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = getToken();
      const userData = getUserFromToken();
      
      if (!token || !userData) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
        router.push('/login');
        return;
      }

      setIsAuthenticated(true);
      setUser(userData);
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const logout = () => {
    // Limpar token
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setIsAuthenticated(false);
    setUser(null);
    router.push('/login');
  };

  return {
    isAuthenticated,
    user,
    loading,
    logout
  };
} 