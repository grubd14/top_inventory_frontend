import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getCategoriesById, deleteCategory, deleteItem } from "/src/api/api";

const LOW_STOCK_THRESHOLD = 5;

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
        `Delete "${category.name}" and all items in it? This cannot be undone.`,
      )
    ) {
      return;
    }

    try {
      await deleteCategory(category.id);
      navigate("/category");
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
      <div className="min-h-screen bg-slate-50 p-8 dark:bg-slate-900">
        <div className="text-center text-lg text-slate-600 dark:text-slate-400">Loading…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 p-8 dark:bg-slate-900">
        <div className="mb-4 text-lg text-red-700 dark:text-red-400" role="alert">
          {error}
        </div>
        <Link
          to="/category"
          className="font-medium text-sky-600 underline decoration-sky-600/30 underline-offset-2 hover:text-sky-700 dark:text-sky-400"
        >
          Back to categories
        </Link>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-slate-50 p-8 dark:bg-slate-900">
        <div className="mb-4 text-lg text-slate-700 dark:text-slate-300">Category not found.</div>
        <Link
          to="/category"
          className="font-medium text-sky-600 underline decoration-sky-600/30 underline-offset-2 hover:text-sky-700 dark:text-sky-400"
        >
          Back to categories
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 dark:bg-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col items-start">
        <h1 className="mb-2 w-full text-center text-3xl font-bold tracking-tight text-slate-800 dark:text-white">
          {category.name}
        </h1>
        <p className="mb-8 w-full text-center text-slate-600 dark:text-slate-400">
          {category.description || "No description"}
        </p>
        <div className="mb-8 flex w-full flex-wrap gap-3">
          <Link
            to="/category"
            className="rounded-lg bg-slate-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            All categories
          </Link>
          <Link
            to={`/category/${category.id}/update`}
            className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-amber-600"
          >
            Edit category
          </Link>
          <button
            type="button"
            onClick={handleDeleteCategory}
            className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Delete category
          </button>
          <Link
            to={`/category/${category.id}/new-item`}
            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            Add item
          </Link>
        </div>

        <h2 className="mb-4 w-full text-2xl font-bold text-slate-800 dark:text-white">
          Items in this category
        </h2>
        <div className="w-full overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-100/80 dark:border-slate-700 dark:bg-slate-700/50">
            <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">
              Name
            </th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">
              Quantity
            </th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">
              Description
            </th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {category.items && category.items.length > 0 ? (
            category.items.map((item) => (
              <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50/80 dark:border-slate-700 dark:hover:bg-slate-700/50">
                <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{item.name}</td>
                <td className={`px-4 py-3 ${item.quantity < LOW_STOCK_THRESHOLD ? "text-amber-600 dark:text-amber-400" : "text-slate-700 dark:text-slate-300"}`}>{item.quantity}</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{item.description}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/item/${item.id}`}
                      className="rounded-md bg-sky-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-sky-700"
                    >
                      View
                    </Link>
                    <Link
                      to={`/item/${item.id}/edit`}
                      className="rounded-md bg-amber-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-amber-600"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item)}
                      className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">
                No items in this category.
              </td>
            </tr>
          )}
        </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
