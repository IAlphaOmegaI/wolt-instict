import { Stack } from "expo-router";
import "expo-dev-client";
import "../globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { View } from "react-native";
import { NavigationBar } from "@/components/navigation-bar";
import { SuggestionProvider } from "@/context/suggestion";

const queryClient = new QueryClient();

export default () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SuggestionProvider>
        <View className="flex-1 bg-background">
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: "#141414",
              },
            }}
          />
          <NavigationBar />
        </View>
      </SuggestionProvider>
    </QueryClientProvider>
  );
};
