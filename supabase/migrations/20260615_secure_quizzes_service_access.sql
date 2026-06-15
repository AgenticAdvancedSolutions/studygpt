alter table public.quizzes enable row level security;

revoke all privileges on table public.quizzes from anon, authenticated;
grant select, insert on table public.quizzes to service_role;
