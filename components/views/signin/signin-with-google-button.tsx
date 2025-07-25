import { ComponentProps } from "react";
import { signinWithGoogle } from "@/actions/auth";
import { Button } from "@/components/ui/button";

interface Props extends ComponentProps<typeof Button> {
  visible?: boolean;
  buttonText?: string;
  redirectUrl?: string;
}

export default function SignInWithGoogle({
  visible = true,
  buttonText,
  redirectUrl,
}: Props) {
  if (!visible) return null;

  return (
    <form action={() => signinWithGoogle({ redirectUrl })} className="w-full">
      <Button className="w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm text-center inline-flex items-center dark:focus:ring-[#4285F4]/55">
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2"
          aria-hidden="true"
        >
          <rect width="24" height="24" rx="12" fill="white" />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".35em"
            fontSize="16"
            fontFamily="Arial, Helvetica, sans-serif"
            fill="black"
          >
            G
          </text>
        </svg>
        <span className="w-full text-center">
          {buttonText || "Log in with Google"}
        </span>
      </Button>
    </form>
  );
}

export function DisconnectGoogleAccount({
  visible = true,
  onClick,
  buttonText,
}: Props & { onClick?: () => void }) {
  if (!visible) return null;

  return (
    <Button
      className="w-full text-white bg-red-700 hover:bg-[#99092F]/90 focus:ring-4 focus:outline-none focus:ring-red-700/50 font-medium rounded-lg text-sm text-center inline-flex items-center dark:focus:ring-[#4285F4]/55"
      onClick={onClick}
    >
      <GoogleLogo />
      <span className="w-full text-center">
        {buttonText || "Disconnect Google Account"}
      </span>
    </Button>
  );
}

function GoogleLogo() {
  return (
    <svg
      className="w-4 h-4"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
