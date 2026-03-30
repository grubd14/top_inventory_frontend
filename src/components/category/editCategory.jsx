import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getCategoriesById, updateCategory } from "/src/api/api";

export const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Load existing category data to pre-fill the form
  useEffect(() => {
    async function loadCategory() {
      try {
        if (!id) throw new Error("Missing category ID");

        const categoryId = Number.parseInt(id, 10);
        if (!Number.isFinite(categoryId))
          throw new Error("Invalid category ID");

        const data = await getCategoriesById(categoryId);

        // Handle nested response { category: {...}, items: [...] }
        const category = data.category ?? data;

        setFormData({
          name: category.name ?? "",
          description: category.description ?? "",
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load category",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadCategory();
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
      setError("Category name is required");
      return;
    }

    setIsSaving(true);

    try {
      const categoryId = Number.parseInt(id, 10);
      await updateCategory({
        id: categoryId,
        name: formData.name.trim(),
        description: formData.description.trim(),
      });

      navigate(`/category/${categoryId}`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update category",
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-slate-900">
        <p className="text-lg text-gray-600 dark:text-slate-400">Loading category...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg dark:bg-slate-800">
        <div className="p-6">
          <h1 className="text-3xl font-semibold text-center mb-6 dark:text-white">
            Edit Category
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded dark:bg-red-900/30 dark:border-red-800 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Name */}
            <div>
              <label htmlFor="name" className="block font-medium mb-2 dark:text-slate-300">
                Category Name: <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                placeholder="Enter category name"
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
                placeholder="Enter category description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                disabled={isSaving}
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 bg-orange-500 text-white px-4 py-2 rounded font-medium hover:bg-orange-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
              <Link
                to={`/category/${id}`}
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
