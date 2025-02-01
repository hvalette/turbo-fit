import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';
import { User } from '@prisma/client';

const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        return (
          (profile as GoogleProfile).email_verified &&
          (profile as GoogleProfile).email.endsWith('@decathlon.com')
        );
      }
      return true;
    },
    jwt: ({ token, user }) => {
      const isInitialSignIn = !!user;
      if (isInitialSignIn) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user as User;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
