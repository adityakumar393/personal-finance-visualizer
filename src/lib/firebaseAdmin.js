import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

// Ensure we initialise the admin SDK only once
if (!getApps().length) {
  initializeApp({
    credential: cert({
      privateKey: process.env.FB_PRIVATE_KEY.replace(/\\n/g, "\n"),
      clientEmail: process.env.FB_CLIENT_EMAIL,
      projectId: process.env.FB_PROJECT_ID,
    }),
  });
}

export const adminAuth = getAuth();
