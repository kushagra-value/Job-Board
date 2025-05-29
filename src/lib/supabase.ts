import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nmxgivyyrilsnibobrbu.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5teGdpdnl5cmlsc25pYm9icmJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2MDM2NTQsImV4cCI6MjA2MjE3OTY1NH0.IGQXM9Ym1_0twcN7im5iutSfYTbNE_TzqnvhOgoo_l0";
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
