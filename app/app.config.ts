import { AppConfig } from "@/lib/types";
import { Role } from "@/lib/types/enums";

const dev = process.env.NODE_ENV == "development";
const baseUrl =
  (dev
    ? process.env.NEXT_PUBLIC_BASE_URL
    : process.env.NEXT_PUBLIC_BASE_URL_PROD) + "/api";

const appConfig: AppConfig = {
  brand: {
    companyName: "Full Stack Kit LLC.",
    appName: "Full-Stack-Kit",
    logoUrl: "/favicon.ico",
  },

  pages: {
    index: "/",
    home: "/home",
    about: "/about",
    contact: "/contact",
    signin: "/signin",
    signout: "/signout",
    register: "/register",
    dashboard: "/dashboard",
    account: "/account",
  },

  redirects: {
    afterSignin: "/",
    afterSignout: "/",
    whenAccessingAnUnauthorizedPage: "/unauthorized",
    whenNotLoggedInAndAccessingProtectedPage: "/signin",
  },

  api: {
    baseUrl: baseUrl as string,
    sendMail: "/mail/send",
    authProviders: "/auth/providers",
  },

  account: {
    allowDeleteAccount: true,
    showConnectedAccountsSection: true,
  },

  auth: {
    defaultRoles: [Role.USER, Role.ADMIN],
    providers: {
      google: {
        enabled: true,
        clientId: String(process.env.GOOGLE_CLIENT_ID),
        clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
      },
    },
  },
};

export default appConfig;
