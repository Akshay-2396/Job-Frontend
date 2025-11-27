import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">

        {/* Left Section */}
        <div>
          <p className="text-sm text-gray-600">
            © 2025 Job Portal. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Powered by <span className="font-semibold text-blue-600">AKSHAY KUMAR</span>
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-sm">
          <Link
            to="/PrivacyPolicy"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Privacy Policy
          </Link>
          <span className="hidden sm:block text-gray-400">|</span>
          <Link
            to="/TermsofService"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;