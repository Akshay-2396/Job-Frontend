
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-gray-800">

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">
        Privacy Policy for Job Portal
      </h1>

      {/* Section 1 */}
      <section className="mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">
          1. Introduction
        </h2>
        <p className="text-sm sm:text-base leading-relaxed">
          This Privacy Policy outlines how we collect, use, and protect your
          information when you visit our job portal website.
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
          <li>To provide and maintain our services</li>
          <li>To notify you about changes to our services</li>
          <li>To allow you to participate in interactive features</li>
          <li>To provide customer support</li>
          <li>To gather analysis to improve our services</li>
          <li>To monitor usage of our services</li>
          <li>To detect, prevent, and fix technical issues</li>
        </ul>
      </section>

      {/* Section 3 */}
      <section className="mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">
          3. Data Security
        </h2>
        <p className="text-sm sm:text-base leading-relaxed">
          We take your data security seriously and apply technical and
          organizational measures to protect your personal information.
        </p>
      </section>

      {/* Section 4 */}
      <section className="mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">
          4. Sharing Your Information
        </h2>
        <p className="text-sm sm:text-base leading-relaxed mb-2">
          We do not sell or rent your personal information. However, we may
          share your information with:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
          <li>Service providers helping us operate the website</li>
          <li>Legal authorities if required by law</li>
        </ul>
      </section>

      {/* Section 5 */}
      <section className="mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">
          5. Your Rights
        </h2>
        <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
          <li>Access your personal information</li>
          <li>Request correction of your personal information</li>
          <li>Request deletion of your personal information</li>
        </ul>
      </section>

      {/* Section 6 */}
      <section className="mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">
          6. Changes to This Privacy Policy
        </h2>
        <p className="text-sm sm:text-base leading-relaxed">
          We may update this Privacy Policy from time to time. Updates will be
          posted on this page.
        </p>
      </section>

      {/* Section 7 */}
      <section>
        <h2 className="text-lg sm:text-xl font-semibold mb-2">
          7. Contact Us
        </h2>
        <p className="text-sm sm:text-base">
          If you have any questions, please contact us at:
          <span className="font-medium text-[#6A38C2]"> your@email.com</span>
        </p>
      </section>

    </div>
  );
};

export default PrivacyPolicy;