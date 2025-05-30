import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function SignUp({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Faça seu cadastro</CardTitle>
        <CardDescription>
          Preencha os campos abaixo para criar uma conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="name"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full">
                Cadastrar
              </Button>
            </div>
          </div>
          <div className="mt-4 text-center text-sm">
            Já tem uma conta?{" "}
            <Link href="/sign-in" className="underline underline-offset-4">
              Entre
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
