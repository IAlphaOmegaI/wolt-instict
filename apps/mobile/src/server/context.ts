import { generateText } from "ai";
import z, { toJSONSchema } from "zod";
import * as System from "./system";
import * as DateTime from "./date";
import * as Weather from "./weather";
import * as Order from "./order";
import * as Model from "./model";

/**
 * Extract JSON from the response (might be wrapped in markdown)
 */
export const clean = (json: string) => {
  return JSON.parse(
    json
      .trim()
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/, "")
      .replace(/\s*```$/, "")
  );
};

/**
 * Analyze user context to inform food recommendations
 */
export const analyze = async (
  vector: string,
  events = ""
): Promise<z.infer<typeof $Context>> => {
  const model = Model.get();

  const system = System.getPrompt();

  const prompt = `
      ${system}
      ## Current User Context Vector
      ${vector}
      ## Relevant Events
      ${events}
      
      Analyze this context and provide a structured analysis of the user's situation, key factors, and dietary needs. Consider any relevant events when determining the situation and meal type.
      
      ## REQUIRED JSON SCHEMA (You MUST follow this exact structure):
      ${toJSONSchema($Context)}
      
      IMPORTANT: 
      - mealType must be exactly one of: "breakfast", "lunch", "dinner", "snack"
      - keyFactors must be an array of strings (at least one)
      - situation must be a non-empty string
      - Return ONLY valid JSON that matches the schema above
    `;

  const { text } = await generateText({
    model: model("gemini-2.5-flash"),
    prompt,
    temperature: 0.1,
    maxTokens: 2000,
  });

  const parsed = clean(text);

  return $Context.parse(parsed);
};

export const $Context = z.object({
  situation: z
    .string()
    .describe(
      "Current situation summary (e.g., 'post-workout lunch', 'group dinner', 'weekend breakfast')"
    ),
  keyFactors: z
    .array(z.string())
    .describe("Key contextual factors influencing the recommendation"),
  meal: z
    .enum(["breakfast", "lunch", "dinner", "snack"])
    .describe("Recommended meal type based on context"),
  dietaryNeeds: z
    .array(z.string())
    .optional()
    .describe(
      "Dietary considerations (e.g., 'high-protein', 'light', 'comfort-food')"
    ),
  groupContext: z
    .object({
      isGroupOrder: z.boolean(),
      participantCount: z.number().optional(),
      groupPreferences: z.array(z.string()).optional(),
    })
    .optional()
    .describe("Group order context if applicable"),
});

export const buildUserVector = async (id: string) => {
  const datetime = DateTime.getContext();
  const weather = await Weather.getData();
  const orders = Order.getPastOrders(id);

  const context = [
    `user id: ${id}`,
    `day of the week: ${datetime.day}`,
    `time of day: ${datetime.time}`,
    `season: ${datetime.season}`,
    `temperature: ${weather.temperature}`,
    `rain: ${weather.rain ? 1 : 0}`,
    `past buys: ${orders}`,
  ];

  return context.join(", ");
};
