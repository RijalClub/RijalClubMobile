// Ensure you follow the setup guide to integrate the Deno language server with your editor for autocomplete and other features.

// Instantiate the Supabase client
// You'll need to include the necessary Supabase libraries
// and your Supabase service key in a secure manner.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

Deno.serve(async (req) => {
  const { email } = await req.json();

  if (!email) {
    return new Response(
      JSON.stringify({ error: 'Email is required' }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const { data, error } = await supabase
    .from('profiles') // Replace with your table name
    .select('id')
    .eq('email', email);

  if (error) {
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  if (data.length === 1) {
    return new Response(
      JSON.stringify({ userExists: true }),
      { headers: { "Content-Type": "application/json" } },
    );
  } else if (data.length === 0) {
    return new Response(
      JSON.stringify({ userExists: false }),
      { headers: { "Content-Type": "application/json" } },
    );
  } else {
    // If more than one row is found, return an error
    return new Response(
      JSON.stringify({ error: 'Multiple users found with the same email' }),
      { status: 400, headers: { "Content-Type": "application/json" } },
      );
  }
});


// To invoke this function, you'll use a similar curl command as provided,
// but with the correct endpoint and passing an "email" field in the JSON data.

