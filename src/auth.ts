import NextAuth, { DefaultSession, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

// Zod schema for validation
export const signInSchema = z.object({
  phoneNumber: z.string().min(10, "Invalid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

declare module "next-auth" {
  interface Session extends DefaultSession {
    phoneNumber?: string;
    firstName?: string;
    lastName?: string;
  }
}

interface ExtendedUser extends User {
  phoneNumber: string; // Add custom property
  firstName: string;
  lastName: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        phoneNumber: { label: "Phone Number", type: "text", placeholder: "1111111111" }, // Phone number input
        password: { label: "Password", type: "password" }, // Password input
      },
      async authorize(credentials) {
        // Validate credentials using Zod schema
        const parsedCredentials = signInSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          throw new Error("Invalid credentials");
        }

        const { phoneNumber, password } = parsedCredentials.data;

        // Send login request to your API
        const resp = await fetch("http://localhost:3000/api/user/signin", {
          method: "POST",
          body: JSON.stringify({ phoneNumber, password }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!resp.ok) {
          throw new Error("Failed to sign in.");
        }

        const user = await resp.json();
        return user || null; // Return user if successful
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Extend token with username
      if (user) {
        token.phoneNumber = (user as ExtendedUser).phoneNumber;
        token.firstName = (user as ExtendedUser).firstName;
        token.lastName = (user as ExtendedUser).lastName;
      }
      return token;
    },
    async session({ session, token }) {
      // Add username to session
      return { ...session, phoneNumber: token.phoneNumber };
    },
  },
});
