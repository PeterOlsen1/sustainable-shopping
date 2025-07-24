import { Metadata } from "next";
import { getCurrentSession } from "@/actions/auth";
import Center from "@/components/ui/center";
import SignInView from "@/components/views/signin";
import PlatformPageContainer from "@/components/platform-page-container";

export const metadata: Metadata = {
  title: "Sustainable Shopping | Sign In",
  description: "Sign in to Sustainable Shopping.",
};

export default async function Page() {
  const session = await getCurrentSession();

  return (
    <PlatformPageContainer className="h-full">
      <Center className="h-full">
        <SignInView session={session} />
      </Center>
    </PlatformPageContainer>
  );
}
