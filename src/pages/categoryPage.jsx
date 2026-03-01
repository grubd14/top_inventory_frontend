import { getCategories, deleteCategory } from "../api/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load categories",
        );
      } finally {
        setIsLoading(false);
      }
    }
    loadCategories();
  }, []);

  const handleDelete = async (category) => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${category.name}"? This cannot be undone.`,
      )
    )
      return;

    try {
      await deleteCategory(category.id);
      // Remove from local state without refetching
      setCategories((prev) => prev.filter((c) => c.id !== category.id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete category",
      );
    }
  };

  if (isLoading) {
    return (
      <div className="p-10 min-h-screen bg-gray-50">
        <div className="text-center text-lg text-gray-600">
          Loading categories...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error: {error}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800 border-b-4 border-blue-500 inline-block pb-2">
            Categories
          </h2>
        </div>

        {/* Add New Category Button */}
        <div className="mb-6">
          <Link to="/category/create">
            <button className="bg-emerald-500 text-white px-6 py-2 rounded font-medium hover:bg-emerald-600 transition">
              + Add New Category
            </button>
          </Link>
        </div>

        {/* Table */}
        {categories.length > 0 ? (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b bg-gray-100">
                  <th className="p-4 font-semibold text-gray-700">Name</th>
                  <th className="p-4 font-semibold text-gray-700">
                    Description
                  </th>
                  <th className="p-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr
                    key={category.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4 font-medium text-gray-900">
                      {category.name}
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {category.description || "No description"}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2 flex-wrap">
                        <Link to={`/category/${category.id}`}>
                          <button className="bg-sky-500 text-white text-xs py-2 px-3 rounded hover:bg-sky-600 transition">
                            Details
                          </button>
                        </Link>
                        <Link to={`/category/${category.id}/update`}>
                          <button className="bg-amber-500 text-white text-xs py-2 px-3 rounded hover:bg-amber-600 transition">
                            Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(category)}
                          className="bg-red-500 text-white text-xs py-2 px-3 rounded hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                        <Link to={`/category/${category.id}/new-item`}>
                          <button className="bg-green-500 text-white text-xs py-2 px-3 rounded hover:bg-green-600 transition">
                            Add Item
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-8 text-center">
            <p className="text-gray-500 text-lg mb-4">
              No categories found. Create one to get started!
            </p>
            <Link to="/category/create">
              <button className="bg-emerald-500 text-white px-6 py-2 rounded font-medium hover:bg-emerald-600 transition">
                Create First Category
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
