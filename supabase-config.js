// ============================================================
//  SUPABASE CONFIG — À remplir avec tes clés du projet
//  1. Va sur https://supabase.com → New Project
//  2. Settings → API → copie les 2 valeurs ci-dessous
// ============================================================
const SUPABASE_URL = 'https://csyvfegvqpmvddbvaylb.supabase.co';         // ex: https://xxxx.supabase.co
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzeXZmZWd2cXBtdmRkYnZheWxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxNTAzMTEsImV4cCI6MjA4NzcyNjMxMX0.yEBzwb20fh0l1Hgmn_n6rriNrxHTYmikhEfXhmObSiE'; // ex: eyJhbGci...

// Pour Google OAuth :
// Supabase Dashboard → Authentication → Providers → Google → activer
// Copie l'URL de callback Supabase dans Google Cloud Console

// Pour Apple OAuth :
// Supabase Dashboard → Authentication → Providers → Apple → activer
// Nécessite un Apple Developer Account ($99/an)

window.__SUPABASE_URL = SUPABASE_URL;
window.__SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;
