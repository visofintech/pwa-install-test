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
  const [showAndroidInstall, setShowAndroidInstall] =
  useState(false);

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
  if (!installPrompt) {
    alert("Install prompt is not available");
    return;
  }

  setShowAndroidInstall(true);
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

      {showAndroidInstall && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6">
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-black">
      <h2 className="text-xl font-bold">
        Install PWA Install Test
      </h2>

      <p className="mt-3 text-sm leading-6 text-neutral-600">
        Install the app on your phone for a faster
        experience.
      </p>

      <button
        type="button"
        onClick={async () => {
  if (!installPrompt) return;

  await installPrompt.prompt();

  const choice = await installPrompt.userChoice;

  if (choice.outcome === "accepted") {
    console.log("App installed");
  } else {
    console.log("Installation dismissed");
  }

  setShowAndroidInstall(false);
}}
        className="mt-6 w-full rounded-xl bg-black px-6 py-3 font-semibold text-white"
      >
        INSTALL
      </button>

      <button
        type="button"
        onClick={() => setShowAndroidInstall(false)}
        className="mt-3 w-full py-2 text-sm text-neutral-500"
      >
        Cancel
      </button>
    </div>
  </div>
)}

    </main>
  );
}