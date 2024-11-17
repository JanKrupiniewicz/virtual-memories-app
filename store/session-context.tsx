"use client";

import { Session } from "@/db/schema/session";
import { getCurrentSession } from "@/lib/auth/auth";
import { createContext, useEffect, useState } from "react";

interface SessionContextType {
  session: any;
  revalidateSession: () => Promise<void>;
  setSession: (session: Session | null) => void;
}

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined
);

export function SessionContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);

  async function revalidateSession() {
    const response = await fetch("/api/auth/session");

    if (response.status === 401) {
      setSession(null);
      return;
    }

    const data = await response.json();
    setSession(data.session);
  }

  useEffect(() => {
    revalidateSession();
  }, []);

  return (
    <SessionContext.Provider value={{ session, revalidateSession, setSession }}>
      {children}
    </SessionContext.Provider>
  );
}
