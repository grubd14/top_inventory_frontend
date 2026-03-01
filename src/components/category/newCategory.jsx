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

      console.log("Submitting category data:", categoryData);

      const response = await createCategory(categoryData);

      console.log("Category creation response:", response);
      console.log("Response type:", typeof response);
      console.log("Response full:", JSON.stringify(response));

      if (response) {
        console.log("Category created successfully:", response);
        setSuccess(true);
        // Clear form and navigate after success
        setFormData({ name: "", description: "" });
        setTimeout(() => {
          navigate("/category");
        }, 1500);
      } else {
        throw new Error("No response from server");
      }
    } catch (err) {
      console.error("Error creating category:", err);
      console.error("Error message:", err.message);
      console.error("Error stack:", err.stack);

      setError(
        err instanceof Error ? err.message : "Failed to create category",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-auto h-auto mt-4 mb-8 min-h-screen">
      <h1 className="text-4xl font-semibold p-6">Add New Category</h1>
      <div className="h-auto w-full max-w-md shadow-2xl rounded-lg bg-white">
        <form onSubmit={handleSubmit} className="h-auto">
          <div className="p-5 space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p className="font-semibold">Error:</p>
                <p>{error}</p>
                <p className="text-xs mt-2 text-red-600">
                  Check browser console (F12) for more details
                </p>
              </div>
            )}

            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                Category created successfully! Redirecting...
              </div>
            )}

            {/* Category Name */}
            <div>
              <label htmlFor="name" className="block font-medium mb-2">
                Category Name: <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="border border-gray-300 rounded w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter category name"
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
                placeholder="Enter category description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                disabled={isLoading}
              />
            </div>

            {/* Debug Info */}
            <div className="bg-gray-50 border border-gray-200 rounded p-3 text-xs">
              <p className="text-gray-600">
                <strong>API Endpoint:</strong> POST /category/create
              </p>
              <p className="text-gray-600 mt-1">
                <strong>Payload:</strong> {JSON.stringify(formData)}
              </p>
              <p className="text-gray-500 mt-2">
                Check browser Network tab (F12) to see API response
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-green-500 text-white px-4 py-2 rounded font-medium hover:bg-green-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating..." : "Create Category"}
              </button>
              <Link to="/category" className="flex-1">
                <button
                  type="button"
                  className="w-full bg-gray-500 text-white px-4 py-2 rounded font-medium hover:bg-gray-600 transition"
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
