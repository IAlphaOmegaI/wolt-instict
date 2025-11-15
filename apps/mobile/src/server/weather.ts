/**
 * Get weather data (mocked data)
 */
export const getData = async () => {
  return {
    temperature: 22,
    rain: false,
  } as const;
};
