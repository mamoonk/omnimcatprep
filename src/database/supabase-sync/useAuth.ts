import { useCallback, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { getSupabaseClient, isSupabaseConfigured } from "./client";
import { startReplication, stopReplication } from "./replication";
import { getDatabase } from "../index";

export function useSupabaseAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(isSupabaseConfigured());
  const configured = isSupabaseConfigured();

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      setLoading(false);
      if (s) {
        void getDatabase().then((db) => startReplication(db));
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s) {
        void getDatabase().then((db) => startReplication(db));
      } else {
        void stopReplication();
      }
    });

    const onOnline = () => {
      void getDatabase().then(async (db) => startReplication(db));
    };
    window.addEventListener("online", onOnline);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("online", onOnline);
      void stopReplication();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const supabase = getSupabaseClient();
    if (!supabase) throw new Error("Supabase not configured");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }, []);

  const signOut = useCallback(async () => {
    const supabase = getSupabaseClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    await stopReplication();
  }, []);

  return { session, user, loading, configured, signIn, signOut };
}
