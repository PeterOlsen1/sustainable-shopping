/* eslint-disable react/no-unescaped-entities */
// pages/privacy-policy.js

export const metadata = {
  title: "Privacy Policy - Full-Stack-Kit",
  description: "Full-Stack-Kit Privacy Policy",
};

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Privacy Policy
          </h2>
        </div>
        <div className="text-left text-gray-700">
          <p className="mb-4">
            Your privacy is important to us. It is Full-Stack-Kit's policy to
            respect your privacy regarding any information we may collect from
            you across our website and services.
          </p>
          <p className="mb-4">
            We only ask for personal information when we truly need it to
            provide a service to you. We collect it by fair and lawful means,
            with your knowledge and consent. We also let you know why we're
            collecting it and how it will be used.
          </p>
          <p className="mb-4">
            We only retain collected information for as long as necessary to
            provide you with your requested service. What data we store, we'll
            protect within commercially acceptable means to prevent loss and
            theft, as well as unauthorized access, disclosure, copying, use or
            modification.
          </p>
          <p className="mb-4">
            We don't share any personally identifying information publicly or
            with third-parties, except when required to by law.
          </p>
          <p className="mb-4">
            Our website may link to external sites that are not operated by us.
            Please be aware that we have no control over the content and
            practices of these sites, and cannot accept responsibility or
            liability for their respective privacy policies.
          </p>
          <p className="mb-4">
            You are free to refuse our request for your personal information,
            with the understanding that we may be unable to provide you with
            some of your desired services.
          </p>
          <p className="mb-4">
            Your continued use of our website will be regarded as acceptance of
            our practices around privacy and personal information. If you have
            any questions about how we handle user data and personal
            information, feel free to contact us at contact@technologeek.ca.
          </p>
          <p className="mb-4">
            This policy is effective as of 11 February 2024.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
