/*
  SETUP ONCE:
  Create a Supabase project, then put your Project URL and anon/public key below.
  Never put a service_role key in this file.
*/
const SUPABASE_URL = "https://godapkgwbccuridrnrab.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_cjwEyjB5uN62xmn15MQODQ_kg7c3Kjt";
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);