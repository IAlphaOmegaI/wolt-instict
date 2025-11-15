import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DeliveryManIcon,
  LoaderIcon,
  ShoppingCartIcon,
  ShuffleIcon,
} from "@zenncore/icons";
import { Button } from "@zenncore/mobile/components/button";
import { Image } from "@zenncore/mobile/components/image";
import { Input } from "@zenncore/mobile/components/input";
import { Skeleton } from "@zenncore/mobile/components/skeleton";
import { cn } from "@zenncore/utils";
import { Link, useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSuggestion } from "@/context/suggestion";

export default () => {
  const router = useRouter();
  const { suggestion, isPending, shuffle, isShuffling } = useSuggestion();
  return (
    <SafeAreaView className="flex flex-1 flex-col gap-4 px-4 text-foreground-rich">
      <Image
        source={require("@/assets/images/banner.png")}
        className="-top-1/2 absolute h-[64rem] w-screen"
      />
      <View className="flex-row items-center justify-between py-3">
        <Pressable onPress={router.back}>
          <ChevronLeftIcon className="size-10 fill-foreground" />
        </Pressable>
        <Text className="text-2xl text-foreground">
          Wolf Instict suggestion
        </Text>
        <View className="w-10" />
      </View>
      {!isPending && suggestion ? (
        <>
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
            <View className="flex flex-row items-center gap-2">
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
              <Text className="text-foreground text-lg">Shuffle</Text>
            </View>
          </View>
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
                <View className="flex h-[110px] flex-1 flex-row items-center gap-4 border-white/40 border-b">
                  <View className="h-full flex-1 pb-2">
                    <Text
                      className="font-semibold text-foreground text-xl"
                      numberOfLines={2}
                    >
                      {item.description}
                    </Text>
                    <Text
                      className="text-foreground opacity-60"
                      numberOfLines={1}
                    >
                      {item.description}
                    </Text>
                    <Text className="mt-auto font-bold text-3xl text-[#FFCB77]">
                      €{item.price}
                    </Text>
                  </View>
                  <Input
                    className="flex h-10 w-20 items-center justify-center rounded-lg border border-white/40 py-0 text-center font-semibold text-primary text-xl leading-[1.5rem]"
                    defaultValue="1"
                  />
                </View>
              </View>
            ))}
          </ScrollView>
          <View
            className="absolute inset-x-0 bottom-0 h-48 flex-1"
            style={{
              experimental_backgroundImage:
                "linear-gradient(180deg, rgba(26, 67, 81, 0) 0%, rgba(26, 67, 81, 0.7) 100%)",
            }}
          />
          <Link href={"/cart"} asChild>
            <Button className="absolute inset-x-4 bottom-4 w-full items-center gap-2 rounded-2xl">
              <ShoppingCartIcon className="size-6 fill-foreground" />
              <View className="flex-row items-center gap-1">
                <Text className="text-foreground text-lg">Checkout</Text>
                <Text className="font-semibold text-foreground text-lg">
                  €
                  {suggestion.items
                    .reduce((sum, { price }) => sum + price, 0)
                    .toFixed(2)}
                </Text>
              </View>
            </Button>
          </Link>
        </>
      ) : (
        <Skeleton className={"w-full flex-1 rounded-3xl"} />
      )}
    </SafeAreaView>
  );
};
