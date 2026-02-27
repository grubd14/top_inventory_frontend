import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getCategoriesById, getItemCategoriesById } from "/src/api/api";

// Present the items details referencing the category id
export const CategoryDetails = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCategoryDetails() {
      try {
        if (!id) {
          throw new Error("Missing category ID in URL");
        }

        // Fetch category info
        const categoryData = await getCategoriesById(id);
        setCategory(categoryData);

        // Fetch items for this category
        const itemsData = await getItemCategoriesById(id);
        // itemsData is an array of items
        setItems(Array.isArray(itemsData) ? itemsData : []);
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
            className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition"
            // onClick={handleDelete}
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
          {items && items.length > 0 ? (
            items.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.quantity}</td>
                <td className="py-2 px-4">{item.description}</td>
                <td className="py-2 px-4 flex gap-2">
                  <Link
                    to={`/item/${item.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </Link>
                  <Link
                    to={`/item/${item.id}/edit`}
                    className="text-orange-600 hover:underline"
                  >
                    Edit
                  </Link>
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
