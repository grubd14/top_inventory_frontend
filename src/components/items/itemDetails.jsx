import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getItemById, getItems, deleteItem } from "/src/api/api";

export const ItemsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadList() {
      setError(null);
      setIsLoading(true);
      try {
        const data = await getItems();
        if (cancelled) return;
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load items",
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    async function loadSingle() {
      setError(null);
      setIsLoading(true);
      try {
        const itemId = Number.parseInt(id, 10);
        if (!Number.isFinite(itemId)) throw new Error("ID is not valid");

        const data = await getItemById(itemId);
        if (cancelled) return;

        if (Array.isArray(data) && data.length > 0) {
          setItem(data[0]);
        } else if (data && typeof data === "object" && data.id) {
          setItem(data);
        } else {
          throw new Error("Item not found");
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load item details",
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    if (!id) {
      loadList();
    } else {
      loadSingle();
    }

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${item.name}"?`))
      return;

    try {
      await deleteItem(item.id);
      navigate(item.category_id ? `/category/${item.category_id}` : "/category");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete item");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-6xl text-center text-lg text-slate-600">
          Loading…
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-6xl">
          <div
            className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800"
            role="alert"
          >
            {error}
          </div>
          <Link
            to="/category"
            className="font-medium text-sky-600 underline decoration-sky-600/30 underline-offset-2 hover:text-sky-700"
          >
            Back to categories
          </Link>
        </div>
      </div>
    );
  }

  if (!id) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-800">
                All items
              </h1>
              <p className="mt-1 text-slate-600">
                Browse every item across categories.
              </p>
            </div>
            <Link
              to="/item/add"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700"
            >
              + Add item
            </Link>
          </div>

          {items.length > 0 ? (
            <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-100/80">
                    <th className="p-4 font-semibold text-slate-700">Name</th>
                    <th className="p-4 font-semibold text-slate-700">Qty</th>
                    <th className="hidden p-4 font-semibold text-slate-700 md:table-cell">
                      Description
                    </th>
                    <th className="p-4 font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-slate-100 transition hover:bg-slate-50/80"
                    >
                      <td className="p-4 font-medium text-slate-900">
                        {row.name}
                      </td>
                      <td className="p-4 text-slate-700">{row.quantity}</td>
                      <td className="hidden max-w-md truncate p-4 text-sm text-slate-600 md:table-cell">
                        {row.description || "—"}
                      </td>
                      <td className="p-4">
                        <Link
                          to={`/item/${row.id}`}
                          className="inline-flex rounded-md bg-sky-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-sky-700"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm">
              <p className="text-lg text-slate-600">No items yet.</p>
              <p className="mt-2 text-sm text-slate-500">
                Add an item from a category or use the button above.
              </p>
              <Link
                to="/category"
                className="mt-6 inline-block font-medium text-sky-600 underline decoration-sky-600/30 underline-offset-2 hover:text-sky-700"
              >
                Go to categories
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-xl">
          <p className="mb-4 text-lg text-slate-700">Item not found.</p>
          <Link
            to="/category"
            className="font-medium text-sky-600 underline decoration-sky-600/30 underline-offset-2 hover:text-sky-700"
          >
            Back to categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-xl">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-lg shadow-slate-200/50">
          <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-slate-800">
            Item details
          </h1>

          <dl className="mb-8 space-y-4">
            <div>
              <dt className="text-sm font-medium text-slate-500">Name</dt>
              <dd className="text-lg text-slate-900">{item.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-slate-500">Quantity</dt>
              <dd className="text-lg text-slate-900">{item.quantity}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-slate-500">Description</dt>
              <dd className="text-lg text-slate-800">
                {item.description || "—"}
              </dd>
            </div>
            {item.price !== undefined && item.price !== null && (
              <div>
                <dt className="text-sm font-medium text-slate-500">Price</dt>
                <dd className="text-lg text-slate-900">
                  ${Number(item.price).toFixed(2)}
                </dd>
              </div>
            )}
          </dl>

          <div className="flex flex-wrap gap-3">
            <Link
              to={item.category_id ? `/category/${item.category_id}` : "/category"}
              className="rounded-lg bg-slate-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Back
            </Link>
            <Link
              to={`/item/${item.id}/edit`}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
            >
              Edit item
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              Delete item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
