import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createCategory } from "/src/api/api";

export const NewCategory = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
        throw new Error("Category name is required");
      }

      const categoryData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
      };

      const response = await createCategory(categoryData);

      if (response) {
        setSuccess(true);
        setFormData({ name: "", description: "" });
        setTimeout(() => {
          navigate("/category");
        }, 1200);
      } else {
        throw new Error("No response from server");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create category",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-800">
        New category
      </h1>
      <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/50">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {error && (
              <div
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800"
                role="alert"
              >
                <p className="font-medium">Could not create category</p>
                <p className="mt-1 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div
                className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800"
                role="status"
              >
                Category created. Redirecting…
              </div>
            )}

            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
                Category name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="w-full rounded-lg border border-slate-300 p-2.5 text-slate-900 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                placeholder="e.g. Electronics"
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
                placeholder="Optional details"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 rounded-lg bg-emerald-600 px-4 py-2.5 font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? "Creating…" : "Create category"}
              </button>
              <Link to="/category" className="flex-1">
                <button
                  type="button"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
