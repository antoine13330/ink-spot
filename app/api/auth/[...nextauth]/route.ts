import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import authOptions from "./nextauth";
export default withAuth(
  function middleware(req) {
    const url = req.nextUrl.clone();
    const isAuthenticated = !!req.nextauth.token;

    if (url.pathname === "/") {
      // Si l'utilisateur est connecté, on redirige vers /home
      if (isAuthenticated) {
        url.pathname = "/home";
        return NextResponse.redirect(url);
      } 
      // Sinon, on le redirige vers /login
      else {
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Si un token existe, l'utilisateur est autorisé
    },
    pages: {
      signIn: "/login", // Redirection vers la page de connexion
    },
    ...authOptions, // Ajout des options NextAuth
  }
);

export const config = {
  matcher: [
    "/profile",
    "/book/:path*",
    "/appointments/:path*",
    "/home",
    "/", // La racine doit être redirigée
  ],
};
