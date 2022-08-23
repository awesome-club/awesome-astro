import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://wlnuumtxxbrcxwbvlrwb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsbnV1bXR4eGJyY3h3YnZscndiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjA2NTYyNjMsImV4cCI6MTk3NjIzMjI2M30.t5aGiSJWYyL8z3O4XVCqXb60PCnAOftdpxLPgJM6-A0",
);
