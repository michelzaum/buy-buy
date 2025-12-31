import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { hash } from "bcryptjs";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import { schema } from "./schema";
import { FormData } from "./types";

type User = {
  id: string;
  name: string;
  email: string;
};

type UserProfileInformationResponse = {
  user: User;
}

export function useProfile() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profileImagePreview, setProfileImagePreview] = useState<string | undefined>('');
  const [loggedUserInfo, setLoggedUserInfo] = useState<User>({} as User);
  const [isRemoveProfileImageModalOpen, setIsRemoveProfileImageModalOpen] = useState<boolean>(false);
  const [isSavingData, setIsSavingData] = useState<boolean>(false);
  const form = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    const getLoggedUserInformation = async () => {
      const { data: { user } } = await axios.get<UserProfileInformationResponse>('/api/user/profile');

      form.reset({
        name: user.name,
        email: user.email,
      });

      setLoggedUserInfo(user);
      setIsLoading(false);
    }

    getLoggedUserInformation();
  }, []);

  const handleSubmit = form.handleSubmit(async (formData): Promise<any> => {
    try {
      setIsSavingData(true);
      let hashedPassword;
      if (formData.password) {
        hashedPassword = await hash(formData.password, 12);
      }

      const response = await axios.put(`/api/user/profile/${loggedUserInfo.id}`, {
        name: formData.name,
        email: formData.email,
        password: hashedPassword,
      });

      toast.success('Informações atualizadas!', {
        style: {
          backgroundColor: 'green',
          color: "white",
          fontSize: '1rem',
          fontWeight: 500,
        }
      });

      return response;
    } catch (error) {
      toast.error('Erro ao salvar informações', {
        style: {
          backgroundColor: 'red',
          color: "white",
          fontSize: '1rem',
          fontWeight: 500,
        },
      });
      console.error(error);
    } finally {
      setIsSavingData(false);
    }
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
    isSavingData,
    handleSubmit,
    handleProfileImagePreview,
    handleSelectNewProfileImage,
    handleRemoveProfileImage,
    toggleRemoveProfileImageModalOpen,
  }
}
