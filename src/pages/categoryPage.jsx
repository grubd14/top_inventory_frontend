import { Link } from "react-router";

export const CategoryPage = () => {
  return (
    <div className="p-10  min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-md border rounded-sm p-6">
        {/* Title */}
        <h2 className="text-2xl font-bold text-slate-800 border-b-4 border-blue-500 inline-block mb-6 pb-1">
          Laptops
        </h2>

        {/* Top Action Bar */}
        <div className="flex gap-2 mb-8">
          <button className="bg-sky-500 text-white px-4 py-2 rounded text-sm font-medium">
            Details
          </button>
          <button className="bg-amber-500 text-white px-4 py-2 rounded text-sm font-medium">
            Edit
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded text-sm font-medium">
            Delete
          </button>
          <button className="bg-emerald-500 text-white px-4 py-2 rounded text-sm font-medium">
            Add New Item
          </button>
        </div>

        {/* Table Structure */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b bg-gray-50">
              <th className="p-3 font-semibold text-gray-700">Name</th>
              <th className="p-3 font-semibold text-gray-700">Brand</th>
              <th className="p-3 font-semibold text-gray-700">Price</th>
              <th className="p-3 font-semibold text-gray-700">Stock</th>
              <th className="p-3 font-semibold text-gray-700">Description</th>
              <th className="p-3 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-3">MacBook Pro 14</td>
              <td className="p-3">Apple</td>
              <td className="p-3">$1999.00</td>
              <td className="p-3">5</td>
              <td className="p-3 text-sm text-gray-500">
                Powerful M2 chip with 16GB RAM.
              </td>
              <td className="p-3">
                <div className="grid grid-cols-2 gap-2 w-32">
                  <Link to={"/category_details"}>
                    <button className="bg-sky-500 text-white text-xs py-1 px-2 rounded">
                      Details
                    </button>
                  </Link>
                  <button className="bg-amber-500 text-white text-xs py-1 px-2 rounded">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white text-xs py-1 px-2 rounded col-span-1">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-center  mt-10">
        <Link to="/new_category">
          <button className="bg-emerald-500 text-white px-4 py-2 rounded text-sm font-medium">
            Add New Category
          </button>
        </Link>
      </div>
    </div>
  );
};
