"use client";

import { Button } from "@/components/ui/button";
import AForm from "@/components/form/AForm";
import { AInput } from "@/components/form/AInput";
import {
  ChangePasswordFormValues,
  changePasswordSchema,
} from "@/validations/auth.validation";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import handleMutation from "@/utils/handleMutation";

const ChangePasswordForm = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handlePasswordChange = (data: ChangePasswordFormValues) => {
    const payload = {
      oldPassword: data.currentPassword,
      newPassword: data.newPassword,
    };

    handleMutation(payload, changePassword, "Changing password...");
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-primary-foreground text-center">
        Change Password
      </h3>

      <AForm<ChangePasswordFormValues>
        schema={changePasswordSchema}
        defaultValues={
          { currentPassword: "", newPassword: "", confirmPassword: "" } as
            | ChangePasswordFormValues
            | undefined
        }
        onSubmit={handlePasswordChange}
      >
        <AInput
          name="currentPassword"
          label="Current Password"
          type="password"
          placeholder="Enter current password"
          required
        />
        <AInput
          name="newPassword"
          label="New Password"
          type="password"
          placeholder="Enter new password"
          required
        />
        <AInput
          name="confirmPassword"
          label="Confirm New Password"
          type="password"
          placeholder="Confirm new password"
          required
        />
        <Button disabled={isLoading} type="submit" className="w-full h-[50px]">
          {isLoading ? "Saving..." : "Save & Change"}
        </Button>
      </AForm>
    </div>
  );
};

export default ChangePasswordForm;
