import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { UserModel } from "@/models/User";
import { connectToDb } from "./mongoose";

// Interface for session
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
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    // This funktion need for save user to MONGODB
    async signIn({ user, account }) {
      // Connect MongoDB
      await connectToDb();

      // Find user by email
      const existingUser = await UserModel.findOne({ email: user.email });

      // IF user not to MonogDB We create new user
      if (!existingUser) {
        await UserModel.create({
          name: user.name,
          email: user.email,
          role: "USER",
          image: user.image,
        });
      }

      return true;
    },

    session: async ({ session, token }) => {
      if (session?.user && token.sub) {
        // Find user by email
        const user = await UserModel.findOne({ email: session.user.email });

        // Save User Role to Session Role
        session.user.role = user?.role || "USER";
        // Save User ID to Session ID
        session.user.id = user?._id;
      }
      return session;
    },

    jwt: async ({ user, token }) => {
      if (user) {
        // Save userId to Token
        token.sub = user.id;
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
