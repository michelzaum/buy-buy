import { Loader } from "lucide-react";

export function Loading() {
  return (
    <div className="min-h-screen grid place-items-center p-4">
      <div className="flex flex-col gap-8 items-center">
        <Loader className="animate-spin" />
      </div>
    </div>
  )
}
