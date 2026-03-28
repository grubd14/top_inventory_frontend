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
        `Delete "${category.name}" and all items in it? This cannot be undone.`,
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
      <div className="min-h-screen bg-slate-50 p-10">
        <div className="text-center text-lg text-slate-600">
          Loading categories…
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 p-10">
        <div className="mx-auto max-w-6xl">
          <div
            className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800"
            role="alert"
          >
            {error}
          </div>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-lg bg-sky-600 px-4 py-2 font-medium text-white transition hover:bg-sky-700"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="inline-block border-b-4 border-sky-500 pb-2 text-3xl font-bold text-slate-800">
              Categories
            </h2>
            <p className="mt-2 text-slate-600">
              Manage categories and the items inside them.
            </p>
          </div>
          <Link
            to="/category/create"
            className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700"
          >
            + New category
          </Link>
        </div>

        {categories.length > 0 ? (
          <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100/80 text-left">
                  <th className="p-4 font-semibold text-slate-700">Name</th>
                  <th className="p-4 font-semibold text-slate-700">
                    Description
                  </th>
                  <th className="p-4 font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr
                    key={category.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50/80"
                  >
                    <td className="p-4 font-medium text-slate-900">
                      {category.name}
                    </td>
                    <td className="p-4 text-sm text-slate-600">
                      {category.description || "No description"}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          to={`/category/${category.id}`}
                          className="inline-flex rounded-md bg-sky-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-sky-700"
                        >
                          Details
                        </Link>
                        <Link
                          to={`/category/${category.id}/update`}
                          className="inline-flex rounded-md bg-amber-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-amber-600"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(category)}
                          className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-700"
                        >
                          Delete
                        </button>
                        <Link
                          to={`/category/${category.id}/new-item`}
                          className="inline-flex rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-emerald-700"
                        >
                          Add item
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <p className="mb-4 text-lg text-slate-600">
              No categories yet. Create one to get started.
            </p>
            <Link
              to="/category/create"
              className="inline-flex rounded-lg bg-emerald-600 px-6 py-2.5 font-medium text-white transition hover:bg-emerald-700"
            >
              Create category
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
