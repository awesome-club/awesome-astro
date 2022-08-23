import { supabase } from "./SupaService";

const BucketName = "bio";

export function uploadFile(name: string, file: File) {
  return supabase
    .storage
    .from(BucketName)
    .upload(name, file, {
      cacheControl: "3600",
    });
}

export function getPublicUrl(preview: string) {
  return supabase.storage
    .from(BucketName)
    .getPublicUrl(preview);
}
