import { createGoogleGenerativeAI } from "@ai-sdk/google";

export const get = () => {
  const model = createGoogleGenerativeAI({
    apiKey: process.env.EXPO_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY,
  });

  return model;
};
