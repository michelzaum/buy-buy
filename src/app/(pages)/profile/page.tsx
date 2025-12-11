import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function Profile() {
  return (
    <div className="flex justify-center h-dvh">
      <div>
        <div className="flex flex-col items-center gap-6">
          <Image
            width={200}
            height={200}
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className="rounded-full"
          />
          <div className="flex items-center gap-4">
            <div>
              <input type="file" className="hidden" />
              <Button variant='secondary'>Editar foto</Button>
            </div>
            <Button variant='destructive'>Remover foto</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
