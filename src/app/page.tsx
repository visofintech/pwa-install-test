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
  const [showIosInstall, setShowIosInstall] = useState(false);

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



const handleGet = () => {
  const isIos =
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !(window as any).MSStream;

  if (isIos) {
    setShowIosInstall(true);
    return;
  }

  if (!installPrompt) {
    alert("Install prompt is not available");
    return;
  }

  setShowAndroidInstall(true);
};

// const handleGet = () => {
 
//      setShowAndroidInstall(true);
//      //setShowIosInstall(true);
  
// };

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
    <div className="w-full max-w-sm rounded-3xl bg-gray-900 p-4 text-white">
      {/* App identity */}
      <div className="flex items-center gap-4">
        <img
          src="/icons/icon-192.png"
          alt="Forelity"
          className="h-12 w-12 rounded-2xl"
        />

        <div>
          <h2 className="text-lg font-bold">
            Forelity
          </h2>
          <p className="mt-0 text-sm text-neutral-400">
            Know your personal timing
          </p>
        </div>
      </div>

      

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
        className="mt-6 w-full rounded-xl px-6 py-3 font-semibold"
        style={{ backgroundColor: '#263B8F', color: '#E0A83C'}}
      >
        INSTALL
      </button>

      <button
        type="button"
        onClick={() => setShowAndroidInstall(false)}
        className="mt-3 w-full py-2 text-sm text-neutral-300"
        
      >
        Cancel
      </button>
    </div>
  </div>
)}

{showIosInstall && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-6">
    <div className="w-full max-w-sm rounded-3xl bg-gray-900 p-4 text-white">

      {/* App identity */}
      <div className="flex items-center gap-4">
        <img
          src="/icons/icon-192.png"
          alt="Forelity"
          className="h-12 w-12 rounded-2xl"
        />

        <div>
          <h2 className="text-lg font-bold">
            Forelity
          </h2>
          <p className="mt-0 text-sm text-neutral-400">
            Know your personal timing
          </p>
        </div>
      </div>

      <div className="w-full bg-gray-600 mt-5" style={{height: '0.5px'}}></div>
      <p className="mt-3 text-sm text-gray-200 text-center">
            A few quick steps to install. Follow the instructions below
          </p>
      <div className="w-full bg-gray-600 mt-3" style={{height: '0.5px'}}></div>

      {/* Instructions */}
      <div className="mt-3 space-y-3">

        {/* Share */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
             
            >
               <path fill="#ffffff" d="M5.5 23c-0.4 0 -0.75 -0.15 -1.05 -0.45 -0.3 -0.3 -0.45 -0.65 -0.45 -1.05V8.775c0 -0.4 0.15 -0.75 0.45 -1.05 0.3 -0.3 0.65 -0.45 1.05 -0.45h4.225v1.5H5.5V21.5h13V8.775h-4.275v-1.5H18.5c0.4 0 0.75 0.15 1.05 0.45 0.3 0.3 0.45 0.65 0.45 1.05V21.5c0 0.4 -0.15 0.75 -0.45 1.05 -0.3 0.3 -0.65 0.45 -1.05 0.45H5.5Zm5.725 -7.675V3.9l-2.2 2.2 -1.075 -1.075L11.975 1 16 5.025l-1.075 1.075 -2.2 -2.2v11.425h-1.5Z" stroke-width="0.5"></path>
            </svg>
          </div>

          <p className="text-[15px] leading-5">
            Press <strong>Share</strong> in Navigation Bar
          </p>
        </div>

        {/* Add to Home Screen */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="4" y="4" width="16" height="16" rx="3" />
              <path d="M12 8v8" />
              <path d="M8 12h8" />
            </svg>
          </div>

          <p className="text-[15px] leading-5">
            Scroll down to <strong>Add to Home Screen</strong> and tap
          </p>
        </div>

      </div>

      {/* Close */}
      <button
        type="button"
        onClick={() => setShowIosInstall(false)}
        className="mt-8 w-full rounded-lg px-6 py-3 font-semibold"
        style={{ backgroundColor: '#263B8F', color: '#E0A83C'}}
      >
        OK, GOT IT
      </button>

    </div>
  </div>
)}

    </main>
  );
}