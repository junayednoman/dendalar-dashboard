"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="p-5 bg-accent rounded-full">
          <Ghost className="w-14 h-14 text-primary" />
        </div>

        <h1 className="text-3xl font-bold text-foreground">
          Oops… Page Not Found
        </h1>

        <p className="text-muted-foreground max-w-md text-sm">
          The page you&apos;re trying to reach just took a vacation. Maybe check
          the link or head back home?
        </p>

        <Link href="/dashboard">
          <Button className="mt-4 px-6">Go Back Home</Button>
        </Link>
      </div>

      <p className="text-xs text-muted-foreground mt-10 opacity-60">
        Error 404 — Lost in space 🌌
      </p>
    </div>
  );
}
