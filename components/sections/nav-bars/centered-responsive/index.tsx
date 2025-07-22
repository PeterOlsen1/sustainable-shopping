"use client";

import Link from "next/link";
import MobileMenu from "./mobile-menu";
import { Session } from "next-auth";
import appConfig from "@/app/app.config";
import Logo from "@/components/items/Logo";

interface Props {
  session?: Session | null;
}

export default function CenteredResponsiveNavbar({ session }: Props) {
  return (
    <header className="relative w-full z-30 text-black py-2">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <div className="flex-1">
            <Link className="inline-flex" href="/" aria-label="Full-Stack-Kit">
              <Logo />
            </Link>
          </div>

          {/* Desktop nav cta link */}
          <div className="flex-1 flex justify-end items-center gap-4">
            {/* <Link
              className="font-medium text-sm p-2 px-4 rounded bg-black text-white hover:bg-gray-600 whitespace-nowrap transition duration-250 ease-in-out"
              href={
                session ? appConfig.pages.dashboard : appConfig.pages.signin
              }
            >
              {session ? "Home" : "Sign in"}
            </Link> */}
            {session && (
              <Link
                className="font-medium text-sm p-2 px-4 rounded bg-black text-white hover:bg-gray-600 whitespace-nowrap transition duration-250 ease-in-out"
                href={appConfig.pages.signout}
              >
                Sign out
              </Link>
            )}
          </div>

          {/* Mobile menu */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
