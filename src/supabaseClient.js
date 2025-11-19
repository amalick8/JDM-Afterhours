import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wcgfujjrnjffwgguergr.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjZ2Z1ampybmpmZndnZ3VlcmdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1MzI5NjQsImV4cCI6MjA3OTEwODk2NH0.b0LV7Vw51i1xX7s08-vVuyPcR4YfIR9d8Wl0N4CPGLU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
