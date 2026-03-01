import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { addItem, getCategories } from "/src/api/api";

export const AddItem = () => {
  const { id: categoryId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
    category_id: categoryId || "",
  });
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    }
    loadCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!formData.name.trim()) {
        throw new Error("Item name is required");
      }
      if (!formData.category_id) {
        throw new Error("Please select a category");
      }
      if (!formData.quantity || formData.quantity < 0) {
        throw new Error("Quantity must be a valid number");
      }

      const itemData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        quantity: parseInt(formData.quantity, 10),
        category_id: parseInt(formData.category_id, 10),
      };

      const response = await addItem(itemData);
      console.log("Item added successfully:", response);

      setSuccess(true);
      // Navigate back to category or home after success
      if (categoryId) {
        navigate(`/category/${categoryId}`);
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add item");
      console.error("Add item error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-auto h-auto mt-4 mb-8">
      <h1 className="text-4xl font-semibold p-6">Add New Item</h1>
      <div className="h-auto w-full max-w-md shadow-2xl">
        <form onSubmit={handleSubmit} className="h-auto w-lg">
          <div className="p-5 space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                Item added successfully!
              </div>
            )}

            {/* Item Name */}
            <div>
              <label htmlFor="itemName" className="block font-medium mb-2">
                Item Name: *
              </label>
              <input
                id="itemName"
                name="name"
                type="text"
                className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter item name"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block font-medium mb-2">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter item description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            {/* Quantity */}
            <div>
              <label htmlFor="quantity" className="block font-medium mb-2">
                Quantity: *
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                min="0"
                value={formData.quantity}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category_id" className="block font-medium mb-2">
                Category: *
              </label>
              <select
                id="category_id"
                name="category_id"
                className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.category_id}
                onChange={handleChange}
                disabled={isLoading}
                required
              >
                <option value="">-- Select a category --</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-green-500 text-white px-4 py-2 rounded font-medium hover:bg-green-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? "Saving..." : "Save Item"}
              </button>
              <Link
                to={categoryId ? `/category/${categoryId}` : "/"}
                className="flex-1 bg-gray-500 text-white px-4 py-2 rounded font-medium hover:bg-gray-600 transition text-center"
              >
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
