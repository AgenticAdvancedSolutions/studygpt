const { createClient } = require('@supabase/supabase-js');
const WebSocket = require('ws');

let supabase;

function getSupabase() {
  if (supabase) return supabase;

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error('Supabase server environment variables are not configured.');
  }

  supabase = createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    realtime: {
      transport: WebSocket,
    },
  });

  return supabase;
}

async function saveQuiz(spec) {
  const { data, error } = await getSupabase()
    .from('quizzes')
    .insert({ spec })
    .select('id')
    .single();

  if (error) throw error;
  return data.id;
}

async function getQuiz(id) {
  const { data, error } = await getSupabase()
    .from('quizzes')
    .select('spec')
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data ? data.spec : null;
}

module.exports = { saveQuiz, getQuiz };
