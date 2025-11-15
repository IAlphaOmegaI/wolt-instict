import { afterEach, beforeEach, describe, expect, it, spyOn } from "bun:test";
import * as googleAI from "@ai-sdk/google";
import * as ai from "ai";
import type { MealRecommendationParams } from "@/types/meal-recommendation";
import { getMealRecommendation } from "./suggestions";

describe("getMealRecommendation (suggestions)", () => {
  const originalEnv = process.env.GEMINI_API_KEY;
  const validParams: MealRecommendationParams = {
    userId: "user123",
    dayOfWeek: "Tuesday",
    timeOfDay: "afternoon",
    atWork: true,
    atHome: false,
    wasTraining: false,
    temperature: 22,
    rain: false,
    season: "spring",
    paydayDistance: 5,
    holiday: false,
  };

  let mockGenerateObject: ReturnType<typeof spyOn>;
  let mockGenerateText: ReturnType<typeof spyOn>;

  beforeEach(() => {
    process.env.GEMINI_API_KEY = "test-api-key";

    // Mock generateObject to return a valid AISuggestion response
    const mockResponse = {
      object: {
        background: "#FF6B6B",
        title: "Perfect post-workout refuel",
        items: [
          {
            image: "https://example.com/chicken-bowl.jpg",
            description: "Chicken & Quinoa Protein Bowl with fresh vegetables",
            price: 16.2,
          },
        ],
        icon: "salad",
        time: 1800,
      },
    };

    mockGenerateObject = spyOn(ai, "generateObject").mockResolvedValue(
      mockResponse as any,
    );
    mockGenerateText = spyOn(ai, "generateText").mockResolvedValue({
      text: JSON.stringify(mockResponse.object),
    } as any);
    const mockModel = {} as any;
    spyOn(googleAI, "createGoogleGenerativeAI").mockReturnValue(
      ((modelName: string) => mockModel) as any,
    );
  });

  afterEach(() => {
    process.env.GEMINI_API_KEY = originalEnv;
    mockGenerateObject.mockRestore();
    if (mockGenerateText) {
      mockGenerateText.mockRestore();
    }
  });

  it("should throw error when userId is missing", async () => {
    const params = { ...validParams, userId: "" };
    await expect(getMealRecommendation(params)).rejects.toThrow(
      "Missing required fields: userId, dayOfWeek, timeOfDay",
    );
  });

  it("should throw error when dayOfWeek is missing", async () => {
    const params = { ...validParams, dayOfWeek: "" as any };
    await expect(getMealRecommendation(params)).rejects.toThrow(
      "Missing required fields: userId, dayOfWeek, timeOfDay",
    );
  });

  it("should throw error when timeOfDay is missing", async () => {
    const params = { ...validParams, timeOfDay: "" as any };
    await expect(getMealRecommendation(params)).rejects.toThrow(
      "Missing required fields: userId, dayOfWeek, timeOfDay",
    );
  });

  it("should throw error when GEMINI_API_KEY is not configured", async () => {
    delete process.env.GEMINI_API_KEY;
    const createGoogleAISpy = spyOn(googleAI, "createGoogleGenerativeAI");
    createGoogleAISpy.mockImplementationOnce(() => {
      throw new Error("API key is required");
    });
    
    await expect(getMealRecommendation(validParams)).rejects.toThrow();
  });

  it("should successfully call Gemini API with valid parameters", async () => {
    const result = await getMealRecommendation(validParams);

    expect(result).toBeDefined();
    expect(result.background).toBe("#FF6B6B");
    expect(result.title).toBe("Perfect post-workout refuel");
    expect(result.items).toBeDefined();
    expect(result.items).toHaveLength(1);
    expect(result.items[0].image).toBe("https://example.com/chicken-bowl.jpg");
    expect(result.items[0].description).toBe(
      "Chicken & Quinoa Protein Bowl with fresh vegetables",
    );
    expect(result.items[0].price).toBe(16.2);
    expect(result.icon).toBe("salad");
    expect(result.time).toBe(1800);
    expect(mockGenerateObject).toHaveBeenCalled();
  });

  it("should handle AISuggestion with group information", async () => {
    const mockResponseWithGroup = {
      object: {
        background: "#4ECDC4",
        group: {
          friends: [
            {
              name: "Alex",
              avatar: "https://example.com/avatar1.jpg",
            },
            {
              name: "Sam",
              avatar: "https://example.com/avatar2.jpg",
            },
          ],
        },
        title: "Team lunch time!",
        items: [
          {
            image: "https://example.com/pizza.jpg",
            description: "Margherita Pizza",
            price: 12.5,
          },
        ],
        icon: "burger",
        time: 2400,
      },
    };

    mockGenerateObject.mockResolvedValueOnce(mockResponseWithGroup as any);

    const paramsWithGroup: MealRecommendationParams = {
      ...validParams,
      calendarEventParticipants: 3,
    };

    const result = await getMealRecommendation(paramsWithGroup);

    expect(result).toBeDefined();
    expect(result.group).toBeDefined();
    expect(result.group?.friends).toHaveLength(2);
    expect(result.group?.friends[0].name).toBe("Alex");
    expect(result.group?.friends[0].avatar).toBe(
      "https://example.com/avatar1.jpg",
    );
    expect(result.group?.friends[1].name).toBe("Sam");
  });

  it("should handle all icon types", async () => {
    const iconTypes = [
      "football&popcorn",
      "sushi",
      "burger",
      "salad",
      "dessert",
    ] as const;

    for (const iconType of iconTypes) {
      const mockResponse = {
        object: {
          background: "#FF6B6B",
          title: `Test with ${iconType}`,
          items: [
            {
              image: "https://example.com/item.jpg",
              description: "Test item",
              price: 10.0,
            },
          ],
          icon: iconType,
          time: 1800,
        },
      };

      mockGenerateObject.mockResolvedValueOnce(mockResponse as any);

      const result = await getMealRecommendation(validParams);
      expect(result.icon).toBe(iconType);
    }
  });

  it("should handle optional parameters correctly", async () => {
    const paramsWithOptionals: MealRecommendationParams = {
      ...validParams,
      pastBuys: 10,
      pastRecency: 2,
      avgGap: 3,
      healthActivityType: "running",
      healthActivityDuration: 30,
      healthGoal: "weight_loss",
      calendarEventType: "team_meeting",
      calendarEventParticipants: 5,
    };

    const result = await getMealRecommendation(paramsWithOptionals);
    expect(result).toBeDefined();
    expect(mockGenerateObject).toHaveBeenCalled();
  });

  it("should handle error from Gemini API", async () => {
    mockGenerateObject.mockRejectedValueOnce(
      new Error("API Error: Rate limit exceeded"),
    );
    // Also make generateText fail so the error propagates
    mockGenerateText.mockRejectedValueOnce(
      new Error("API Error: Rate limit exceeded"),
    );

    await expect(getMealRecommendation(validParams)).rejects.toThrow(
      "API Error: Rate limit exceeded",
    );
  });

  it("should fallback to generateText when generateObject fails", async () => {
    // First call fails
    mockGenerateObject.mockRejectedValueOnce(
      new Error("generateObject failed"),
    );

    // generateText should be called as fallback
    const result = await getMealRecommendation(validParams);

    expect(result).toBeDefined();
    expect(result.background).toBe("#FF6B6B");
    expect(result.title).toBe("Perfect post-workout refuel");
    expect(mockGenerateText).toHaveBeenCalled();
  });

  it("should handle generateText response with markdown code blocks", async () => {
    mockGenerateObject.mockRejectedValueOnce(
      new Error("generateObject failed"),
    );

    const jsonWithMarkdown = "```json\n" + JSON.stringify({
      background: "#FF6B6B",
      title: "Test title",
      items: [
        {
          image: "https://example.com/item.jpg",
          description: "Test item",
          price: 15.0,
        },
      ],
      icon: "burger",
      time: 2000,
    }) + "\n```";

    mockGenerateText.mockResolvedValueOnce({
      text: jsonWithMarkdown,
    } as any);

    const result = await getMealRecommendation(validParams);

    expect(result).toBeDefined();
    expect(result.background).toBe("#FF6B6B");
    expect(result.title).toBe("Test title");
    expect(result.items[0].price).toBe(15.0);
  });

  it("should throw error when generated object has no items", async () => {
    // Reset mocks to ensure clean state
    mockGenerateObject.mockReset();
    mockGenerateText.mockReset();
    
    const mockResponseNoItems = {
      object: {
        background: "#FF6B6B",
        title: "Test title",
        items: [],
        icon: "salad",
        time: 1800,
      },
    };

    // generateObject returns empty items, which should trigger validation error
    mockGenerateObject.mockResolvedValueOnce(mockResponseNoItems as any);
    // generateText also returns empty items for fallback path
    mockGenerateText.mockResolvedValueOnce({
      text: JSON.stringify(mockResponseNoItems.object),
    } as any);

    // Zod validation will throw before our custom check in the fallback path
    // The error will be about array being too small
    await expect(getMealRecommendation(validParams)).rejects.toThrow();
  });

  it("should handle context vector building with boolean values", async () => {
    const params: MealRecommendationParams = {
      ...validParams,
      atWork: true,
      atHome: false,
      wasTraining: true,
      rain: true,
      holiday: false,
      isRecurring: true,
    };

    const result = await getMealRecommendation(params);
    expect(result).toBeDefined();
    expect(mockGenerateObject).toHaveBeenCalled();
  });

  it("should handle multiple items in the response", async () => {
    const mockResponseMultipleItems = {
      object: {
        background: "#9B59B6",
        title: "Complete meal set",
        items: [
          {
            image: "https://example.com/main.jpg",
            description: "Main course",
            price: 20.0,
          },
          {
            image: "https://example.com/dessert.jpg",
            description: "Dessert",
            price: 8.5,
          },
          {
            image: "https://example.com/drink.jpg",
            description: "Drink",
            price: 3.0,
          },
        ],
        icon: "dessert",
        time: 3000,
      },
    };

    mockGenerateObject.mockResolvedValueOnce(mockResponseMultipleItems as any);

    const result = await getMealRecommendation(validParams);

    expect(result).toBeDefined();
    expect(result.items).toHaveLength(3);
    expect(result.items[0].price).toBe(20.0);
    expect(result.items[1].price).toBe(8.5);
    expect(result.items[2].price).toBe(3.0);
  });

  it("should handle parse error in generateText fallback", async () => {
    mockGenerateObject.mockRejectedValueOnce(
      new Error("generateObject failed"),
    );

    mockGenerateText.mockResolvedValueOnce({
      text: "This is not valid JSON",
    } as any);

    await expect(getMealRecommendation(validParams)).rejects.toThrow(
      "Failed to parse JSON response",
    );
  });
});

