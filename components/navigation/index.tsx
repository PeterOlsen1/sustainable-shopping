"use client";

import Link from "next/link";
import { Session } from "next-auth";
import Image from "next/image";
import SearchBar from "../ui/search-bar";

import appConfig from "@/app/app.config";
import { navigationRoutes } from "@/app/routes";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { Role } from "@/lib/types/enums";
import { userHasRoles } from "@/lib/auth/helpers";

import LoginButton from "./login-button";
import DesktopNavigation from "./desktop-navigation";
import DesktopProfileMenu from "./desktop-profile-menu";
import MobileNavigationMenuPanel from "./mobile-nav-menu-panel";
import { CurrentUser } from "@/actions/users";
import Logo from "../items/Logo";

interface Props {
  session: Session | null;
}

function filterRoutesBaseOnAuthenticationStatus(
  session: Session | null,
): typeof navigationRoutes {
  return navigationRoutes.filter((route) => {
    const routeRoles = route.roles as Role[];
    if (!route.protected) return true;
    if (route.protected && !session) return false;
    if (userHasRoles(session?.user as CurrentUser, routeRoles)) return true;
    return false;
  });
}

export default function PlatformNavigation({ session }: Props) {
  // const filteredRoutes = filterRoutesBaseOnAuthenticationStatus(session);

  return (
    <nav className="text-black p-2 pb-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-12">
          <div className="flex items-center">
            <Link href={appConfig.pages.index} className="flex-shrink-0">
              <Logo />
            </Link>
          </div>
          <div className="flex-1">
            <SearchBar type="item" className={"py-2"} />
          </div>
          <div className="flex gap-4">
            <div className="hidden md:block">
              <div className="ml-4 flex items-center gap-4 md:ml-6">
                <DesktopProfileMenu user={session?.user || null} />
                <LoginButton session={session} visible={!session} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-200 w-[90%] mx-auto mt-4" />
    </nav>
  );
}
