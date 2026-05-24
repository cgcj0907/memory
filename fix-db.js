import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function check() {
  const { data: users } = await supabase.auth.admin.listUsers();
  
  if (users.users.length > 0) {
    const user = users.users[0];
    const { error } = await supabase.from('users_profile').upsert({
      id: user.id,
      email: user.email,
      nickname: '测试用户'
    });
    
    if (error) console.error('Error inserting profile:', error);
    else console.log('Profile created successfully for user:', user.email);
  }
}
check();
