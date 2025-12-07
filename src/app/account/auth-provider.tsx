"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useRef } from 'react';
import { Useree } from "./signup/page";

type AuthContextValue = {
  signedIn: boolean;
  user: Useree | undefined;
  setSignedIn: (v: boolean) => void;
  setUser: (user: Useree) => void;
};

const AuthContext = createContext<AuthContextValue | false>(false);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Initialize to `false` to prevent a flash of authenticated content.
  // The `useEffect` below will quickly update this to the correct state.
  // This is a safer default.
  const [signedIn, setSignedInState] = useState<boolean>(false);
  const [user, setUser] = useState<Useree>();
  console.log("AuthProvider render, signedIn:", signedIn);
  async function refresh() {
    try {
      const res = await fetch('/api/auth', { cache: 'no-store' });
      if (!res.ok) {
        setSignedInState(false);
        return;
      }
      const data = await res.json();
      setSignedInState(Boolean(data?.signedIn));
    } catch (e) {
      setSignedInState(false);
    }
  }

  const initialCheckDone = useRef(false);
  useEffect(() => {
    if (!initialCheckDone.current) {
      // initial check on mount
      initialCheckDone.current = true;
    }

  }, []);

  function setSignedIn(v: boolean) {
    setSignedInState(v);
  }
  console.log("AuthProvider signedIn:", signedIn);
  return (
    <AuthContext.Provider value={{ signedIn, setSignedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthProvider;
