import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageData } = await req.json();
    
    if (!imageData) {
      return new Response(
        JSON.stringify({ error: "No image data provided" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log("Calling AI model for plant disease detection...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are an expert agricultural AI system specialized in plant disease detection. 
            
Your task is to:
1. First validate if the image shows a plant or plant leaf
2. If it's not a plant/leaf image, respond with: {"isPlantImage": false, "error": "Please upload an image of a plant or leaf"}
3. If it is a plant/leaf, detect any visible diseases and provide detailed information

When you detect a disease, respond in this exact JSON format:
{
  "isPlantImage": true,
  "diseaseDetected": true,
  "diseaseName": "Disease Name",
  "confidence": 95,
  "causes": ["cause 1", "cause 2"],
  "symptoms": ["symptom 1", "symptom 2"],
  "treatment": {
    "description": "Treatment description",
    "pesticides": ["pesticide 1", "pesticide 2"],
    "organicAlternatives": ["organic option 1", "organic option 2"]
  }
}

If the plant appears healthy, respond with:
{
  "isPlantImage": true,
  "diseaseDetected": false,
  "message": "Plant appears healthy with no visible diseases"
}

Be accurate and provide actionable information for farmers.`
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Please analyze this plant image for diseases."
              },
              {
                type: "image_url",
                image_url: {
                  url: imageData
                }
              }
            ]
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service credits exhausted. Please contact support." }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: "Failed to analyze image" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiResponse = await response.json();
    console.log("AI Response received");
    
    const aiMessage = aiResponse.choices?.[0]?.message?.content;
    
    if (!aiMessage) {
      console.error("No content in AI response");
      return new Response(
        JSON.stringify({ error: "Invalid response from AI service" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse the JSON response from the AI
    let result;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = aiMessage.match(/```json\n([\s\S]*?)\n```/) || aiMessage.match(/```\n([\s\S]*?)\n```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : aiMessage;
      result = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", parseError);
      console.error("AI message:", aiMessage);
      return new Response(
        JSON.stringify({ error: "Failed to parse disease detection results" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error in detect-plant-disease:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
