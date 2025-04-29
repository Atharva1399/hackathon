import React from "react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 font-sans">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-indigo-700 drop-shadow-lg mb-6">
          Contact Us
        </h1>
        <p className="text-gray-600 text-lg mb-4">
          Have questions or need assistance? Reach out to us!
        </p>
        <div className="space-y-4 text-gray-600 text-lg">
          <p>
            <span className="font-semibold">Email:</span>{" "}
            support@propertysearchportal.com
          </p>
          <p>
            <span className="font-semibold">Phone:</span> +1 (555) 123-4567
          </p>
          <p>
            <span className="font-semibold">Address:</span> 123 Property Lane,
            Suite 456, Sydney, NSW 2000, Australia
          </p>
        </div>
      </div>
    </div>
  );
}