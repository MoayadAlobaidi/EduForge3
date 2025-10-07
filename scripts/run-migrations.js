const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigrations() {
  try {
    console.log('Running migrations...');
    
    // Read and run the first migration
    const migration1 = fs.readFileSync(
      path.join(__dirname, '../supabase/migrations/20250930140930_silent_salad.sql'),
      'utf8'
    );
    
    console.log('Running schema migration...');
    const { error: error1 } = await supabase.rpc('exec_sql', { sql: migration1 });
    if (error1) {
      console.error('Error running schema migration:', error1);
    } else {
      console.log('Schema migration completed successfully');
    }
    
    // Read and run the second migration
    const migration2 = fs.readFileSync(
      path.join(__dirname, '../supabase/migrations/20250930140948_calm_grass.sql'),
      'utf8'
    );
    
    console.log('Running data seeding migration...');
    const { error: error2 } = await supabase.rpc('exec_sql', { sql: migration2 });
    if (error2) {
      console.error('Error running data migration:', error2);
    } else {
      console.log('Data migration completed successfully');
    }
    
    console.log('All migrations completed!');
    
  } catch (error) {
    console.error('Migration error:', error);
  }
}

runMigrations();