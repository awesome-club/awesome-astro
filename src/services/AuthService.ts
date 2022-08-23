import { supabase } from "./SupaService";

export interface SessionUser {
  id: string;
  email: string;
}

export function isAuthenticated() {
  const session = supabase.auth.session();
  return !!session && !!session.user;
}

export function getSessionUser(): SessionUser | null {
  if (!isAuthenticated()) return null;

  const { user } = supabase.auth.session()!;
  return {
    id: user?.id ?? "",
    email: user?.email ?? "",
  };
}

export function login(email: string) {
  return supabase.auth.signIn({ email });
}
