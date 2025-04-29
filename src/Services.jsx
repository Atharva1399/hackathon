import React from "react";

export default function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 font-sans">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-indigo-700 drop-shadow-lg mb-6">
          Our Services
        </h1>
        <ul className="list-disc list-inside text-gray-600 text-lg space-y-4">
          <li>
            <span className="font-semibold">Property Search by ID:</span>{" "}
            Easily find properties using their unique property ID.
          </li>
          <li>
            <span className="font-semibold">Owner-Based Search:</span> Look up
            properties by owner details.
          </li>
          <li>
            <span className="font-semibold">Address Search:</span> Search for
            properties using their physical address.
          </li>
          <li>
            <span className="font-semibold">Location-Based Search:</span>{" "}
            Utilize Google Maps to search properties by selecting a location on
            the map.
          </li>
          <li>
            <span className="font-semibold">Advanced Filters:</span> Narrow
            down your search with filters like property type and registration
            dates.
          </li>
        </ul>
      </div>
    </div>
  );
}