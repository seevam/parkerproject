import { prisma } from '@/lib/prisma';

export default async function PrintProjectsPage() {
  const projects = await prisma.printProject.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-white">3D Print Models & Customization</h1>
        <p className="text-lg text-gray-300 mb-12">
          Browse our collection of 3D printable models and custom accessories for your gadgets
        </p>

        <div className="mb-8">
          <div className="bg-gray-900 border border-blue-600 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-white">Custom 3D Printing</h2>
            <p className="text-gray-300 mb-4">
              Want something unique? We offer custom 3D printing services! Send us your design
              or work with our team to create the perfect accessory for your gadget.
            </p>
            <a
              href="mailto:levellinglabs@gmail.com?subject=Custom 3D Print Request"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Request Custom Print
            </a>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No projects available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition border border-gray-800">
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">
                      {project.title}
                    </span>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-white">{project.title}</h2>
                    {project.isPremade && (
                      <span className="bg-green-900 text-green-300 text-xs font-semibold px-2 py-1 rounded border border-green-700">
                        Pre-made
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{project.category}</p>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  {project.price && (
                    <p className="text-2xl font-bold text-blue-400 mb-4">
                      ${project.price.toFixed(2)}
                    </p>
                  )}
                  <div className="flex gap-2">
                    {project.modelFileUrl && (
                      <a
                        href={project.modelFileUrl}
                        className="flex-1 text-center bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
                      >
                        Download Model
                      </a>
                    )}
                    {project.isPremade && project.price && (
                      <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
