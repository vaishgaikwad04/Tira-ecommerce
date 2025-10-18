import React from 'react';

const Success = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
        <svg
          className="mx-auto mb-4 h-16 w-16 text-green-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <h1 className="text-3xl font-medium text-black mb-2">Payment Successful!</h1>
        <p className="text-gray-700 mb-6">
          Thank you for your purchase. Your payment has been processed successfully.
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

export default Success;
