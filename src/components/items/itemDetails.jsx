import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getItemById, getItems, deleteItem, searchItems, updateItemQuantity, getCategories, addItem } from "/src/api/api";

const LOW_STOCK_THRESHOLD = 5;

export const ItemsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLowStockAlert, setShowLowStockAlert] = useState(false);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [showCsvImport, setShowCsvImport] = useState(false);
  const [csvData, setCsvData] = useState("");
  const [csvError, setCsvError] = useState(null);
  const [csvImporting, setCsvImporting] = useState(false);
  const searchTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function loadList() {
      setError(null);
      setIsLoading(true);
      try {
        const data = await getItems();
        if (cancelled) return;
        setItems(Array.isArray(data) ? data : []);
        
        const lowStock = (Array.isArray(data) ? data : []).filter(i => i.quantity < LOW_STOCK_THRESHOLD);
        setLowStockItems(lowStock);
        const dismissed = localStorage.getItem("lowStockDismissed");
        const today = new Date().toDateString();
        if (lowStock.length > 0 && dismissed !== today) {
          setShowLowStockAlert(true);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load items");
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
          setError(err instanceof Error ? err.message : "Failed to load item details");
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

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!id) {
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const data = searchQuery.trim() 
            ? await searchItems(searchQuery.trim())
            : await getItems();
          setItems(Array.isArray(data) ? data : []);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Search failed");
        }
      }, 300);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery, id]);

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${item.name}"?`)) return;
    try {
      await deleteItem(item.id);
      navigate(item.category_id ? `/category/${item.category_id}` : "/category");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete item");
    }
  };

  const handleQuantityChange = async (itemId, delta) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty < 0) return;
    
    try {
      await updateItemQuantity({ id: itemId, quantity: delta });
      setItems(prev => prev.map(i => 
        i.id === itemId ? { ...i, quantity: i.quantity + delta } : i
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update quantity");
    }
  };

  const handleSingleItemQuantityChange = async (delta) => {
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty < 0) return;
    
    try {
      await updateItemQuantity({ id: item.id, quantity: delta });
      setItem(prev => ({ ...prev, quantity: prev.quantity + delta }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update quantity");
    }
  };

  const dismissLowStockAlert = () => {
    setShowLowStockAlert(false);
    localStorage.setItem("lowStockDismissed", new Date().toDateString());
  };

  const handleCsvImport = async () => {
    setCsvError(null);
    const lines = csvData.trim().split("\n");
    if (lines.length < 2) {
      setCsvError("CSV must have a header row and at least one data row");
      return;
    }

    const header = lines[0].split(",").map(h => h.trim().toLowerCase());
    const nameIdx = header.indexOf("name");
    const descIdx = header.indexOf("description");
    const qtyIdx = header.indexOf("quantity");
    const catIdx = header.indexOf("category_name");

    if (nameIdx === -1 || qtyIdx === -1 || catIdx === -1) {
      setCsvError("CSV must have columns: name, quantity, category_name (description is optional)");
      return;
    }

    try {
      setCsvImporting(true);
      const categories = await getCategories();
      const categoryMap = {};
      categories.forEach(c => { categoryMap[c.name.toLowerCase()] = c.id; });

      let successCount = 0;
      const errors = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",").map(v => v.trim());
        const name = values[nameIdx];
        const quantity = parseInt(values[qtyIdx], 10);
        const categoryName = values[catIdx]?.toLowerCase();
        const description = descIdx !== -1 ? values[descIdx] : "";

        if (!name || isNaN(quantity) || !categoryMap[categoryName]) {
          errors.push(`Row ${i}: Invalid data`);
          continue;
        }

        try {
          await addItem({
            name,
            description,
            quantity,
            category_id: categoryMap[categoryName]
          });
          successCount++;
        } catch (e) {
          errors.push(`Row ${i}: ${name} - ${e.message}`);
        }
      }

      if (successCount > 0) {
        const data = await getItems();
        setItems(Array.isArray(data) ? data : []);
        setShowCsvImport(false);
        setCsvData("");
      }
      setCsvError(errors.length > 0 ? `Imported ${successCount} items. Errors: ${errors.join("; ")}` : `Successfully imported ${successCount} items`);
    } catch (err) {
      setCsvError(err instanceof Error ? err.message : "Import failed");
    } finally {
      setCsvImporting(false);
    }
  };

  const openCsvImport = () => {
    setShowCsvImport(true);
    setCsvData("name,description,quantity,category_name\nExampleItem,Test description,10,Electronics");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
        <div className="mx-auto max-w-6xl text-center text-lg text-slate-600 dark:text-slate-400">
          Loading…
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400" role="alert">
            {error}
          </div>
          <Link to="/category" className="font-medium text-sky-600 underline decoration-sky-600/30 underline-offset-2 hover:text-sky-700 dark:text-sky-400">
            Back to categories
          </Link>
        </div>
      </div>
    );
  }

  if (!id) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
        <div className="mx-auto max-w-6xl">
          {showLowStockAlert && lowStockItems.length > 0 && (
            <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800 dark:bg-amber-900/30 dark:border-amber-700 dark:text-amber-200">
              <div className="flex items-center justify-between">
                <span>⚠️ <strong>{lowStockItems.length}</strong> item(s) are low on stock (less than {LOW_STOCK_THRESHOLD})</span>
                <button onClick={dismissLowStockAlert} className="text-sm underline hover:no-underline">Dismiss</button>
              </div>
            </div>
          )}

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white">
                All items
              </h1>
              <p className="mt-1 text-slate-600 dark:text-slate-400">
                Browse every item across categories.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={openCsvImport}
                className="inline-flex items-center justify-center rounded-lg bg-slate-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-700"
              >
                Import CSV
              </button>
              <Link
                to="/item/add"
                className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700"
              >
                + Add item
              </Link>
            </div>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-400"
            />
          </div>

          {items.length > 0 ? (
            <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-100/80 dark:border-slate-700 dark:bg-slate-700/50">
                    <th className="p-4 font-semibold text-slate-700 dark:text-slate-300">Name</th>
                    <th className="p-4 font-semibold text-slate-700 dark:text-slate-300">Qty</th>
                    <th className="hidden p-4 font-semibold text-slate-700 dark:text-slate-300 md:table-cell">
                      Description
                    </th>
                    <th className="p-4 font-semibold text-slate-700 dark:text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-slate-100 transition hover:bg-slate-50/80 dark:border-slate-700 dark:hover:bg-slate-700/50"
                    >
                      <td className="p-4 font-medium text-slate-900 dark:text-white">
                        {row.name}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(row.id, -1)}
                            disabled={row.quantity <= 0}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-slate-700 transition hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500"
                          >
                            −
                          </button>
                          <span className={`min-w-[2rem] text-center font-medium ${row.quantity < LOW_STOCK_THRESHOLD ? "text-amber-600 dark:text-amber-400" : "text-slate-700 dark:text-slate-300"}`}>
                            {row.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(row.id, 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-slate-700 transition hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="hidden max-w-md truncate p-4 text-sm text-slate-600 md:table-cell dark:text-slate-400">
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
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm dark:border-slate-600 dark:bg-slate-800">
              <p className="text-lg text-slate-600 dark:text-slate-400">No items yet.</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-500">
                Add an item from a category or use the button above.
              </p>
              <Link
                to="/category"
                className="mt-6 inline-block font-medium text-sky-600 underline decoration-sky-600/30 underline-offset-2 hover:text-sky-700 dark:text-sky-400"
              >
                Go to categories
              </Link>
            </div>
          )}

          {showCsvImport && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="m-4 max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-slate-800">
                <h2 className="mb-4 text-xl font-bold text-slate-800 dark:text-white">Import Items from CSV</h2>
                <p className="mb-2 text-sm text-slate-600 dark:text-slate-400">
                  Format: <code>name,description,quantity,category_name</code>
                </p>
                <textarea
                  value={csvData}
                  onChange={(e) => setCsvData(e.target.value)}
                  className="mb-4 h-40 w-full rounded-lg border border-slate-300 p-2 font-mono text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                  placeholder="name,description,quantity,category_name"
                />
                {csvError && (
                  <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:bg-red-900/30 dark:text-red-400">
                    {csvError}
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={handleCsvImport}
                    disabled={csvImporting}
                    className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
                  >
                    {csvImporting ? "Importing..." : "Import"}
                  </button>
                  <button
                    onClick={() => { setShowCsvImport(false); setCsvError(null); }}
                    className="flex-1 rounded-lg bg-slate-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
        <div className="mx-auto max-w-xl">
          <p className="mb-4 text-lg text-slate-700 dark:text-slate-300">Item not found.</p>
          <Link to="/category" className="font-medium text-sky-600 underline decoration-sky-600/30 underline-offset-2 hover:text-sky-700 dark:text-sky-400">
            Back to categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-8">
      <div className="mx-auto max-w-xl">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-lg shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-800">
          <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-slate-800 dark:text-white">
            Item details
          </h1>

          <dl className="mb-8 space-y-4">
            <div>
              <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">Name</dt>
              <dd className="text-lg text-slate-900 dark:text-white">{item.name}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">Quantity</dt>
              <dd className="flex items-center gap-3">
                <button
                  onClick={() => handleSingleItemQuantityChange(-1)}
                  disabled={item.quantity <= 0}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-700 transition hover:bg-slate-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500"
                >
                  −
                </button>
                <span className={`text-lg font-medium ${item.quantity < LOW_STOCK_THRESHOLD ? "text-amber-600 dark:text-amber-400" : "text-slate-900 dark:text-white"}`}>
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleSingleItemQuantityChange(1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-slate-700 transition hover:bg-slate-300 dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500"
                >
                  +
                </button>
                {item.quantity < LOW_STOCK_THRESHOLD && (
                  <span className="text-xs text-amber-600 dark:text-amber-400">(Low Stock)</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">Description</dt>
              <dd className="text-lg text-slate-800 dark:text-slate-300">
                {item.description || "—"}
              </dd>
            </div>
            {item.price !== undefined && item.price !== null && (
              <div>
                <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">Price</dt>
                <dd className="text-lg text-slate-900 dark:text-white">
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
