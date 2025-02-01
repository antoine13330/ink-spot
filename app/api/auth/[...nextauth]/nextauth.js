// nextauth.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = { email: credentials.email }; // Remplace par une logique d'authentification réelle
        if (user) {
          return user; // Retourner l'utilisateur si authentifié
        }
        return null; // Retourner null si échec de l'authentification
      },
    }),
    // Tu peux ajouter d'autres providers ici, si nécessaire
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.email = token.email;
      return session;
    },
  },
  pages: {
    signIn: "/login", // page de connexion
  },
};

export default NextAuth(authOptions);
