import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
const genralPath = [
  "/about-us",
  "/signin",
  "/signup",
  "/forgot-password",
  "/contact-us",
];
//* clean up this function
export const authConfig = {
  providers: [credentials],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/stocks");
 
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        console.log("You are logged in");
        return Response.redirect(new URL("/stocks", nextUrl));
      } else if (!isOnDashboard && !isLoggedIn) {
        if (nextUrl.pathname.startsWith("/login")) return true;
        else return false;
      }
      return true;
    },
    async session({ session, user }) {
      return session;
    },
  },
} satisfies NextAuthConfig;
