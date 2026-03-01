import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getItemById, deleteItem } from "/src/api/api";

export const ItemsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadItemDetails() {
      try {
        if (!id) throw new Error("ID is missing");

        const itemId = Number.parseInt(id, 10);
        if (!Number.isFinite(itemId)) throw new Error("ID is not valid");

        const data = await getItemById(itemId);

        // Backend returns an array, extract the first element
        if (Array.isArray(data) && data.length > 0) {
          setItem(data[0]);
        } else if (data && typeof data === "object" && data.id) {
          setItem(data);
        } else {
          throw new Error("Item not found");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load item details",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadItemDetails();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${item.name}"?`))
      return;

    try {
      await deleteItem(item.id);
      // Navigate back to the category this item belonged to
      navigate(item.category_id ? `/category/${item.category_id}` : "/");
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

  if (!item) {
    return (
      <div className="bg-gray-50 min-h-screen p-8">
        <div className="text-gray-700 text-lg mb-4">Item not found.</div>
        <Link to="/" className="text-blue-600 underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="font-bold text-4xl pt-3 w-full text-center mb-6">
          Item Details
        </h1>

        <div className="space-y-3 mb-8">
          <p className="text-lg">
            <strong>Name:</strong> {item.name}
          </p>
          <p className="text-lg">
            <strong>Quantity:</strong> {item.quantity}
          </p>
          <p className="text-lg">
            <strong>Description:</strong> {item.description}
          </p>
          {item.price !== undefined && (
            <p className="text-lg">
              <strong>Price:</strong> ${item.price}
            </p>
          )}
        </div>

        <div className="flex gap-3 flex-wrap">
          <Link
            to={item.category_id ? `/category/${item.category_id}` : "/"}
            className="bg-gray-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-600 transition"
          >
            Back
          </Link>
          <Link
            to={`/item/${item.id}/edit`}
            className="bg-green-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-green-600 transition"
          >
            Edit Item
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-red-600 transition"
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
};
