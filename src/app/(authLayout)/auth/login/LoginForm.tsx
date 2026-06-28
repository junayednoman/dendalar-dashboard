"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

import AForm from "@/components/form/AForm";
import { AInput } from "@/components/form/AInput";
import { Button } from "@/components/ui/button";

import { loginSchema } from "@/validations/auth.validation";
import { ACheckbox } from "@/components/form/ACheckbox";
import Link from "next/link";
import LoginSuccessModal from "../_components/LoginSuccessModal";
import { useLoginMutation } from "@/redux/api/authApi";
import handleMutation from "@/utils/handleMutation";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { setUser } from "@/redux/slice/authSlice";

type LoginFormValues = {
  email: string;
  password: string;
  rememberPassword: boolean;
};

type DecodedAccessToken = {
  id: string;
  email: string;
  role: string;
};

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: LoginFormValues) => {
    const onSuccess = (response: {
      data?: {
        accessToken?: string;
      };
    }) => {
      const accessToken = response?.data?.accessToken;
      if (!accessToken) return;

      const decodedUser = jwtDecode<DecodedAccessToken>(accessToken);

      dispatch(
        setUser({
          user: {
            id: decodedUser.id,
            _id: decodedUser.id,
            email: decodedUser.email,
            role: decodedUser.role,
          },
          token: accessToken,
        }),
      );

      setShowSuccessModal(true);
      setTimeout(() => {
        router.push(redirectUrl);
      }, 1800);
    };

    await handleMutation(data, login, "Logging in...", onSuccess);
  };

  return (
    <>
      <div className="w-[600px] rounded-2xl border bg-card p-8 py-10">
        <div className="mb-20 text-center">
          <h1 className="mb-2 text-[32px] font-bold text-white">
            Login To Your Account
          </h1>
          <p className="mx-24 text-sm text-card-foreground">
            Please log in to manage your dashboard and access all your
            administrative tools
          </p>
        </div>

        <AForm
          schema={loginSchema}
          defaultValues={{
            email: "junayednoman05@gmail.com",
            password: "SecurePass1234!",
            rememberPassword: false,
          }}
          onSubmit={onSubmit}
        >
          <AInput name="email" label="Email address" type="email" required />
          <AInput name="password" label="Password" type="password" required />

          <div className="flex items-center justify-between">
            <ACheckbox label="Remember password" name="rememberPassword" />
            <div className="text-right">
              <Link href="/auth/forgot-password">
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0 font-normal text-primary"
                >
                  Forgot Password
                </Button>
              </Link>
            </div>
          </div>

          <Button
            disabled={isLoading || showSuccessModal}
            type="submit"
            className="h-14 w-full"
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </AForm>
      </div>

      <LoginSuccessModal open={showSuccessModal} />
    </>
  );
};

export default LoginForm;
