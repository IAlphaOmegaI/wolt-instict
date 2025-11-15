declare namespace NodeJS {
  export interface ProcessEnv {
    readonly APP_VARIANT?: string;
    readonly EAS_BUILD?: true;
    readonly EXPO_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY: string;
    readonly EXPO_PUBLIC_GOOGLE_SEARCH_API_KEY: string;
    readonly EXPO_PUBLIC_GOOGLE_SEARCH_ENGINE_ID: string;
  }
}
