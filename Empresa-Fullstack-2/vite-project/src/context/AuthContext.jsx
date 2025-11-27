import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import AuthService from '../services/AuthService';

export const AuthContext = createContext(null);
const STORAGE_KEY = 'lvlup.auth.session';

const decodeJwtPayload = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let decoded = '';
    if (typeof globalThis !== 'undefined' && typeof globalThis.atob === 'function') {
      decoded = globalThis.atob(base64);
    } else if (typeof globalThis !== 'undefined' && globalThis.Buffer) {
      decoded = globalThis.Buffer.from(base64, 'base64').toString('binary');
    }
    return JSON.parse(decoded);
  } catch (error) {
    return null;
  }
};

const syncAxiosAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export function AuthProvider({ children }) {
  const [state, setState] = useState({ user: null, token: null, loading: true });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setState((prev) => ({ ...prev, loading: false }));
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      const { token, user } = parsed;
      const payload = decodeJwtPayload(token);
      const expiresAt = payload?.exp ? payload.exp * 1000 : null;
      const isExpired = expiresAt ? Date.now() >= expiresAt : false;

      if (token && !isExpired) {
        const sessionUser = user ?? {
          username: payload?.sub || null,
          role: payload?.role || payload?.roles || null
        };
        syncAxiosAuthHeader(token);
        setState({ user: sessionUser, token, loading: false });
      } else {
        localStorage.removeItem(STORAGE_KEY);
        setState({ user: null, token: null, loading: false });
      }
    } catch (error) {
      localStorage.removeItem(STORAGE_KEY);
      setState({ user: null, token: null, loading: false });
    }
  }, []);

  const persistSession = useCallback((token, user) => {
    syncAxiosAuthHeader(token);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user }));
    setState({ user, token, loading: false });
  }, []);

  const login = useCallback(async ({ username, password }) => {
    const { data } = await AuthService.login({ username, password });
    const sessionUser = { username: data.username, role: data.role };
    persistSession(data.token, sessionUser);
    return sessionUser;
  }, [persistSession]);

  const register = useCallback(async ({ username, password, role }) => {
    const { data } = await AuthService.register({ username, password, role });
    const sessionUser = { username: data.username, role: data.role };
    persistSession(data.token, sessionUser);
    return sessionUser;
  }, [persistSession]);

  const logout = useCallback(() => {
    syncAxiosAuthHeader(null);
    localStorage.removeItem(STORAGE_KEY);
    setState({ user: null, token: null, loading: false });
  }, []);

  const role = state.user?.role ?? null;
  const isAuthenticated = Boolean(state.token);
  const isAdmin = role === 'ROLE_ADMIN';
  const isUser = role === 'ROLE_USER';

  const hasRole = useCallback((requiredRole) => role === requiredRole, [role]);
  const hasAnyRole = useCallback(
    (roles = []) => roles.some((requiredRole) => requiredRole === role),
    [role]
  );

  const permissions = useMemo(() => ({
    canViewCatalog: isAuthenticated,
    canCheckout: isAuthenticated,
    canAccessAdmin: isAdmin,
    canManageCatalog: isAdmin
  }), [isAuthenticated, isAdmin]);

  const value = useMemo(() => ({
    user: state.user,
    token: state.token,
    role,
    loading: state.loading,
    isAuthenticated,
    isAdmin,
    isUser,
    permissions,
    hasRole,
    hasAnyRole,
    login,
    register,
    logout
  }), [state.user, state.token, role, state.loading, isAuthenticated, isAdmin, isUser, permissions, hasRole, hasAnyRole, login, register, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
