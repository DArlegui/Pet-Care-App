import Credentials from '@auth/core/providers/credentials';
import bcrypt from 'bcryptjs';
import NextAuth, { NextAuthConfig } from 'next-auth';
import prisma from './db';
import { getUserByEmail } from './server-utils';

const config = {
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        // runs on login
        const { email, password } = credentials as { email: string; password: string };

        const user = await getUserByEmail(email);

        if (!user) {
          console.log('User not found');
          return null;
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
          console.log('Invalid credentials');
          return null;
        }

        console.log('User found');
        return user;
      },
    }),
  ],
  callbacks: {
    authorized: ({ auth, request }) => {
      // runs on every request with middleware
      const isLoggedIn = Boolean(auth?.user);
      const appPaths = ['/dashboard', '/account'];
      const publicPaths = ['/signup', '/login'];

      const isTryingToAccessApp = appPaths.some((path) => request.nextUrl.pathname.includes(path));
      const isTryingToAccessPublic = publicPaths.some((path) => request.nextUrl.pathname.includes(path));

      if (!isLoggedIn && isTryingToAccessApp) {
        return false;
      }

      if (isLoggedIn && isTryingToAccessApp) {
        return true;
      }

      if (!isLoggedIn && isTryingToAccessPublic) {
        return true;
      }

      if (isLoggedIn && !isTryingToAccessApp && isTryingToAccessPublic) {
        return Response.redirect(new URL('/dashboard', request.nextUrl.origin).toString());
      }

      return true;
    },
    jwt: ({ token, user }) => {
      if (user) {
        //on sign in
        token.userId = user.id!;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (session.user) {
        session.user.id = token.userId;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;

export const { auth, signIn, signOut } = NextAuth(config);
