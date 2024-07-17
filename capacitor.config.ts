import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "lexacus.simplenutrition.app",
  appName: "simple-nutrition",
  webDir: "dist",
  server: {
    url: "https://simple-nutrition-chi.vercel.app",
    cleartext: true,
  },
};

export default config;
