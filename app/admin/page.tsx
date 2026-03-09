'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'LevellinglabsY7') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter admin password"
              />
            </div>
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">-</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Total Orders</h3>
            <p className="text-3xl font-bold text-green-600">-</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Total Products</h3>
            <p className="text-3xl font-bold text-purple-600">-</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Add Gadget Review */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Add Gadget Review</h2>
            <ReviewForm />
          </div>

          {/* Add 3D Print Project */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Add 3D Print Project</h2>
            <PrintProjectForm />
          </div>

          {/* Add Product */}
          <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Add Product</h2>
            <ProductForm />
          </div>
        </div>

        {/* Manage Reviews */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Manage Reviews</h2>
          <ReviewList />
        </div>
      </div>
    </div>
  );
}

function ReviewForm() {
  const [formData, setFormData] = useState({
    title: '',
    gadgetName: '',
    description: '',
    videoUrl: '',
    thumbnail: '',
    rating: '',
  });
  const [message, setMessage] = useState('');

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const videoId = getYouTubeId(formData.videoUrl);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setMessage('Review added successfully!');
        setFormData({ title: '', gadgetName: '', description: '', videoUrl: '', thumbnail: '', rating: '' });
      } else {
        setMessage('Failed to add review');
      }
    } catch (error) {
      setMessage('Error adding review');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Review Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full border rounded px-3 py-2"
        required
      />
      <input
        type="text"
        placeholder="Gadget Name"
        value={formData.gadgetName}
        onChange={(e) => setFormData({ ...formData, gadgetName: e.target.value })}
        className="w-full border rounded px-3 py-2"
        required
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full border rounded px-3 py-2"
        rows={3}
        required
      />
      <input
        type="url"
        placeholder="Video URL (YouTube, etc.)"
        value={formData.videoUrl}
        onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
        className="w-full border rounded px-3 py-2"
        required
      />
      {videoId && (
        <div className="w-full">
          <p className="text-sm text-gray-600 mb-2">Video Preview:</p>
          <div className="relative w-48 h-28 rounded overflow-hidden border-2 border-gray-300">
            <img
              src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
              alt="Video thumbnail"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 pointer-events-none">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      <input
        type="url"
        placeholder="Thumbnail URL (optional)"
        value={formData.thumbnail}
        onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
        className="w-full border rounded px-3 py-2"
      />
      <input
        type="number"
        step="0.1"
        min="0"
        max="5"
        placeholder="Rating (0-5)"
        value={formData.rating}
        onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
        className="w-full border rounded px-3 py-2"
      />
      {message && <p className="text-sm text-green-600">{message}</p>}
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Add Review
      </button>
    </form>
  );
}

function PrintProjectForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    imageUrl: '',
    modelFileUrl: '',
    isPremade: false,
    price: '',
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setMessage('Project added successfully!');
        setFormData({ title: '', description: '', category: '', imageUrl: '', modelFileUrl: '', isPremade: false, price: '' });
      } else {
        setMessage('Failed to add project');
      }
    } catch (error) {
      setMessage('Error adding project');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Project Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full border rounded px-3 py-2"
        required
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full border rounded px-3 py-2"
        rows={3}
        required
      />
      <input
        type="text"
        placeholder="Category"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        className="w-full border rounded px-3 py-2"
        required
      />
      <input
        type="url"
        placeholder="Image URL (optional)"
        value={formData.imageUrl}
        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
        className="w-full border rounded px-3 py-2"
      />
      <input
        type="url"
        placeholder="Model File URL (optional)"
        value={formData.modelFileUrl}
        onChange={(e) => setFormData({ ...formData, modelFileUrl: e.target.value })}
        className="w-full border rounded px-3 py-2"
      />
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={formData.isPremade}
          onChange={(e) => setFormData({ ...formData, isPremade: e.target.checked })}
          className="mr-2"
        />
        Pre-made (available for purchase)
      </label>
      {formData.isPremade && (
        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="w-full border rounded px-3 py-2"
          required={formData.isPremade}
        />
      )}
      {message && <p className="text-sm text-green-600">{message}</p>}
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Add Project
      </button>
    </form>
  );
}

function ProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'gadget',
    imageUrl: '',
    stock: '',
    isCustomizable: false,
    customizationPrice: '',
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setMessage('Product added successfully!');
        setFormData({
          name: '',
          description: '',
          price: '',
          category: 'gadget',
          imageUrl: '',
          stock: '',
          isCustomizable: false,
          customizationPrice: '',
        });
      } else {
        setMessage('Failed to add product');
      }
    } catch (error) {
      setMessage('Error adding product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Product Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="border rounded px-3 py-2"
        required
      />
      <input
        type="number"
        step="0.01"
        placeholder="Price"
        value={formData.price}
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        className="border rounded px-3 py-2"
        required
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="border rounded px-3 py-2 md:col-span-2"
        rows={3}
        required
      />
      <select
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        className="border rounded px-3 py-2"
        required
      >
        <option value="gadget">Gadget</option>
        <option value="accessory-premade">Accessory (Pre-made)</option>
        <option value="accessory-custom">Accessory (Custom)</option>
      </select>
      <input
        type="number"
        placeholder="Stock"
        value={formData.stock}
        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
        className="border rounded px-3 py-2"
        required
      />
      <input
        type="url"
        placeholder="Image URL (optional)"
        value={formData.imageUrl}
        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
        className="border rounded px-3 py-2 md:col-span-2"
      />
      <label className="flex items-center md:col-span-2">
        <input
          type="checkbox"
          checked={formData.isCustomizable}
          onChange={(e) => setFormData({ ...formData, isCustomizable: e.target.checked })}
          className="mr-2"
        />
        Customizable
      </label>
      {formData.isCustomizable && (
        <input
          type="number"
          step="0.01"
          placeholder="Customization Price (additional)"
          value={formData.customizationPrice}
          onChange={(e) => setFormData({ ...formData, customizationPrice: e.target.value })}
          className="border rounded px-3 py-2 md:col-span-2"
          required={formData.isCustomizable}
        />
      )}
      {message && <p className="text-sm text-green-600 md:col-span-2">{message}</p>}
      <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 md:col-span-2">
        Add Product
      </button>
    </form>
  );
}

interface Review {
  id: string;
  title: string;
  gadgetName: string;
  description: string;
  videoUrl: string;
  thumbnail: string | null;
  rating: number | null;
  createdAt: string;
}

function ReviewList() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [message, setMessage] = useState('');

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/admin/reviews');
      const data = await response.json();
      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      const response = await fetch(`/api/admin/reviews/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessage('Review deleted successfully!');
        fetchReviews();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to delete review');
      }
    } catch (error) {
      setMessage('Error deleting review');
    }
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
  };

  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  if (loading) {
    return <p className="text-gray-500">Loading reviews...</p>;
  }

  if (editingReview) {
    return <EditReviewForm review={editingReview} onCancel={handleCancelEdit} onSuccess={() => { fetchReviews(); setEditingReview(null); }} />;
  }

  return (
    <div className="space-y-4">
      {message && <p className="text-sm text-green-600 mb-4">{message}</p>}
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {reviews.map((review) => {
            const videoId = getYouTubeId(review.videoUrl);
            return (
              <div key={review.id} className="border rounded-lg p-4 flex gap-4">
                {videoId && (
                  <div className="relative w-32 h-20 flex-shrink-0 rounded overflow-hidden border border-gray-300">
                    <img
                      src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                      alt={review.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{review.title}</h3>
                  <p className="text-sm text-gray-600">Gadget: {review.gadgetName}</p>
                  <p className="text-sm text-gray-500 line-clamp-2">{review.description}</p>
                  {review.rating && <p className="text-sm text-yellow-600">Rating: {review.rating}/5</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleEdit(review)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function EditReviewForm({ review, onCancel, onSuccess }: { review: Review; onCancel: () => void; onSuccess: () => void }) {
  const [formData, setFormData] = useState({
    title: review.title,
    gadgetName: review.gadgetName,
    description: review.description,
    videoUrl: review.videoUrl,
    thumbnail: review.thumbnail || '',
    rating: review.rating?.toString() || '',
  });
  const [message, setMessage] = useState('');

  const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const videoId = getYouTubeId(formData.videoUrl);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/admin/reviews/${review.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setMessage('Review updated successfully!');
        setTimeout(() => {
          onSuccess();
        }, 1000);
      } else {
        setMessage('Failed to update review');
      }
    } catch (error) {
      setMessage('Error updating review');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Edit Review</h3>
        <button
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to List
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Review Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full border rounded px-3 py-2"
          required
        />
        <input
          type="text"
          placeholder="Gadget Name"
          value={formData.gadgetName}
          onChange={(e) => setFormData({ ...formData, gadgetName: e.target.value })}
          className="w-full border rounded px-3 py-2"
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full border rounded px-3 py-2"
          rows={3}
          required
        />
        <input
          type="url"
          placeholder="Video URL (YouTube, etc.)"
          value={formData.videoUrl}
          onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
          className="w-full border rounded px-3 py-2"
          required
        />
        {videoId && (
          <div className="w-full">
            <p className="text-sm text-gray-600 mb-2">Video Preview:</p>
            <div className="relative w-48 h-28 rounded overflow-hidden border-2 border-gray-300">
              <img
                src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 pointer-events-none">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <input
          type="url"
          placeholder="Thumbnail URL (optional)"
          value={formData.thumbnail}
          onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="number"
          step="0.1"
          min="0"
          max="5"
          placeholder="Rating (0-5)"
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
          className="w-full border rounded px-3 py-2"
        />
        {message && <p className="text-sm text-green-600">{message}</p>}
        <div className="flex gap-2">
          <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Update Review
          </button>
          <button type="button" onClick={onCancel} className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
