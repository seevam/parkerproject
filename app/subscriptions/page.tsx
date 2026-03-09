export default function SubscriptionsPage() {
  const plans = [
    {
      name: 'Pass',
      price: 49,
      features: [
        'Priority customer support',
        'Early access to new products',
        '5% discount on all purchases',
        'Free standard shipping',
        'Monthly exclusive gadget showcase',
      ],
      color: 'blue',
    },
    {
      name: 'Plus',
      price: 79,
      features: [
        'All Pass benefits',
        'Priority customer support (24/7)',
        '10% discount on all purchases',
        'Free express shipping',
        'Exclusive custom 3D print designs',
        'Monthly tech webinar access',
        'Extended return window (60 days)',
      ],
      color: 'purple',
      popular: true,
    },
    {
      name: 'Premium',
      price: 99,
      features: [
        'All Plus benefits',
        'VIP customer support',
        '15% discount on all purchases',
        'Free priority shipping (1-2 days)',
        'Unlimited custom 3D print consultations',
        'Early beta access to new features',
        'Quarterly premium gadget box',
        'Lifetime extended warranty on purchases',
      ],
      color: 'pink',
    },
  ];

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 text-white">Choose Your Plan</h1>
          <p className="text-xl text-gray-300">
            Unlock premium benefits and take your Levelling Labs experience to the next level
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-gray-900 rounded-2xl shadow-xl overflow-hidden transform transition hover:scale-105 border border-gray-800 ${
                plan.popular ? 'ring-4 ring-blue-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center py-2 font-semibold">
                  MOST POPULAR
                </div>
              )}
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-2 text-white">{plan.name}</h2>
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-300">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg
                        className="w-6 h-6 text-blue-400 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition"
                >
                  Subscribe to {plan.name}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Level-based Trial Info */}
        <div className="bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-800">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Unlock Free Trials by Leveling Up!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-6 rounded-lg border border-blue-700">
              <h3 className="text-xl font-bold mb-2 text-blue-200">Level 5 Reward</h3>
              <p className="text-blue-100">
                Unlock a <strong>7-day free trial</strong> of any subscription tier!
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-6 rounded-lg border border-blue-700">
              <h3 className="text-xl font-bold mb-2 text-blue-200">Level 10 Reward</h3>
              <p className="text-blue-100">
                Unlock a <strong>14-day free trial</strong> of Premium subscription!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
