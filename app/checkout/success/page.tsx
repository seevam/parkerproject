'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/components/CartContext';
import Link from 'next/link';

function SuccessPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCart();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const session = searchParams.get('session_id');
    if (session) {
      setSessionId(session);
      // Clear the cart after successful payment
      clearCart();
    }
  }, [searchParams, clearCart]);

  return (
    <div className="min-h-screen bg-black py-12 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-lg p-8 shadow-xl">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Thank you for your order. We've received your payment and will process your order shortly.
          </p>

          {sessionId && (
            <div className="bg-gray-50 rounded p-4 mb-6">
              <p className="text-sm text-gray-600">
                Order Reference: <span className="font-mono text-gray-900">{sessionId.slice(0, 20)}...</span>
              </p>
            </div>
          )}

          <div className="space-y-3">
            <p className="text-gray-600">
              You will receive an email confirmation with your order details and tracking information.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
              <Link
                href="/shop"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Continue Shopping
              </Link>
              <Link
                href="/"
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
              >
                Back to Home
              </Link>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold mb-3">What's Next?</h2>
            <ul className="text-left text-sm text-gray-600 space-y-2 max-w-md mx-auto">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                You'll receive an email confirmation shortly
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                Your order will be processed within 1-2 business days
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                Track your shipment with the link in your email
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  );
}
