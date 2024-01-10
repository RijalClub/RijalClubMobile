import Stripe from "https://esm.sh/stripe@14.11.0?target=deno&deno-std=0.132.0&no-check";

export const stripe = Stripe(Deno.env.get("STRIPE_SECRET_KEY") ?? "", {
  httpClient: Stripe.createFetchHttpClient(),
  apiVersion: "2023-10-16",
});
