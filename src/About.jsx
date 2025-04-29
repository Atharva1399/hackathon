import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 font-sans flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-indigo-700 drop-shadow-lg mb-2">
            About Us
          </h1>
          <p className="text-gray-600 text-lg">
            Learn more about the Unified Property Search Portal
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">
            Welcome to the Unified Property Search Portal! We are dedicated to simplifying the process of finding properties by providing a comprehensive and user-friendly platform. Our mission is to empower users—whether homeowners, real estate agents, or property enthusiasts—with advanced search tools to locate properties efficiently.
          </p>
          <p className="text-gray-600 text-lg mb-4">
            Launched in 2025, our platform integrates cutting-edge technology, including Google Maps for location-based searches, to offer a seamless experience. We support searches by property ID, owner details, address, and more, with customizable filters to meet diverse needs.
          </p>
          <p className="text-gray-600 text-lg">
            Our team is committed to continuous improvement and customer satisfaction. If you have any questions or feedback, feel free to reach out through our Contact page.
          </p>
        </div>
      </div>
    </div>
  );
}
