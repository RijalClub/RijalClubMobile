import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");

const supabase = createClient(supabaseUrl, supabaseAnonKey);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
      },
    });
  }
  const { email } = await req.json();

  if (!email) {
    return new Response(JSON.stringify({ error: "Email is required" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { data, error } = await supabase
    .from("users")
    .select("email")
    .eq("email", email);

  if (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  if (data.length === 1) {
    return new Response(JSON.stringify({ userExists: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } else if (data.length === 0) {
    return new Response(JSON.stringify({ userExists: false }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } else {
    // If more than one row is found, return an error
    return new Response(
      JSON.stringify({ error: "Multiple users found with the same email" }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
