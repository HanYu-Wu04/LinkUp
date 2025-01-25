import { auth } from "@/auth";

const valid_paths = [
  "/forgotpass",
  "/",
  "/login",
  "/signup",
  "/api/user/signup",
  "/api/user/signin",
  "/api/user/signout",
  "/api/user/test",
  "/profile/create",
  "/assets",
];

export default auth((req, ctx) => {
  // First check if it's a static asset path
  if (req.nextUrl.pathname.startsWith("/assets/")) {
    return undefined; // Allow access to assets without authentication
  }

  // Then check authentication for other paths
  if (!req.auth && !valid_paths.includes(req.nextUrl.pathname)) {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

// Update matcher to exclude assets along with other paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico).*)"],
};
