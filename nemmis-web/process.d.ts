declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;

    DISCORD_CLIENT_ID: string;
    DISCORD_CLIENT_SECRET: string;

    TWITCH_CLIENT_ID: string;
    TWITCH_CLIENT_SECRET: string;

    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;

    ADMIN_ROLE_ID: number;

    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    HOST: string;
  }
}
