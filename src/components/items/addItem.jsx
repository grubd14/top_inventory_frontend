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
    category_id: categoryId || "",
  });
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(Array.isArray(data) ? data : []);
      } catch {
        setCategories([]);
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
      const qty = Number.parseInt(formData.quantity, 10);
      if (!Number.isFinite(qty) || qty < 0) {
        throw new Error("Quantity must be a valid non-negative number");
      }

      const itemData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        quantity: qty,
        category_id: Number.parseInt(formData.category_id, 10),
        price: 0,
      };

      await addItem(itemData);

      if (categoryId) {
        navigate(`/category/${categoryId}`);
      } else {
        navigate("/item");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add item");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-slate-50 px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-800">
        Add item
      </h1>
      <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/50">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {error && (
              <div
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800"
                role="alert"
              >
                {error}
              </div>
            )}

            <div>
              <label htmlFor="itemName" className="mb-2 block text-sm font-medium text-slate-700">
                Item name <span className="text-red-500">*</span>
              </label>
              <input
                id="itemName"
                name="name"
                type="text"
                className="w-full rounded-lg border border-slate-300 p-2.5 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="w-full rounded-lg border border-slate-300 p-2.5 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                placeholder="Optional"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="quantity" className="mb-2 block text-sm font-medium text-slate-700">
                Quantity <span className="text-red-500">*</span>
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                className="w-full rounded-lg border border-slate-300 p-2.5 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                placeholder="0"
                min="0"
                value={formData.quantity}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <label
                htmlFor="category_id"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category_id"
                name="category_id"
                className="w-full rounded-lg border border-slate-300 p-2.5 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                value={formData.category_id}
                onChange={handleChange}
                disabled={isLoading}
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 rounded-lg bg-emerald-600 px-4 py-2.5 font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Saving…" : "Save item"}
              </button>
              <Link
                to={categoryId ? `/category/${categoryId}` : "/category"}
                className="flex flex-1 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 font-medium text-slate-700 transition hover:bg-slate-50"
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
