import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { stripe } from "../_shared/stripe.ts";

console.log("Payment-sheet handler up and running!");

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
const supabaseAdmin = createClient(supabaseUrl, supabaseAnonKey);

Deno.serve(async (req) => {
  try {
    const { amount, currency } = await req.json();
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Authorization header is missing!");

    const jwt = authHeader.replace("Bearer ", "");
    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(jwt);
    if (userError) throw userError;
    if (!user) throw new Error("No user found for JWT!");

    const { data, error: customerError } = await supabaseAdmin
      .from("users")
      .select("stripe_customer_id")
      .eq("id", user.id);

    if (customerError) throw customerError;
    if (!data || data.length === 0)
      throw new Error("User not found in database!");

    let customer = data[0].stripe_customer_id;
    if (!customer) {
      const firstName = user?.user_metadata?.first_name ?? "";
      const lastName = user?.user_metadata?.last_name ?? "";
      const fullName = `${firstName} ${lastName}`.trim();

      const newCustomer = await stripe.customers.create({
        name: fullName,
        email: user.email,
        metadata: { uid: user.id },
      });
      customer = newCustomer.id;

      await supabaseAdmin
        .from("users")
        .update({ stripe_customer_id: newCustomer.id })
        .match({ id: user.id });
    }

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer },
      { apiVersion: "2023-10-16" },
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      customer,
      automatic_payment_methods: { enabled: true },
    });

    const res = {
      stripe_pk: Deno.env.get("STRIPE_PUBLISHABLE_KEY"),
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer,
    };
    return new Response(JSON.stringify(res), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
});
