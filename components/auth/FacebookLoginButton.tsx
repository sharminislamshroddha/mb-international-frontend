"use client";

import Script from "next/script";
import { useState } from "react";

import { env } from "@/config/env";
import { useFacebookLogin } from "@/hooks/mutations/useFacebookLogin";

declare global {
  interface Window {
    FB?: {
      init: (options: Record<string, unknown>) => void;
      login: (
        callback: (response: {
          authResponse?: { accessToken: string };
        }) => void,
        options?: Record<string, unknown>
      ) => void;
    };
  }
}

interface Props {
  onSuccess: () => void;
}

export default function FacebookLoginButton({ onSuccess }: Props) {
  const [sdkReady, setSdkReady] = useState(false);
  const facebookLogin = useFacebookLogin();

  function handleClick() {
    if (!window.FB) return;

    window.FB.login(
      (response) => {
        if (response.authResponse?.accessToken) {
          facebookLogin.mutate(response.authResponse.accessToken, {
            onSuccess,
          });
        }
      },
      { scope: "email" }
    );
  }

  if (!env.NEXT_PUBLIC_FACEBOOK_APP_ID) {
    return (
      <button
        type="button"
        disabled
        title="Facebook login is not configured yet."
        className="flex h-10 w-full items-center justify-center rounded-lg border border-input text-sm font-medium text-muted-foreground opacity-60"
      >
        Continue with Facebook
      </button>
    );
  }

  return (
    <>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="afterInteractive"
        onLoad={() => {
          window.FB?.init({
            appId: env.NEXT_PUBLIC_FACEBOOK_APP_ID,
            cookie: true,
            xfbml: false,
            version: "v19.0",
          });
          setSdkReady(true);
        }}
      />

      {facebookLogin.isError && (
        <p className="mb-2 text-xs text-destructive">
          {facebookLogin.error?.message ?? "Facebook login failed."}
        </p>
      )}

      <button
        type="button"
        onClick={handleClick}
        disabled={!sdkReady || facebookLogin.isPending}
        className="flex h-10 w-full items-center justify-center rounded-lg bg-[#1877F2] text-sm font-medium text-white transition-colors hover:bg-[#166FE5] disabled:opacity-60"
      >
        Continue with Facebook
      </button>
    </>
  );
}
