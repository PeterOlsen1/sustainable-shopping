"use client";

import Link from "next/link";
import Image from "next/image";
import LogoImg from "@/public/images/logo.png";
import MobileMenu from "./mobile-menu";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import appConfig from "@/app/app.config";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";

interface Props {
  session?: Session | null;
}

export default function CenteredResponsiveNavbar({ session }: Props) {
  const router = useRouter();

  const linkClasses = "font-medium hover:text-gray-500 px-1 py-2 flex items-center transition duration-150 ease-in-out"
  return (
    <header className="relative w-full z-30 bg-gray-200 text-black py-2">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <div className="flex-1">
            <Link className="inline-flex" href="/" aria-label="Full-Stack-Kit">
              Logo here!
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex md:grow">
            {/* <ul className="flex gap-6 grow justify-center flex-wrap items-center">
              <li>
                <Link
                  className={linkClasses}
                  href="/posts"
                >
                  Posts
                </Link>
              </li>
            </ul> */}
          </nav>

          {/* Desktop nav cta link */}
          <div className="flex-1 flex justify-end items-center gap-4">
            {/* <ThemeModeToggle /> */}
            <Link
              className="font-medium text-sm p-2 px-4 rounded-full bg-black text-white hover:bg-gray-600 whitespace-nowrap transition duration-250 ease-in-out"
              href={session ? appConfig.pages.dashboard : appConfig.pages.signin}
            >
              {session ? "Home" : "Sign in"}
            </Link>
            {session && (
              <Link
                className="font-medium text-sm p-2 px-4 rounded-full bg-black text-white hover:bg-gray-600 whitespace-nowrap transition duration-250 ease-in-out"
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
