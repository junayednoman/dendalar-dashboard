"use client";

import { useRouter, useSearchParams } from "next/navigation";
import * as z from "zod";
import { toast } from "sonner";
import { useState } from "react";

import AForm from "@/components/form/AForm";
import { AInput } from "@/components/form/AInput";
import { Button } from "@/components/ui/button";
import PasswordUpdatedSuccessModal from "../_components/PasswordUpdatedSuccessModal";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import handleMutation from "@/utils/handleMutation";

const newPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password can't exceed 50 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type NewPasswordFormValues = z.infer<typeof newPasswordSchema>;

const NewPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const resetToken = searchParams.get("resetToken") || "";
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async (data: NewPasswordFormValues) => {
    if (!email) {
      toast.error("Email is missing. Please restart the flow.");
      return;
    }

    if (!resetToken) {
      toast.error("Reset token is missing. Please verify OTP again.");
      return;
    }

    const payload = {
      email,
      password: data.newPassword,
      resetToken,
    };

    const onSuccess = () => {
      setShowSuccessModal(true);
    };

    await handleMutation(
      payload,
      resetPassword,
      "Resetting password...",
      onSuccess,
    );
  };

  const handleExploreDashboard = () => {
    router.push("/auth/login");
  };

  return (
    <>
      <div className="w-[600px] rounded-2xl border bg-card p-8 py-10">
        <div className="mb-20 text-center">
          <h1 className="text-[32px] text-white font-bold mb-2">
            Reset Password
          </h1>
          <p className="text-card-foreground text-sm mx-32">
            Set your new password to regain access to your account.
          </p>
        </div>

        <AForm
          schema={newPasswordSchema}
          defaultValues={{
            newPassword: "",
            confirmPassword: "",
          }}
          onSubmit={onSubmit}
        >
          <AInput
            placeholder="Enter password"
            name="newPassword"
            label="New Password"
            type="password"
            required
          />
          <AInput
            placeholder="Enter password"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            required
          />

          <Button
            type="submit"
            className="h-14 w-full"
            disabled={showSuccessModal || isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
        </AForm>
      </div>

      <PasswordUpdatedSuccessModal
        open={showSuccessModal}
        onExploreDashboard={handleExploreDashboard}
      />
    </>
  );
};

export default NewPasswordForm;
