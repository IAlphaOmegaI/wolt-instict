import { generateText } from "ai";
import { toJSONSchema, z } from "zod";
import * as Context from "./context";
import * as DateTime from "./date";
import * as Event from "./event";
import * as Item from "./item";
import * as User from "./users";
import * as Prompt from "./prompt";
import * as System from "./system";
import * as Model from "./model";

const $Response = z.object({
  background: z
    .string()
    .describe(
      "Background color as hex code (e.g., '#FF6B6B') or color name (e.g., 'blue')"
    ),
  group: z
    .object({
      friendIds: z
        .array(
          z
            .string()
            .describe(
              "A friend userId from the provided friends list (e.g., 'friend_001', 'friend_002')"
            )
        )
        .min(1)
        .describe(
          "Array of friend userIds participating in the group order (select from provided friends list)"
        ),
    })
    .optional()
    .describe(
      "Optional group information - only include if this is a group order (calendarEventParticipants > 1)"
    ),
  title: z
    .string()
    .describe(
      "Short, personalized title explaining why this suggestion is relevant, e.g., 'Perfect post-workout refuel' or 'Based on your Tuesday usual'"
    ),
  itemIds: z
    .array(
      z
        .string()
        .describe(
          "A food itemId from the provided available food items list (e.g., 'item_001', 'item_002')"
        )
    )
    .min(2)
    .max(5)
    .describe(
      "Array of 2-5 food itemIds that form a cohesive order. Items should complement each other (e.g., main dish + sides + drink). You MUST select itemIds from the provided available food items list."
    ),
  icon: z
    .enum(["football_popcorn", "cinema_gaming", "running", "coffee_work"])
    .describe(
      "Icon type matching the food category: 'football_popcorn' for snacks/events/game day, 'cinema_gaming' for entertainment/movie nights, 'running' for post-workout/healthy meals, 'coffee_work' for breakfast/coffee breaks"
    ),
});

/**
 * Get personalized food suggestions based on user context
 * Uses a two-phase approach: first analyze context, then generate suggestions
 *
 * @param id - User ID for personalization
 */
export const getUserSuggestions = async (id: string): Promise<Type> => {
  const datetime = DateTime.getContext();

  const events = await Event.queryRelevant(datetime.day, datetime.season);

  const vector = await Context.buildUserVector(id);

  const analysis = await Context.analyze(vector, events);

  const items = Item.promptify(Item.list());
  const friends = User.promptify(User.list());

  const system = System.getPrompt();

  const prompt = `
  ${system}
  ## Context Analysis
  - Situation: ${analysis.situation}
  - Meal Type: ${analysis.meal}
  - Key Factors: ${Prompt.build(analysis.keyFactors)}
  ${Prompt.build(analysis.dietaryNeeds, (needs) => `- Dietary Needs: ${needs}`)}
  ${Prompt.build(
    analysis.groupContext?.isGroupOrder,
    `- Group Order: ${analysis.groupContext?.participantCount} participants`
  )}
  ## Queried Events
  ${events}

  ## Available Food Items (SELECT itemIds FROM THIS LIST ONLY):
  ${items}

  ## Available Friends (SELECT friendIds FROM THIS LIST ONLY):
  ${friends}

  ## User Context Vector
  ${vector}

  Based on the context analysis above, generate a personalized food suggestion with 2-5 complementary items that form a cohesive order. 

  ## REQUIRED JSON SCHEMA (You MUST follow this exact structure):
  ${toJSONSchema($Response)}

  CRITICAL REQUIREMENTS:
  - You MUST return valid JSON that matches the schema above EXACTLY
  - You MUST select itemIds ONLY from the "Available Food Items" list above. Use the EXACT itemId strings (e.g., "item_001", "item_002")
  - itemIds must be an array of 2-5 strings, each matching an itemId from the available items list
  - Items should match the identified meal type (${analysis.meal})
  - Address the key factors: ${Prompt.build(analysis.keyFactors)}
  - Form a logical, complementary set (e.g., main dish + sides + drink)
  - Be appropriate for the situation: ${analysis.situation}
  ${Prompt.build(
    analysis.dietaryNeeds,
    (needs) =>
      `- IMPORTANT: Prioritize items with tags matching these dietary needs: ${needs}. Look for items tagged with "healthy", "high-protein", "protein", "gluten-free", "vegan", etc. that match the dietary requirements.`
  )}
  - Background must be a valid color (hex code like "#FF6B6B" or color name like "blue")
  - Icon must be exactly one of: "football_popcorn", "cinema_gaming", "running", "coffee_work"
  - For health/fitness scenarios, prefer the "running" icon
  - For breakfast/work break scenarios, prefer the "coffee_work" icon
  - For sports/game day events, prefer the "football_popcorn" icon
  - Title must be a short, personalized string explaining why this suggestion is relevant
  - Consider any relevant events happening today when selecting items (e.g., game day snacks, holiday treats)
  
  ${Prompt.build(
    analysis.groupContext?.isGroupOrder,
    `- If this is a group order, select friend userIds from the "Available Friends" list. Accommodate group preferences and provide variety for ${analysis.groupContext?.participantCount} people. Use the EXACT userId strings (e.g., "friend_001", "friend_002")`
  )}
  - Do NOT include a 'group' field if this is NOT a group order
 
  Return ONLY valid JSON, no markdown, no code blocks, just the JSON object.
  `;

  const model = Model.get();

  const { text } = await generateText({
    model: model("gemini-2.5-flash"),
    prompt,
    temperature: 0.1,
    maxTokens: 2000,
  });

  const parsed = Context.clean(text);
  const response = $Response.parse(parsed);

  const selected = Item.get(response.itemIds);
  const time =
    selected.reduce(
      (sum, { estimatedDeliveryTime }) => sum + estimatedDeliveryTime,
      0
    ) / selected.length;

  const result: Type = {
    background: response.background,
    title: response.title,
    items: selected,
    icon: response.icon,
    time: Math.round(time),
    group: response.group
      ? {
          friends: User.get(response.group.friendIds),
        }
      : undefined,
  };

  return result;
};

export type Type = {
  background: string; // color
  group?: {
    friends: {
      name: string;
      avatar: string;
    }[];
  };
  title: string;
  items: {
    image: string;
    description: string;
    price: number;
  }[];
  icon: "football_popcorn" | "cinema_gaming" | "running" | "coffee_work";
  time: number;
};
