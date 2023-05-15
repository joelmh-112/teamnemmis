import { User } from "@prisma/client";
import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import TwitchProvider from "next-auth/providers/twitch";
import prisma from "@/utils/prisma";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 24 * 60 * 60,
  },
  // Configure one or more authentication providers
  providers: [
    /* GithubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
        }), */
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID || "",
      clientSecret: process.env.TWITCH_CLIENT_SECRET || "",
    }),
    // ...add more providers here
  ],

  callbacks: {
    async signIn({ user, account,profile }: any) {
      
      let provider_id = "";

      let dbUser:User|null = await prisma.user.findFirst({
        where: {
          email: user.email
        },
        include: {
          UserRoles: true,
        },
      });

      try {
        if (account.provider) {
          // tracting the provider
          switch (account.provider) {
            case "discord":
              provider_id = "discord_uuid";
              break;
            case "google":
              provider_id = "google_uuid";
              break;
            case "twitch":
              provider_id = "twitch_uuid";
              break;
          }
        }

        if(dbUser && dbUser[provider_id as keyof User] === null){
          dbUser = await prisma.user.update({
            where: {
              id: dbUser.id,
            },
            data: {
              [provider_id]: user.id,
            },
          });
        }

        if (!dbUser) {
          console.log("no hay usuario");

          dbUser = await prisma.user.create({
            data: {
              [provider_id]: user.id ?? "",
              nickname: user.name ?? "",
              email: user.email ?? "",
              avatar: user.image ?? "",
            },
          });
        }
      } catch (e) {
        console.log(e);
      }
      profile.webUser = dbUser;
      return true;
    },
    async jwt({ token, user, account, profile }: any) {
      if (user) {
        token.webUser = profile.webUser;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.webUser = token.webUser;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
