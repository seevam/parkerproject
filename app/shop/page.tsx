'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/components/CartContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string | null;
  stock: number;
  isCustomizable: boolean;
  customizationPrice: number;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.products);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black py-12 flex items-center justify-center">
        <p className="text-white text-xl">Loading products...</p>
      </div>
    );
  }

  const gadgets = products.filter((p) => p.category === 'gadget');
  const premadeAccessories = products.filter((p) => p.category === 'accessory-premade');
  const customAccessories = products.filter((p) => p.category === 'accessory-custom');

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-white">Shop</h1>
        <p className="text-lg text-gray-300 mb-12">
          Browse our selection of gadgets and accessories. Earn XP with every purchase!
        </p>

        {/* Gadgets Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-white">Gadgets</h2>
          {gadgets.length === 0 ? (
            <p className="text-gray-400">No gadgets available yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {gadgets.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Pre-made Accessories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-white">Pre-made Accessories</h2>
          {premadeAccessories.length === 0 ? (
            <p className="text-gray-400">No pre-made accessories available yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {premadeAccessories.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Custom Accessories */}
        <section>
          <h2 className="text-3xl font-bold mb-6 text-white">Custom Accessories</h2>
          {customAccessories.length === 0 ? (
            <p className="text-gray-400">No custom accessories available yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {customAccessories.map((product) => (
                <ProductCard key={product.id} product={product} isCustom />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function ProductCard({ product, isCustom = false }: { product: Product; isCustom?: boolean }) {
  const { addToCart } = useCart();
  const [customDetails, setCustomDetails] = useState('');
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (isCustom && product.isCustomizable) {
      setShowCustomModal(true);
    } else {
      addToCart({
        id: `${product.id}-${Date.now()}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl || undefined,
        isCustomized: false,
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const handleCustomAdd = () => {
    const finalPrice = product.price + (product.customizationPrice || 0);
    addToCart({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      price: finalPrice,
      imageUrl: product.imageUrl || undefined,
      isCustomized: true,
      customizationDetails: customDetails,
    });
    setShowCustomModal(false);
    setCustomDetails('');
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <div className="bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition border border-gray-800">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center">
            <span className="text-white text-lg font-semibold">{product.name}</span>
          </div>
        )}
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 text-white">{product.name}</h3>
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-blue-400">
              ${product.price.toFixed(2)}
              {isCustom && product.customizationPrice > 0 && (
                <span className="text-sm text-gray-400"> +${product.customizationPrice.toFixed(2)}</span>
              )}
            </span>
            {product.stock > 0 ? (
              <span className="text-sm text-green-400">In Stock</span>
            ) : (
              <span className="text-sm text-red-400">Out of Stock</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-700 disabled:cursor-not-allowed"
            disabled={product.stock === 0 || added}
          >
            {added ? 'Added!' : isCustom ? 'Customize & Add to Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Customization Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">{product.name}</h3>
            <p className="text-gray-600 mb-4">Add your customization details:</p>
            <textarea
              value={customDetails}
              onChange={(e) => setCustomDetails(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
              rows={4}
              placeholder="Enter your customization details..."
            />
            <p className="text-sm text-gray-600 mb-4">
              Total: ${(product.price + product.customizationPrice).toFixed(2)}
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleCustomAdd}
                disabled={!customDetails.trim()}
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  setShowCustomModal(false);
                  setCustomDetails('');
                }}
                className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
