import { Link } from "react-router";

export const CategoryDetails = ({ category }) => {
  // Example props structure:
  // category = {
  //   name: "Category Name",
  //   description: "Category Description",
  //   items: [
  //     { name, brand, price, stock, description }
  //   ]
  // }

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="flex flex-col items-start">
        <h1 className="text-4xl font-bold text-center w-full mb-6">{category.name} Details</h1>
        <p className="text-lg font-semibold mb-4">
          <span className="font-bold">Description:</span> {category.description}
        </p>
        <div className="flex gap-4 mb-8">
          <Link
            to="/"
            className="bg-gray-400 text-white px-6 py-3 rounded-md hover:bg-gray-500 transition"
          >
            Back to Home
          </Link>
          <Link
            to={`/category/${category.id}/edit`}
            className="bg-orange-400 text-white px-6 py-3 rounded-md hover:bg-orange-500 transition"
          >
            Edit Category
          </Link>
          <button
            className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition"
            // onClick={handleDelete}
          >
            Delete Category
          </button>
          <Link
            to={`/category/${category.id}/new-item`}
            className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition"
          >
            Add New Item
          </Link>
        </div>
      </div>
      <h2 className="text-3xl font-bold mb-4">Items in this Category</h2>
      <table className="w-full bg-white rounded-md shadow-sm">
        <thead>
          <tr className="border-b">
            <th className="py-3 px-4 text-left font-semibold text-gray-700">Name</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">Brand</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">Price</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">Stock</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">Description</th>
            <th className="py-3 px-4 text-left font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {category.items && category.items.length > 0 ? (
            category.items.map((item, idx) => (
              <tr key={idx} className="border-b">
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.brand}</td>
                <td className="py-2 px-4">{item.price}</td>
                <td className="py-2 px-4">{item.stock}</td>
                <td className="py-2 px-4">{item.description}</td>
                <td className="py-2 px-4">
                  {/* Add actions like Edit/Delete here */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="py-4 px-4 text-center text-gray-500">
                No items in this category.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};