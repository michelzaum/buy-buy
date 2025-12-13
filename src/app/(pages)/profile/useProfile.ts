import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

import { schema } from "./schema";
import { FormData } from "./types";

type User = {
  name: string;
  email: string;
};

type UserProfileInformationResponse = {
  user: User;
}

export function useProfile() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profileImagePreview, setProfileImagePreview] = useState<string | undefined>('');
  const [isRemoveProfileImageModalOpen, setIsRemoveProfileImageModalOpen] = useState<boolean>(false);
  const form = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    const getLoggedUserInformation = async () => {
      const { data: { user } } = await axios.get<UserProfileInformationResponse>('/api/user/profile');

      form.reset({
        name: user.name,
        email: user.email,
      });

      setIsLoading(false);
    }

    getLoggedUserInformation();
  }, []);

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
    isLoading,
    isRemoveProfileImageModalOpen,
    handleSubmit,
    handleProfileImagePreview,
    handleSelectNewProfileImage,
    handleRemoveProfileImage,
    toggleRemoveProfileImageModalOpen,
  }
}
