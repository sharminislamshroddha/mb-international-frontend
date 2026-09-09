"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

import { env } from "@/config/env";
import { useGoogleLogin } from "@/hooks/mutations/useGoogleLogin";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: Record<string, unknown>
          ) => void;
        };
      };
    };
  }
}

interface Props {
  onSuccess: () => void;
}

export default function GoogleLoginButton({ onSuccess }: Props) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const googleLogin = useGoogleLogin();

  useEffect(() => {
    if (
      !scriptLoaded ||
      !env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
      !window.google ||
      !buttonRef.current
    ) {
      return;
    }

    window.google.accounts.id.initialize({
      client_id: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: (response) => {
        googleLogin.mutate(response.credential, { onSuccess });
      },
    });

    window.google.accounts.id.renderButton(buttonRef.current, {
      theme: "outline",
      size: "large",
      width: 320,
      text: "continue_with",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptLoaded]);

  if (!env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
    return (
      <button
        type="button"
        disabled
        title="Google login is not configured yet."
        className="flex h-10 w-full items-center justify-center rounded-lg border border-input text-sm font-medium text-muted-foreground opacity-60"
      >
        Continue with Google
      </button>
    );
  }

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />

      {googleLogin.isError && (
        <p className="mb-2 text-xs text-destructive">
          {googleLogin.error?.message ?? "Google login failed."}
        </p>
      )}

      <div
        ref={buttonRef}
        className="flex w-full justify-center [&>div]:w-full"
      />
    </>
  );
}
