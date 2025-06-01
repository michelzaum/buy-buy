import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const accessToken = (await cookies()).get('accessToken')?.value;

  if (accessToken) {
    return redirect('/');
  }

  return (
    <div className='min-h-screen grid place-items-center p-4'>
      {children}
    </div>
  );
}
