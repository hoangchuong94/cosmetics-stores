import React from 'react';

export default function Search() {
  return (
    <div className="mx-2 min-w-20 md:min-w-80">
      <form action="">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            className="w-full rounded-full border border-gray-300 px-4 py-1 shadow-sm focus:border-transparent focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-200 md:py-2"
            placeholder="Search..."
          />
          <button className="absolute right-0 top-0 mr-2 mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-search h-4 w-4 text-gray-500 md:h-6 md:w-6"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
