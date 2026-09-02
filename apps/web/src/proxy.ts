import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/**
 * Everything a cold visitor has to be able to read before deciding to write
 * to Pilar or create an account. The marketing surfaces under app/(site) all
 * belong here — behind auth they can't sell to anyone.
 */
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
  "/coaching",
  "/add-ons",
  "/zere-studio",
  "/sobre-pilar",
  "/eventos",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/(api|trpc)(.*)",
  ],
};
