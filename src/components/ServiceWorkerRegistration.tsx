"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
        //   console.log(
        //     "Service Worker registered:",
        //     registration.scope
        //   );
        alert(
    "SW registered\nScope: " +
    registration.scope
  );
        })
        .catch((error) => {
        //   console.error(
        //     "Service Worker registration failed:",
        //     error
        //   );
        alert(
    "SW registration failed\n" +
    error.message
  );
        });
    }
  }, []);

  return null;
}