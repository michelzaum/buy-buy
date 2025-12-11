import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuthenticated = await auth();

  if (isAuthenticated) {
    return redirect('/');
  }

  return (
    <div className='min-h-screen grid place-items-center p-4'>
      {children}
    </div>
  );
}
