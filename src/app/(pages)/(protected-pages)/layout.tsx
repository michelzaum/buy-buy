import { redirect } from "next/navigation";

import { AuthProvider } from "@/contexts/AuthContext";
import { auth } from "@/lib/auth";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await auth();

  if (!user) {
    return redirect('/sign-in');
  }

  return (
    <AuthProvider user={user}>
      {children}
    </AuthProvider>
  );
}
