'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaUser, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { useCart } from '@/components/CartContext';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold">Levelling Labs</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-blue-200 transition">
              Home
            </Link>
            <Link href="/reviews" className="hover:text-blue-200 transition">
              Gadget Reviews
            </Link>
            <Link href="/3d-prints" className="hover:text-blue-200 transition">
              3D Print Models
            </Link>
            <Link href="/shop" className="hover:text-blue-200 transition">
              Shop
            </Link>
            <Link href="/subscriptions" className="hover:text-blue-200 transition">
              Subscriptions
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/cart" className="hover:text-blue-200 transition relative">
              <FaShoppingCart size={20} />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            <Link
              href="/login"
              className="flex items-center space-x-1 hover:text-blue-200 transition"
            >
              <FaUser size={18} />
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <Link
              href="/"
              className="block hover:text-blue-200 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/reviews"
              className="block hover:text-blue-200 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Gadget Reviews
            </Link>
            <Link
              href="/3d-prints"
              className="block hover:text-blue-200 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              3D Print Models
            </Link>
            <Link
              href="/shop"
              className="block hover:text-blue-200 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/subscriptions"
              className="block hover:text-blue-200 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Subscriptions
            </Link>
            <Link
              href="/cart"
              className="block hover:text-blue-200 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Cart {getTotalItems() > 0 && `(${getTotalItems()})`}
            </Link>
            <Link
              href="/login"
              className="block hover:text-blue-200 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
