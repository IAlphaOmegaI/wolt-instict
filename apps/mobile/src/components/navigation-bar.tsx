import {
  BagSearchIcon,
  BuildingIcon,
  StoreIcon,
  UserIcon,
  UtencilesIcon,
} from "@zenncore/icons";
import { cn } from "@zenncore/utils";
import { useSegments } from "expo-router";
import { Pressable, Text, View } from "react-native";

const routes = [
  {
    name: "Discovery",
    icon: BuildingIcon,
  },
  {
    name: "Restaurants",
    icon: UtencilesIcon,
  },
  {
    name: "Stores",
    icon: StoreIcon,
  },
  {
    name: "Search",
    icon: BagSearchIcon,
  },
  {
    name: "Profile",
    icon: UserIcon,
  },
];
export const NavigationBar = () => {
  const [segment] = useSegments();
  return (
    <View className="bg-background-dimmed pt-6 pb-safe">
      <View className="flex-row items-center justify-around">
        {routes.map((route) => (
          <Pressable
            key={route.name}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-2",
              segment === route.name && "text-primary"
            )}
          >
            <route.icon
              className={cn(
                "size-12 fill-foreground-dimmed",
                segment === route.name && "text-primary"
              )}
            />
            <Text
              className={cn(
                "mt-1 text-foreground-dimmed text-sm",
                segment === route.name && "text-primary"
              )}
            >
              {route.name}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};
