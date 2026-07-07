"use client";

import { useState } from "react";
import AErrorMessage from "@/components/AErrorMessage";
import ASpinner from "@/components/ui/ASpinner";
import handleMutation from "@/utils/handleMutation";
import {
  useGetMascotsQuery,
  useRemoveMascotFieldMutation,
  useUpdateMascotsMutation,
} from "@/redux/api/mascotsApi";
import MascotFieldCard from "./MascotFieldCard";

type MascotFieldKey =
  | "splash1"
  | "splash2"
  | "splash3"
  | "courseBuilding"
  | "referralSource"
  | "createProfile"
  | "avatar"
  | "signupSuccess"
  | "login"
  | "forgetPassword"
  | "verificationSuccess"
  | "setNewPassword"
  | "passwordSaved"
  | "levelLocked"
  | "questionAvatar"
  | "hint"
  | "congrats"
  | "vocabularyComingSoon"
  | "booksComingSoon"
  | "editProfile";

type MascotData = Partial<Record<MascotFieldKey, string | null>> & {
  id?: string;
  key?: string;
  createdAt?: string;
  updatedAt?: string;
};

const mascotFields: { key: MascotFieldKey; label: string }[] = [
  { key: "splash1", label: "Splash 1" },
  { key: "splash2", label: "Splash 2" },
  { key: "splash3", label: "Splash 3" },
  { key: "courseBuilding", label: "Course Building" },
  { key: "referralSource", label: "Referral Source" },
  { key: "createProfile", label: "Create Profile" },
  { key: "avatar", label: "Avatar" },
  { key: "signupSuccess", label: "Signup Success" },
  { key: "login", label: "Login" },
  { key: "forgetPassword", label: "Forget Password" },
  { key: "verificationSuccess", label: "Verification Success" },
  { key: "setNewPassword", label: "Set New Password" },
  { key: "passwordSaved", label: "Password Saved" },
  { key: "levelLocked", label: "Level Locked" },
  { key: "questionAvatar", label: "Question Avatar" },
  { key: "hint", label: "Hint" },
  { key: "congrats", label: "Congrats" },
  { key: "vocabularyComingSoon", label: "Vocabulary Coming Soon" },
  { key: "booksComingSoon", label: "Books Coming Soon" },
  { key: "editProfile", label: "Edit Profile" },
];

const MascotsContainer = () => {
  const [activeUploadField, setActiveUploadField] =
    useState<MascotFieldKey | null>(null);
  const [activeRemoveField, setActiveRemoveField] =
    useState<MascotFieldKey | null>(null);
  const { data, isLoading, isError, error, refetch } = useGetMascotsQuery(
    undefined,
  );
  const [updateMascots, { isLoading: isUpdating }] =
    useUpdateMascotsMutation();
  const [removeMascotField, { isLoading: isRemoving }] =
    useRemoveMascotFieldMutation();

  const mascotData: MascotData = data?.data || {};

  const handleUpload = async (field: string, file: File) => {
    const mascotField = field as MascotFieldKey;
    const formData = new FormData();
    formData.append(mascotField, file);
    setActiveUploadField(mascotField);
    try {
      await handleMutation(
        formData,
        updateMascots,
        `Updating ${mascotField} mascot...`,
      );
    } finally {
      setActiveUploadField(null);
    }
  };

  const handleRemove = async (field: string) => {
    const mascotField = field as MascotFieldKey;
    setActiveRemoveField(mascotField);
    try {
      await handleMutation(
        { field: mascotField },
        removeMascotField,
        `Removing ${mascotField} mascot...`,
      );
    } finally {
      setActiveRemoveField(null);
    }
  };

  if (isLoading) {
    return <ASpinner size={120} className="min-h-[320px]" />;
  }

  if (isError) {
    return (
      <AErrorMessage error={error} onRetry={refetch} className="min-h-[320px]" />
    );
  }

  return (
    <div className="space-y-8 pt-8">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
        {mascotFields.map((field) => (
          <MascotFieldCard
            key={field.key}
            field={field.key}
            label={field.label}
            imageUrl={mascotData[field.key]}
            onUpload={handleUpload}
            onRemove={handleRemove}
            isUpdating={isUpdating && activeUploadField === field.key}
            isRemoving={isRemoving && activeRemoveField === field.key}
          />
        ))}
      </div>
    </div>
  );
};

export default MascotsContainer;
