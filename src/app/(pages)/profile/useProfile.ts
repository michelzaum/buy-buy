import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { schema } from "./schema";
import { FormData } from "./types";

export function useProfile() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const [profileImagePreview, setProfileImagePreview] = useState<string | undefined>('');
  const [isRemoveProfileImageModalOpen, setIsRemoveProfileImageModalOpen] = useState<boolean>(false);

  const handleSubmit = form.handleSubmit(async (formData): Promise<void> => {
    console.log(formData);
  });
  
  function handleProfileImagePreview(event: ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0];
    setProfileImagePreview((prevState) =>
      file ? URL.createObjectURL(file) : prevState,
    );
  }

  function handleSelectNewProfileImage(): void {
    document.getElementById('#ProfileImage')?.click();
  }

  function handleRemoveProfileImage() {}

  function toggleRemoveProfileImageModalOpen(isOpen: boolean) {
    setIsRemoveProfileImageModalOpen(isOpen);
  }

  return {
    form,
    profileImagePreview,
    isRemoveProfileImageModalOpen,
    handleSubmit,
    handleProfileImagePreview,
    handleSelectNewProfileImage,
    handleRemoveProfileImage,
    toggleRemoveProfileImageModalOpen,
  }
}
