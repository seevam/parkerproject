import { prisma } from '@/lib/prisma';
import Link from 'next/link';

// Helper function to extract YouTube video ID from URL
function getYouTubeId(url: string) {
  if (!url) return null;
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
}

export default async function ReviewsPage() {
  const reviews = await prisma.gadgetReview.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-white">Gadget Reviews</h1>
        <p className="text-lg text-gray-300 mb-12">
          Check out our in-depth reviews of the latest gadgets and tech products
        </p>

        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No reviews available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => {
              const videoId = getYouTubeId(review.videoUrl);

              return (
                <div key={review.id} className="bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition border border-gray-800">
                  {/* Video Preview */}
                  {videoId ? (
                    <div className="relative w-full aspect-video bg-black">
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        className="absolute top-0 left-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={review.title}
                      />
                    </div>
                  ) : review.thumbnail ? (
                    <img
                      src={review.thumbnail}
                      alt={review.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">
                        {review.gadgetName}
                      </span>
                    </div>
                  )}

                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2 text-white">{review.title}</h2>
                    <p className="text-sm text-gray-400 mb-2">{review.gadgetName}</p>
                    {review.rating && (
                      <div className="flex items-center mb-3">
                        <span className="text-yellow-400 font-semibold">
                          {'★'.repeat(Math.round(review.rating))}
                          {'☆'.repeat(5 - Math.round(review.rating))}
                        </span>
                        <span className="ml-2 text-sm text-gray-300">
                          {review.rating.toFixed(1)}
                        </span>
                      </div>
                    )}
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {review.description}
                    </p>
                    {!videoId && (
                      <a
                        href={review.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                      >
                        Watch Review
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
