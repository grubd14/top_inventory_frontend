import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getItemById, updateItem, getCategories } from "/src/api/api";

export const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
    category_id: "",
  });
  /** Preserved from the server so updates do not clear price in the DB. */
  const priceRef = useRef(0);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Load existing item data and categories in parallel
  useEffect(() => {
    async function loadData() {
      try {
        if (!id) throw new Error("Missing item ID");

        const itemId = Number.parseInt(id, 10);
        if (!Number.isFinite(itemId)) throw new Error("Invalid item ID");

        const [itemData, categoryData] = await Promise.all([
          getItemById(itemId),
          getCategories(),
        ]);

        // Backend returns an array for item - extract first element
        const item = Array.isArray(itemData) ? itemData[0] : itemData;

        if (!item) throw new Error("Item not found");

        priceRef.current =
          item.price !== undefined && item.price !== null
            ? Number(item.price)
            : 0;
        setFormData({
          name: item.name ?? "",
          description: item.description ?? "",
          quantity: item.quantity ?? "",
          category_id: item.category_id ?? "",
        });

        setCategories(Array.isArray(categoryData) ? categoryData : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load item");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      setError("Item name is required");
      return;
    }
    if (!formData.quantity || Number(formData.quantity) < 0) {
      setError("A valid quantity is required");
      return;
    }
    if (!formData.category_id) {
      setError("Please select a category");
      return;
    }

    setIsSaving(true);

    try {
      await updateItem({
        id: Number.parseInt(id, 10),
        name: formData.name.trim(),
        description: formData.description.trim(),
        quantity: Number.parseInt(formData.quantity, 10),
        price: priceRef.current,
        category_id: Number.parseInt(formData.category_id, 10),
      });

      // Navigate back to the item details page
      navigate(`/item/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update item");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-slate-900">
        <p className="text-lg text-gray-600 dark:text-slate-400">Loading item...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 py-8 dark:bg-slate-900">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg dark:bg-slate-800">
        <div className="p-6">
          <h1 className="text-3xl font-semibold text-center mb-6 dark:text-white">Edit Item</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded dark:bg-red-900/30 dark:border-red-800 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Name */}
            <div>
              <label htmlFor="name" className="block font-medium mb-2 dark:text-slate-300">
                Item Name: <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                placeholder="Enter item name"
                value={formData.name}
                onChange={handleChange}
                disabled={isSaving}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block font-medium mb-2 dark:text-slate-300">
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                placeholder="Enter item description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                disabled={isSaving}
              />
            </div>

            {/* Quantity */}
            <div>
              <label htmlFor="quantity" className="block font-medium mb-2 dark:text-slate-300">
                Quantity: <span className="text-red-500">*</span>
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                min="0"
                className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                placeholder="0"
                value={formData.quantity}
                onChange={handleChange}
                disabled={isSaving}
                required
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category_id" className="block font-medium mb-2 dark:text-slate-300">
                Category: <span className="text-red-500">*</span>
              </label>
              <select
                id="category_id"
                name="category_id"
                className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                value={formData.category_id}
                onChange={handleChange}
                disabled={isSaving}
                required
              >
                <option value="">-- Select a category --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 bg-green-500 text-white px-4 py-2 rounded font-medium hover:bg-green-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
              <Link
                to={`/item/${id}`}
                className="flex-1 bg-gray-500 text-white px-4 py-2 rounded font-medium hover:bg-gray-600 transition text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
