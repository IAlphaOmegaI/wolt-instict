import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject, generateText } from "ai";
import { z } from "zod";
import type {
  MealRecommendationParams,
  AISuggestion,
} from "@/types/meal-recommendation";

const SYSTEM_PROMPT = `You are "Wolt Instinct," a hyper-intelligent, proactive AI assistant integrated into the Wolt app.

## Core Mission
Your mission is to understand each user's life patterns, routines, and immediate context to predict their needs *before they do*. Your goal is to reduce the cognitive load of ordering to a single tap by proactively sending highly relevant, timely, and personalized suggestions. Success is a user feeling that Wolt "just gets them."

## Guiding Principles
1. **Be Proactive, Not Annoying:** Only generate a suggestion when confidence is high (e.g., >85%). A user's patterns, calendar, and location must align.
2. **Context is Everything:** A suggestion's relevance is determined by the synthesis of user history and real-time signals. A rainy Tuesday at the office after a gym session is completely different from a sunny Saturday at home.
3. **Explain the "Why":** Your suggestions must always include a brief, human-readable justification. This builds trust and makes the prediction feel like magic, not a coincidence. (e.g., "...based on your Tuesday usual," "...to refuel after your run," "...for your team lunch.")
4. **Handle Social Nuance:** For group events, your goal is to be a helpful coordinator. Find the common ground between participants' tastes and simplify the logistics of ordering together.
5. **Learn Continuously:** Every accepted, shuffled, or dismissed suggestion is a crucial data point for your next prediction.

## Reasoning Process
When prompted with a user's current context vector, you must follow this thought process:

1. **Analyze Context:** What is the user's immediate situation? Check timeOfDay, atWork/atHome, calendarEvent, healthActivity, and weather. This sets the scene.
2. **Recall History:** Given this context, what has this user (and similar users) done in the past? Analyze pastBuys, pastRecency, avgGap, and isRecurring.
3. **Synthesize & Hypothesize:** Formulate the single best hypothesis. This is your primary suggestion. If it's a food item, select a specific dish from a specific restaurant. If it's groceries, create a small, logical basket.
4. **Consider Alternatives:** Prepare a strong secondary option in case the user wants to "shuffle." The alternative should be logically different but still relevant to the context (e.g., a salad instead of sushi for a healthy lunch).
5. **Craft the Message:** Compose the notification copy and the UI card text. It must be concise, personalized, and actionable.`;

export async function getSuggestions(
  params: MealRecommendationParams,
): Promise<AISuggestion> {
  // Validate required fields
  if (!params.userId || !params.dayOfWeek || !params.timeOfDay) {
    throw new Error("Missing required fields: userId, dayOfWeek, timeOfDay");
  }

  // Build context vector string
  const contextVector = buildContextVector(params);

  const prompt = `${SYSTEM_PROMPT}

## Current User Context Vector
${contextVector}

## Output Requirements
You MUST respond with ONLY a complete, valid JSON object. No markdown, no code blocks, no explanations.

EXACT JSON FORMAT REQUIRED (copy this structure exactly):
{
  "background": "#FF6B6B",
  "group": {
    "friends": [
      {
        "name": "Alex",
        "avatar": "https://example.com/avatar1.jpg"
      },
      {
        "name": "Sam",
        "avatar": "https://example.com/avatar2.jpg"
      }
    ]
  },
  "title": "Perfect post-workout refuel",
  "items": [
    {
      "image": "https://example.com/chicken-bowl.jpg",
      "description": "Chicken & Quinoa Protein Bowl with fresh vegetables",
      "price": 16.20
    }
  ],
  "icon": "salad",
  "time": 1800
}

IMPORTANT NOTES:
- "background" must be a valid color string (hex code like "#FF6B6B" or color name like "blue")
- "group" is OPTIONAL - only include it if this is a group order (calendarEventParticipants > 1)
- "title" should be a short, personalized message explaining why this suggestion is relevant
- "items" is an array of food items, each with image URL, description, and price
- "icon" must be one of: "football&popcorn", "sushi", "burger", "salad", or "dessert"
- "time" is the estimated delivery time in seconds (typically 1200-3600 seconds, i.e., 20-60 minutes)

Your response must be valid JSON that can be parsed by JSON.parse(). Every opening brace { must have a closing brace }, every opening bracket [ must have a closing bracket ].

Now analyze the context vector and return ONLY the JSON object following this exact structure.`;

  // Define Zod schema for structured output
  const friendSchema = z.object({
    name: z.string().describe("Friend's name"),
    avatar: z.string().url().describe("URL to friend's avatar image"),
  });

  const groupSchema = z.object({
    friends: z
      .array(friendSchema)
      .min(1)
      .describe("Array of friends participating in the group order"),
  });

  const itemSchema = z.object({
    image: z.string().url().describe("URL to the food item image"),
    description: z.string().describe("Description of the food item, e.g., 'Chicken & Quinoa Protein Bowl with fresh vegetables'"),
    price: z.number().positive().describe("Price of the item in local currency, e.g., 16.20"),
  });

  const responseSchema = z.object({
    background: z
      .string()
      .describe("Background color as hex code (e.g., '#FF6B6B') or color name (e.g., 'blue')"),
    group: groupSchema
      .optional()
      .describe("Optional group information - only include if this is a group order (calendarEventParticipants > 1)"),
    title: z
      .string()
      .describe("Short, personalized title explaining why this suggestion is relevant, e.g., 'Perfect post-workout refuel' or 'Based on your Tuesday usual'"),
    items: z
      .array(itemSchema)
      .min(1)
      .describe("Array of food items to order, each with image URL, description, and price"),
    icon: z
      .enum(["football&popcorn", "sushi", "burger", "salad", "dessert"])
      .describe("Icon type matching the food category: 'football&popcorn' for snacks/events, 'sushi' for Japanese, 'burger' for fast food, 'salad' for healthy options, 'dessert' for sweets"),
    time: z
      .number()
      .int()
      .positive()
      .describe("Estimated delivery time in seconds (typically 1200-3600, i.e., 20-60 minutes)"),
  });

  try {
    const googleAI = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    try {
      const { object } = await generateObject({
        model: googleAI("gemini-2.5-flash") as any,
        schema: responseSchema,
        prompt,
        temperature: 0.1,
        maxTokens: 4000,
      });

      // Validate the response
      const validated = object as AISuggestion;
      if (!validated.items || validated.items.length === 0) {
        throw new Error("Generated object has no items");
      }

      return validated;
    } catch (generateObjectError) {
      // Fallback: Use generateText and parse manually if generateObject fails
      console.warn("generateObject failed, falling back to generateText:", generateObjectError);
      
      const { text } = await generateText({
        model: googleAI("gemini-2.5-flash"),
        prompt: `${prompt}\n\nIMPORTANT: Respond with ONLY valid JSON matching the schema. No markdown, no code blocks, no explanation.`,
        temperature: 0.1,
        maxTokens: 4000,
      });

      // Parse the JSON response
      let parsedResponse: unknown;
      try {
        // Try to extract JSON from markdown code blocks if present
        let cleanedText = text.trim();
        cleanedText = cleanedText.replace(/^```json\s*/i, "");
        cleanedText = cleanedText.replace(/^```\s*/i, "");
        cleanedText = cleanedText.replace(/\s*```$/i, "");
        cleanedText = cleanedText.trim();
        
        // Try to find JSON object
        const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedResponse = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error("No JSON found in response");
        }
      } catch (parseError) {
        throw new Error(`Failed to parse JSON response: ${parseError instanceof Error ? parseError.message : "Unknown error"}`);
      }

      // Validate with Zod schema
      const validated = responseSchema.parse(parsedResponse) as AISuggestion;
      if (!validated.items || validated.items.length === 0) {
        throw new Error("Generated object has no items");
      }
      return validated;
    }
  } catch (error) {
    console.error("Error generating meal recommendation:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to generate meal recommendation",
    );
  }
}

function buildContextVector(params: MealRecommendationParams): string {
  const context: string[] = [];

  const fields: Array<[keyof MealRecommendationParams, unknown, boolean?]> = [
    ["userId", params.userId],
    ["dayOfWeek", params.dayOfWeek],
    ["timeOfDay", params.timeOfDay],
    ["atWork", params.atWork, true],
    ["atHome", params.atHome, true],
    ["wasTraining", params.wasTraining, true],
    ["temperature", params.temperature],
    ["rain", params.rain, true],
    ["season", params.season],
    ["paydayDistance", params.paydayDistance],
    ["holiday", params.holiday, true],
    ["itemId", params.itemId],
    ["price", params.price],
    ["category", params.category],
    ["brand", params.brand],
    ["pastBuys", params.pastBuys],
    ["pastRecency", params.pastRecency],
    ["avgGap", params.avgGap],
    ["avgQuantity", params.avgQuantity],
    ["isRecurring", params.isRecurring, true],
    ["itemPopularity", params.itemPopularity],
    ["healthActivityType", params.healthActivityType],
    ["healthActivityDuration", params.healthActivityDuration],
    ["healthGoal", params.healthGoal],
    ["calendarEventType", params.calendarEventType],
    ["calendarEventParticipants", params.calendarEventParticipants],
  ];

  for (const [key, value, isBoolean] of fields) {
    if (value === undefined || value === null) continue;

    if (isBoolean) {
      context.push(`${key}: ${value ? 1 : 0}`);
    } else {
      context.push(`${key}: ${value}`);
    }
  }

  return context.join(", ");
}
