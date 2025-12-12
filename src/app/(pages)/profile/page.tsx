'use client';

import { ChangeEvent, useState } from 'react';
import Image from "next/image";

import { Button } from "@/components/ui/button";

export default function Profile() {
  const [profileImagePreview, setProfileImagePreview] = useState<string | undefined>('');

  function handleProfileImagePreview(event: ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0];
    setProfileImagePreview((prevState) =>
      file ? URL.createObjectURL(file) : prevState,
    );
  }

  function handleSelectNewProfileImage(): void {
    document.getElementById('#ProfileImage')?.click();
  }

  return (
    <div className="flex justify-center h-dvh">
      <div>
        <div className="flex flex-col items-center gap-6">
          <Image
            width={200}
            height={200}
            src={profileImagePreview ? profileImagePreview : "https://github.com/shadcn.png"}
            alt="@shadcn"
            className="rounded-full"
          />
          <div className="flex items-center gap-4">
            <div>
              <input
                id='#ProfileImage'
                onChange={handleProfileImagePreview}
                type="file"
                className="hidden"
              />
              <Button variant='secondary' onClick={handleSelectNewProfileImage}>Editar foto</Button>
            </div>
            <Button variant='destructive'>Remover foto</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
