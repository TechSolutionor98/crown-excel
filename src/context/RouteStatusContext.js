'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const RouteStatusContext = createContext({
  inactiveRoutes: [],
  isRouteActive: () => true,
  refreshRouteStatus: () => {},
});

function normalizePath(p) {
  if (!p || typeof p !== 'string') return '';
  // Keep external URLs intact
  if (p.startsWith('http://') || p.startsWith('https://') || p.startsWith('mailto:') || p.startsWith('tel:')) {
    return p;
  }
  // Remove query and hash for route path matching
  const clean = p.split('?')[0].split('#')[0];
  return clean.replace(/\/+$/, '') || '/';
}

export function RouteStatusProvider({ children, initialInactiveRoutes = [] }) {
  const [inactiveRoutes, setInactiveRoutes] = useState(
    initialInactiveRoutes.map(normalizePath)
  );

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/cms/routes/status', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.inactiveRoutes)) {
          setInactiveRoutes(data.inactiveRoutes.map(normalizePath));
        }
      }
    } catch (err) {
      console.warn('Could not fetch route status:', err);
    }
  }, []);

  useEffect(() => {
    // Listen for custom event triggered when admin changes status
    const handleUpdate = () => fetchStatus();
    window.addEventListener('cms-route-status-updated', handleUpdate);

    return () => {
      window.removeEventListener('cms-route-status-updated', handleUpdate);
    };
  }, [fetchStatus]);

  const isRouteActive = useCallback((href) => {
    if (!href) return true;
    // External links and non-routes are always active
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) {
      return true;
    }
    const normalized = normalizePath(href);
    return !inactiveRoutes.includes(normalized);
  }, [inactiveRoutes]);

  return (
    <RouteStatusContext.Provider value={{ inactiveRoutes, isRouteActive, refreshRouteStatus: fetchStatus }}>
      {children}
    </RouteStatusContext.Provider>
  );
}

export function useRouteStatus() {
  return useContext(RouteStatusContext);
}
