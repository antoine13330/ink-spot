import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

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
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
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
