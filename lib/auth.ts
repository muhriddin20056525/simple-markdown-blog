import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "./mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { UserModel } from "@/models/User";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user && token.sub) {
        session.user.id = token.sub;

        const user = await UserModel.findOne({ id: token.sub });

        session.user.role = user.role || "USER";
      }
      return session;
    },

    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
};
