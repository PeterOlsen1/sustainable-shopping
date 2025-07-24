import Center from "@/components/ui/center";
import SignOutView from "@/components/views/signout";
import PlatformPageContainer from "@/components/platform-page-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sustainable Shopping | Sign out",
  description: "Sign out of Sustainable Shopping.",
};

export default async function Page() {
  return (
    <PlatformPageContainer className="h-full">
      <Center className="h-full">
        <SignOutView />
      </Center>
    </PlatformPageContainer>
  );
}
