import {
  BellIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  DeliveryManIcon,
  LoaderIcon,
  ShoppingCartIcon,
  ShuffleIcon,
  UserIcon,
} from "@zenncore/icons";
import { Button } from "@zenncore/mobile/components/button";
import { Image } from "@zenncore/mobile/components/image";
import { Skeleton } from "@zenncore/mobile/components/skeleton";
import { cn } from "@zenncore/utils";
import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSuggestion } from "@/context/suggestion";

const icons = {
  football_popcorn: require("@/assets/images/icons/football_popcorn.png"),
  cinema_gaming: require("@/assets/images/icons/cinema_gaming.png"),
  running: require("@/assets/images/icons/running.png"),
  coffee_work: require("@/assets/images/icons/coffee_work.png"),
};

export default () => {
  const { suggestion, isPending, shuffle, isShuffling } = useSuggestion();

  return (
    <SafeAreaView className="z-50 flex flex-1 flex-col gap-4 px-4 text-foreground-rich">
      <Image
        source={require("@/assets/images/banner.png")}
        className="-top-1/2 absolute h-[64rem] w-screen"
      />
      <View className="flex-row items-center justify-between py-3">
        <UserIcon className="size-10 fill-foreground" />
        <View className="flex-row items-center gap-1">
          <Text className="text-base text-foreground">
            Your Current Location
          </Text>
          <ChevronDownIcon className="size-4 fill-foreground" />
        </View>
        <BellIcon className="size-10 fill-foreground" />
      </View>
      {!isPending && suggestion ? (
        <View
          className="flex w-full flex-1 flex-col gap-2 rounded-3xl p-4"
          key={suggestion.title}
          style={{
            backgroundColor: `${suggestion.background}4D`,
            borderWidth: 1,
            borderColor: `${suggestion.background}80`,
          }}
        >
          <View className="w-full flex-row items-center justify-between">
            <Text
              className="font-semibold flex-1 text-2xl text-foreground"
              numberOfLines={2}
            >
              {suggestion.title}
            </Text>
            <View className="items-end">
              <Image source={icons[suggestion.icon]} className="h-20 w-20" />
            </View>
          </View>
          {suggestion.group && (
            <View className="mb-2 w-full flex-row items-center gap-2 rounded-3xl bg-white/10 p-4">
              <View className="flex flex-row items-center">
                {suggestion.group.friends.slice(0, 3).map((friend, index) => (
                  <Image
                    key={friend.name}
                    source={friend.avatar}
                    className={cn(
                      "-ml-2 size-8 rounded-full border-2 border-white/30",
                      index === 0 && "ml-0"
                    )}
                  />
                ))}
              </View>
              <Text className="text-foreground">
                See what your friends are ordering
              </Text>
              <ChevronRightIcon className="ml-auto fill-foreground" />
            </View>
          )}
          <View className="flex flex-row items-center justify-between px-4">
            <View className="flex flex-row items-center gap-2">
              <DeliveryManIcon className="size-6 fill-foreground" />
              <Text className="text-foreground text-lg">
                {((suggestion.time - 300) / 60).toFixed(0)} -{" "}
                {((suggestion.time + 300) / 60).toFixed(0)} Min
              </Text>
            </View>
            <Pressable
              className="flex flex-row items-center gap-2"
              onPress={() => shuffle()}
            >
              {isShuffling ? (
                <View className="size-6 animate-spin">
                  <LoaderIcon className="size-6 text-foreground" />
                </View>
              ) : (
                <ShuffleIcon className="size-6 fill-foreground" />
              )}
              <Text className="text-foreground text-lg">Shuffle</Text>
            </Pressable>
          </View>
          <View className="flex-1 overflow-hidden rounded-3xl bg-white/10 px-4">
            <ScrollView
              className="flex flex-1 gap-1"
              contentContainerClassName="grow py-4 gap-4"
            >
              {suggestion.items.map((item) => (
                <View className="flex-row gap-4" key={item.description}>
                  <Image
                    source={item.image}
                    className="size-28 rounded-xl"
                    contentFit="cover"
                  />
                  <View className="h-[110px] flex-1 border-white/40 border-b pb-2">
                    <Text
                      className="font-semibold text-foreground text-xl"
                      numberOfLines={1}
                    >
                      {item.description}
                    </Text>
                    <Text
                      className="text-foreground opacity-60"
                      numberOfLines={2}
                    >
                      {item.description}
                    </Text>
                    <Text className="mt-auto font-bold text-3xl text-[#FFCB77]">
                      €{item.price}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>

            <View
              className="pointer-events-none absolute inset-x-0 bottom-0 h-48 flex-1"
              style={{
                experimental_backgroundImage: `linear-gradient(180deg, ${suggestion.background}00 0%, ${suggestion.background}70 100%)`,
              }}
            />
            <Link href={"/cart"} asChild>
              <Button
                className="absolute inset-x-4 bottom-4 w-full items-center gap-2 rounded-2xl"
                style={{ backgroundColor: suggestion.background }}
              >
                <ShoppingCartIcon className="size-6 fill-foreground" />
                <View className="flex-row items-center gap-1">
                  <Text className="text-foreground text-lg">Add to Card</Text>
                  <Text className="font-semibold text-foreground text-lg">
                    €
                    {suggestion.items
                      .reduce((sum, { price }) => sum + price, 0)
                      .toFixed(2)}
                  </Text>
                </View>
              </Button>
            </Link>
          </View>
        </View>
      ) : (
        <Skeleton className={"w-full flex-1 rounded-3xl"} />
      )}
    </SafeAreaView>
  );
};
