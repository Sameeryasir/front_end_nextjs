import React from "react";
import { User } from "lucide-react"; // Import the User icon from Lucide React

const starCount = 5; // Maximum number of stars

// Helper function to render stars based on score
const renderStars = (score) => {
  const fullStars = Math.floor(score);
  const halfStar = score % 1 >= 0.5 ? 1 : 0;
  const emptyStars = starCount - fullStars - halfStar;

  return (
    <>
      {Array(fullStars)
        .fill("★")
        .map((star, index) => (
          <span key={`full-${index}`} className="text-yellow-400 text-xl">
            {star}
          </span>
        ))}
      {halfStar === 1 && <span className="text-yellow-400 text-xl">☆</span>}
      {Array(emptyStars)
        .fill("☆")
        .map((star, index) => (
          <span key={`empty-${index}`} className="text-gray-300 text-xl">
            {star}
          </span>
        ))}
    </>
  );
};

export default function Ratings({ ratings }) {
  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Comment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ratings.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center px-6 py-4 text-sm text-gray-500"
                >
                  No Ratings Available
                </td>
              </tr>
            ) : (
              ratings.map((rating, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-center">
                    <User className="w-10 h-10 text-gray-400" />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {rating.Comment}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(rating.RatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {renderStars(rating.Score)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
