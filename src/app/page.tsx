"use client";

import { useEffect, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
};

export default function Home() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (
      event: Event
    ) => {
      console.log(
        "beforeinstallprompt fired"
      );

      event.preventDefault();

      setInstallPrompt(
        event as BeforeInstallPromptEvent
      );
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  // const handleGet = () => {
  //   console.log("GET clicked");

  //   if (installPrompt) {
  //     alert(
  //       "Install prompt is available"
  //     );
  //   } else {
  //     alert(
  //       "Install prompt is NOT available"
  //     );
  //   }
  // };

  const handleGet = () => {
  alert(
    "secure: " +
      window.isSecureContext +
      "\nserviceWorker: " +
      ("serviceWorker" in navigator) +
      "\nstandalone: " +
      window.matchMedia("(display-mode: standalone)").matches +
      "\ninstallPrompt: " +
      (installPrompt ? "YES" : "NO")
  );
};

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">

      <div className="text-center">

        <h1 className="text-3xl font-bold">
          PWA Install Test
        </h1>

        <p className="mt-3 text-neutral-400">
          Testing custom PWA installation
        </p>

        <button
          type="button"
          onClick={handleGet}
          className="mt-8 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-black"
        >
          GET
        </button>

      </div>

    </main>
  );
}