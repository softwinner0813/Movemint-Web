import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">
        Privacy Policy for All Star Seating Navigation
      </h1>
      <p className="mb-4">Last updated: 09/10/2024</p>
      <p className="mb-4">
        All Star Seating Navigation ("we," "our," or "us") is committed to
        protecting your privacy. This Privacy Policy explains how we collect,
        use, disclose, and safeguard your information when you use our app. By
        using the All Star Seating Navigation app, you agree to the collection
        and use of information in accordance with this Privacy Policy. If you do
        not agree with the terms, please do not use our app.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        1. Information We Collect
      </h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          Personal Information: When you create an account, we may ask for
          information such as your name, email address, and contact information.
        </li>
        <li>
          Usage Data: We may automatically collect information about your
          device, including your IP address, browser type, operating system, app
          usage data, and other diagnostic data.
        </li>
        <li>
          Location Data: If you allow the app to access your location, we may
          collect and process location data to provide navigation services.
        </li>
        <li>
          Cookies and Tracking Technologies: We use cookies and similar
          technologies to enhance your experience and analyze usage patterns.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        2. How We Use Your Information
      </h2>
      <ul className="list-disc list-inside mb-4">
        <li>To provide and maintain our app.</li>
        <li>
          To personalize your experience and deliver content relevant to you.
        </li>
        <li>To improve our app, features, and functionality.</li>
        <li>
          To communicate with you, respond to inquiries, and provide customer
          support.
        </li>
        <li>
          To monitor and analyze usage and trends to improve your experience.
        </li>
        <li>
          To detect, prevent, and address technical issues, security threats, or
          fraud.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        3. Sharing Your Information
      </h2>
      <p className="mb-4">
        We do not sell, rent, or trade your personal information to third
        parties. However, we may share your information in the following
        situations:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>
          With Service Providers: We may share your information with third-party
          service providers to help us provide and improve our app.
        </li>
        <li>
          For Legal Reasons: We may disclose your information if required by law
          or in response to valid requests by public authorities (e.g., a court
          or a government agency).
        </li>
        <li>
          Business Transfers: In the event of a merger, acquisition, or asset
          sale, your information may be transferred as part of that business
          deal.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        4. Security of Your Information
      </h2>
      <p className="mb-4">
        We use industry-standard security measures to protect your information.
        However, no method of transmission over the Internet or method of
        electronic storage is 100% secure. We cannot guarantee the absolute
        security of your data.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Your Choices</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          Account Information: You may update or delete your account information
          at any time by logging into your account.
        </li>
        <li>
          Cookies: Most web browsers are set to accept cookies by default. You
          can remove or reject cookies by adjusting your browser settings, but
          this may affect the functionality of our app.
        </li>
        <li>
          Location Data: You can control whether the app has access to your
          location through your device's settings.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        6. Third-Party Services
      </h2>
      <p className="mb-4">
        Our app may contain links to third-party websites, apps, or services. We
        are not responsible for the privacy practices or content of these third
        parties. We encourage you to review the privacy policies of any
        third-party sites you visit.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        7. Children’s Privacy
      </h2>
      <p className="mb-4">
        Our app is not intended for use by children under the age of 13. We do
        not knowingly collect personal information from children under 13. If
        you become aware that a child has provided us with personal data, please
        contact us so we can delete such information.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">
        8. Changes to This Privacy Policy
      </h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. We will notify you
        of any changes by posting the new policy on the app. You are advised to
        review this Privacy Policy periodically for any changes.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">9. Contact Us</h2>
      <p className="mb-4">
        If you have any questions or concerns about this Privacy Policy, please
        contact us at{" "}
        <a
          href="mailto:help@allstarseatingnavigation.com"
          className="text-blue-600"
        >
          help@allstarseatingnavigation.com
        </a>
        .
      </p>

      <p>
        By using the All Star Seating Navigation app, you acknowledge that you
        have read, understood, and agreed to this Privacy Policy.
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;
