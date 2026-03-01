import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getCategoriesById, deleteCategory, deleteItem } from "/src/api/api";

export const CategoryDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCategoryDetails() {
      try {
        if (!id) throw new Error("Missing category ID in URL");

        const categoryId = Number.parseInt(id, 10);
        if (!Number.isFinite(categoryId))
          throw new Error("Invalid category ID");

        const data = await getCategoriesById(categoryId);

        if (data.category && Array.isArray(data.items)) {
          setCategory({ ...data.category, items: data.items });
        } else if (data.id && Array.isArray(data.items)) {
          setCategory(data);
        } else {
          throw new Error("Unexpected response structure from server");
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load category details",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadCategoryDetails();
  }, [id]);

  const handleDeleteCategory = async () => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${category.name}"? This cannot be undone.`,
      )
    ) {
      return;
    }

    try {
      await deleteCategory(category.id);
      navigate("/");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete category",
      );
    }
  };

  const handleDeleteItem = async (item) => {
    if (!window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      return;
    }

    try {
      await deleteItem(item.id);
      // Remove the deleted item from local state without refetching
      setCategory((prev) => ({
        ...prev,
        items: prev.items.filter((i) => i.id !== item.id),
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete item");
    }
  };

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen p-8">
        <div className="text-center text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen p-8">
        <div className="text-red-600 text-lg mb-4">Error: {error}</div>
        <Link to="/" className="text-blue-600 underline">
          Back to Home
        </Link>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="bg-gray-50 min-h-screen p-8">
        <div className="text-gray-700 text-lg mb-4">Category not found.</div>
        <Link to="/" className="text-blue-600 underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="flex flex-col items-start">
        <h1 className="text-4xl font-bold text-center w-full mb-6">
          {category.name} Details
        </h1>
        <p className="text-lg font-semibold mb-4">
          <span className="font-bold">Description:</span> {category.description}
        </p>
        <div className="flex gap-4 mb-8 flex-wrap">
          <Link
            to="/"
            className="bg-gray-400 text-white px-6 py-3 rounded-md hover:bg-gray-500 transition"
          >
            Back to Home
          </Link>
          <Link
            to={`/category/${category.id}/update`}
            className="bg-orange-400 text-white px-6 py-3 rounded-md hover:bg-orange-500 transition"
          >
            Update Category
          </Link>
          <button
            onClick={handleDeleteCategory}
            className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition"
          >
            Delete Category
          </button>
          <Link
            to={`/category/${category.id}/new-item`}
            className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition"
          >
            Add New Item
          </Link>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-4">Items in this Category</h2>
      <table className="w-full bg-white rounded-md shadow-sm">
        <thead>
          <tr className="border-b">
            <th className="py-3 px-4 text-left font-semibold text-gray-700">
              Name
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">
              Quantity
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">
              Description
            </th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {category.items && category.items.length > 0 ? (
            category.items.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.quantity}</td>
                <td className="py-2 px-4">{item.description}</td>
                <td className="py-2 px-4">
                  <div className="flex gap-2">
                    <Link
                      to={`/item/${item.id}`}
                      className="bg-sky-500 text-white text-xs py-1 px-3 rounded hover:bg-sky-600 transition"
                    >
                      View
                    </Link>
                    <Link
                      to={`/item/${item.id}/edit`}
                      className="bg-orange-400 text-white text-xs py-1 px-3 rounded hover:bg-orange-500 transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteItem(item)}
                      className="bg-red-500 text-white text-xs py-1 px-3 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-4 px-4 text-center text-gray-500">
                No items in this category.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
