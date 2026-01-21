import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoutes = createRouteMatcher(["/dashboard(.*)", "/admin(.*)", "/superadmin(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isSuperAdminRoute = createRouteMatcher(["/superadmin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Protect all defined routes
  if (isProtectedRoutes(req)) {
    await auth.protect();

    const { sessionClaims } = await auth();
    
    // Debug: Log what's actually in sessionClaims
    console.log("🔍 Session Claims:", JSON.stringify(sessionClaims, null, 2));
    console.log("🔍 Public Metadata:", sessionClaims?.publicMetadata);
    
    const role = sessionClaims?.publicMetadata?.role as string | undefined;
    console.log("🔍 Detected Role:", role);

    // Check Admin Access (Allow both admin and superadmin)
    if (isAdminRoute(req) && role !== "admin" && role !== "superadmin") {
      return NextResponse.redirect(new URL("/access-denied", req.url));
    }

    // Check Superadmin Access (Allow only superadmin)
    if (isSuperAdminRoute(req) && role !== "superadmin") {
      return NextResponse.redirect(new URL("/access-denied", req.url));
    }

    // Automatic redirection from generic /dashboard to role-specific homes
    if (req.nextUrl.pathname === "/dashboard") {
      if (role === "admin") return NextResponse.redirect(new URL("/admin", req.url));
      if (role === "superadmin") return NextResponse.redirect(new URL("/superadmin", req.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
