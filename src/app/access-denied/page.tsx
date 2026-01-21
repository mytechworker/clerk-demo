import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

export default function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 p-4">
      <Card className="w-full max-w-md text-center shadow-lg border-red-100">
        <CardHeader className="flex flex-col items-center gap-4 pb-2">
          <div className="p-3 bg-red-100 rounded-full">
            <ShieldAlert className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-neutral-900">Access Denied</CardTitle>
          <CardDescription className="text-neutral-500">
            You do not have permission to view this page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-neutral-600 mb-4">
            If you believe this is an error, please contact your system administrator or try signing in with a different account.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button variant="outline" asChild>
             <Link href="/dashboard">Return to Dashboard</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
