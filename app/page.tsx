import Link from 'next/link';
import { FaRocket, FaStar, FaCube, FaTrophy, FaUserShield } from 'react-icons/fa';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to Levelling Labs</h1>
            <p className="text-xl mb-8 text-blue-100">
              Your Ultimate Destination for Gadgets & Custom 3D Printed Accessories
            </p>
            <p className="text-lg mb-10 text-blue-50 max-w-3xl mx-auto">
              Discover cutting-edge gadgets and personalize them with our premium 3D printed
              accessories. Earn XP with every purchase and unlock exclusive benefits as you level up!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Start Shopping
              </Link>
              <Link
                href="/subscriptions"
                className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
              >
                View Subscriptions
              </Link>
              <Link
                href="/admin"
                className="bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-800 transition flex items-center gap-2 justify-center"
              >
                <FaUserShield />
                Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Why Choose Levelling Labs?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg shadow-md text-center border border-gray-800">
              <div className="flex justify-center mb-4">
                <FaRocket className="text-blue-400" size={48} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Latest Gadgets</h3>
              <p className="text-gray-300">
                Curated selection of the newest and most innovative tech products
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg shadow-md text-center border border-gray-800">
              <div className="flex justify-center mb-4">
                <FaCube className="text-blue-400" size={48} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Custom 3D Prints</h3>
              <p className="text-gray-300">
                Personalized accessories designed and printed just for you
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg shadow-md text-center border border-gray-800">
              <div className="flex justify-center mb-4">
                <FaTrophy className="text-blue-400" size={48} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">XP Rewards</h3>
              <p className="text-gray-300">
                Earn XP with every purchase and level up for exclusive benefits
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg shadow-md text-center border border-gray-800">
              <div className="flex justify-center mb-4">
                <FaStar className="text-blue-400" size={48} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Premium Passes</h3>
              <p className="text-gray-300">
                Unlock premium features with our Pass, Plus, and Premium subscriptions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">About Us</h2>
            <div className="prose lg:prose-xl mx-auto text-gray-300">
              <p className="text-lg mb-4">
                At Levelling Labs, we're passionate about bringing you the latest gadgets combined
                with the power of custom 3D printing technology. Our mission is to provide tech
                enthusiasts with high-quality products and personalized accessories that enhance
                their gadget experience.
              </p>
              <p className="text-lg mb-4">
                What makes us unique is our innovative XP system. Every purchase you make earns you
                experience points, helping you level up through 10 progressive tiers. As you advance,
                you unlock better shipping speeds, exclusive discounts, and trial access to our
                premium subscription services.
              </p>
              <p className="text-lg mb-4">
                Whether you're looking for the latest tech, custom accessories for your devices, or
                want to explore our 3D printing capabilities, Levelling Labs is your one-stop
                destination for all things gadgets and innovation.
              </p>
              <p className="text-lg">
                <strong className="text-blue-400">Contact us:</strong> <span className="text-white">levellinglabs@gmail.com</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Level Benefits Preview */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Level Up & Unlock Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg shadow-md border border-gray-800">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Level 3+</h3>
              <ul className="space-y-2 text-gray-300">
                <li>✓ Faster shipping (3-5 days)</li>
                <li>✓ 5% discount coupon</li>
              </ul>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg shadow-md border border-gray-800">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Level 7+</h3>
              <ul className="space-y-2 text-gray-300">
                <li>✓ Express shipping (2-3 days)</li>
                <li>✓ 10% discount coupon</li>
              </ul>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg shadow-md border border-gray-800">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Level 10</h3>
              <ul className="space-y-2 text-gray-300">
                <li>✓ Priority shipping (1-2 days)</li>
                <li>✓ 15% discount coupon</li>
                <li>✓ 14-day premium trial</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
