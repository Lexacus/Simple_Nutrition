import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "lexacus.simplenutrition.app",
  appName: "simple-nutrition",
  webDir: "dist",
  server: {
    /*  androidScheme: "https", */
    url: "http://192.168.1.13:5173",
    cleartext: true,
  },
};

export default config;
