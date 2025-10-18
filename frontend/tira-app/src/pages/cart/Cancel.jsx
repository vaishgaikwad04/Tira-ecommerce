import React from 'react';

const Cancel = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
        <svg
          className="mx-auto mb-4 h-16 w-16 text-red-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <h1 className="text-3xl font-medium text-black mb-2">Payment Cancelled</h1>
        <p className="text-gray-700 mb-6">
          Your payment was not completed. You can try again or continue browsing.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="underline underline-offset-4"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Cancel;
