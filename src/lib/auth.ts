import NextAuth, { NextAuthConfig } from 'next-auth';

const config = {
  pages: {
    signIn: '/login',
  },
  providers: [],
  callbacks: {
    authorized: ({ request }) => {
      // Use an array of paths
      const paths = ['/app', '/dashboard', '/account'];
      const isTryingToAccessApp = paths.some((path) => request.nextUrl.pathname.includes(path));

      if (isTryingToAccessApp) {
        return false;
      } else {
        return true;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;

export const { auth } = NextAuth(config);
