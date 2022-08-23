import { supabase } from "./SupaService";

const ProfileTable = "profile";

export interface Profile {
  id: number;
  author_id: string;
  link: string;
  name: string;
  description: string;
  preview: string;
}

export function upsertProfile(data: Partial<Profile>) {
  return supabase
    .from(ProfileTable)
    .upsert(data);
}

export function getProfileByLink(link: string) {
  return supabase
    .from(ProfileTable)
    .select()
    .filter("link", "eq", link);
}

export function getProfileByAuthor(id: string) {
  return supabase
    .from(ProfileTable)
    .select()
    .filter("author_id", "eq", id);
}
