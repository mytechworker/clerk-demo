import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth, currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

function DashboardItem({ 
  label, 
  value, 
  capitalize = false 
}: { 
  label: string; 
  value: string; 
  capitalize?: boolean; 
}) {
  return (
    <div className="flex justify-between items-center py-2 border-b last:border-0 border-neutral-100">
      <span className="text-sm font-medium text-neutral-500">{label}:</span>
      <span className={`text-sm font-semibold text-neutral-900 ${capitalize ? "capitalize" : ""}`}>
        {value}
      </span>
    </div>
  );
}


export default async function DashboardPage() {
  const { userId, sessionClaims } = await auth();
  const user = await currentUser();

  if (!user) {
      return null; 
  }

  const role = (sessionClaims?.publicMetadata?.role as string) || "user";
  const firstName = user.firstName ?? "N/A";
  const lastName = user.lastName ?? "";
  const username = user.username ?? "N/A";
  const email = user.emailAddresses?.[0]?.emailAddress ?? "No email found";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">User Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <DashboardItem label="Role" value={role} capitalize />
            <DashboardItem label="Full Name" value={`${firstName} ${lastName}`} />
            <DashboardItem label="Username" value={username} />
            <DashboardItem label="Email" value={email} />
          </div>
          
          <div className="pt-4">
            <SignOutButton redirectUrl="/">
              <Button variant="destructive" className="w-full">
                Logout
              </Button>
            </SignOutButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}