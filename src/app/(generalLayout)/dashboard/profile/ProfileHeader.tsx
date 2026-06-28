"use client";

import { useRef } from "react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import avatarImg from "@/assets/avatar.png";
import { useUpdateProfileMutation } from "@/redux/api/profileApi";
import handleMutation from "@/utils/handleMutation";

interface ProfileHeaderProps {
  name: string;
  role: string;
  avatar: string;
  onBack?: () => void;
}

const ProfileHeader = ({ name, role, avatar }: ProfileHeaderProps) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Basic validation: check file type and size
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (!validTypes.includes(file.type)) {
      console.error("Invalid file type. Please upload a JPEG or PNG image.");
      return;
    }
    if (file.size > maxSize) {
      console.error("File size exceeds 5MB.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    // Log FormData entries for debugging
    console.log("FormData Entries:", [...formData.entries()]);

    const onSuccess = () => {
      // No redirect needed; stay on profile page
    };

    handleMutation(formData, updateProfile, "Uploading image...", onSuccess);
  };

  return (
    <div className="space-y-6">
      {/* Profile Avatar and Info */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Image
            src={avatar || avatarImg}
            alt={name}
            width={120}
            height={120}
            className="rounded-full"
          />
          <Button
            size="icon"
            className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary hover:bg-primary/90"
            onClick={handleEditClick}
            disabled={isLoading}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/jpeg,image/png,image/jpg"
            onChange={handleFileChange}
          />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-semibold text-primary-foreground">
            {name}
          </h2>
          <p className="text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
