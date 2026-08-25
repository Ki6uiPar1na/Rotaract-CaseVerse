import { useState, useCallback, useEffect } from "react";
import { storage } from "@/lib/storage";

const ADMIN_KEY = "caseverse_admin_auth";
const ADMIN_PASSWORD = "caseverse2026";

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return storage.get<boolean>(ADMIN_KEY) === true;
  });

  useEffect(() => {
    storage.set(ADMIN_KEY, isAuthenticated);
  }, [isAuthenticated]);

  const login = useCallback((password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    storage.remove(ADMIN_KEY);
  }, []);

  return { isAuthenticated, login, logout };
}
