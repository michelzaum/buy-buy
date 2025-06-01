import { redirect } from "next/navigation";
import { getAccessToken } from "@/lib/auth";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return redirect('/sign-in');
  }

  return children;
}
