import { Ai } from "./vendor/@cloudflare/ai.js";

export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*", // Replace with your actual origin
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", // Adjust methods as needed
      "Access-Control-Allow-Headers": "Content-Type, Authorization", // Adjust headers as needed
    };
    if (request.method === "OPTIONS") {
      // Set CORS headers here
      return new Response("ok", { headers: corsHeaders });
    }
    if (request.body !== null) {
      let result = await request.json();

      if (result) {
        const ai = new Ai(env.AI);

        const inputs = {
          text: result.review,
        };

        const response = await ai.run(
          "@cf/huggingface/distilbert-sst-2-int8",
          inputs
        );

        return new Response(JSON.stringify(response), { headers: corsHeaders });
        //  return Response.json({ response });
      }
    } else {
      return Response.json({ error: "error" });
    }
  },
};
