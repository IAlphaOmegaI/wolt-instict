export const getContext = () => {
  const now = new Date();

  const day = DAYS[now.getDay()] as Day;

  const hour = now.getHours();

  const time = (() => {
    switch (true) {
      case hour >= 5 && hour < 12:
        return TimeOfDay.Morning;
      case hour >= 12 && hour < 17:
        return TimeOfDay.Afternoon;
      case hour >= 17 && hour < 22:
        return TimeOfDay.Evening;
      default:
        return TimeOfDay.Night;
    }
  })();

  const month = now.getMonth();

  const season = (() => {
    switch (true) {
      case month >= 2 && month <= 4:
        return Seasons.Spring;
      case month >= 5 && month <= 7:
        return Seasons.Summer;
      case month >= 8 && month <= 10:
        return Seasons.Autumn;
      default:
        return Seasons.Winter;
    }
  })();

  return { day, time, season };
};

export const Day = {
  Monday: "Monday",
  Tuesday: "Tuesday",
  Wednesday: "Wednesday",
  Thursday: "Thursday",
  Friday: "Friday",
  Saturday: "Saturday",
  Sunday: "Sunday",
} as const;

export type Day = (typeof Day)[keyof typeof Day];

export const DAYS = Object.values(Day) as Day[];

export const TimeOfDay = {
  Morning: "Morning",
  Afternoon: "Afternoon",
  Evening: "Evening",
  Night: "Night",
} as const;

export type TimeOfDay = (typeof TimeOfDay)[keyof typeof TimeOfDay];

export const TIMES_OF_DAY = Object.values(TimeOfDay) as TimeOfDay[];

export const Seasons = {
  Spring: "Spring",
  Summer: "Summer",
  Autumn: "Autumn",
  Winter: "Winter",
} as const;

export type Season = (typeof Seasons)[keyof typeof Seasons];

export const SEASONS = Object.values(Seasons) as Season[];
