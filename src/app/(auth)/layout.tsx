import { redirect } from "next/navigation";
import { getAccessToken } from "@/lib/auth";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const accessToken = await getAccessToken();

  if (accessToken) {
    return redirect('/');
  }

  return (
    <div className='min-h-screen grid place-items-center p-4'>
      {children}
    </div>
  );
}
