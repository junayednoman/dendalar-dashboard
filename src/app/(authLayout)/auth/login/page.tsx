"use client";
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("./LoginForm"), {
  ssr: false,
});

const Login = () => {
  return <LoginForm />;
};

export default Login;
