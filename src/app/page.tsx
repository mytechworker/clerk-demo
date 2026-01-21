import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId, sessionClaims } = await auth();

  if (userId) {
    const role = sessionClaims?.publicMetadata?.role as string | undefined;

    if (role === "superadmin") {
      redirect("/superadmin");
    } else if (role === "admin") {
      redirect("/admin");
    } else {
      redirect("/dashboard");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="text-center space-y-8 px-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900">
          Secure Access Control
          <span className="block text-gray-500">
            Built with Clerk
          </span>
        </h1>

        <div className="flex gap-4 justify-center pt-4">
          <Button size="lg" asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/sign-up">Create Account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
