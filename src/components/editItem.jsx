export const EditItemForm = () => {
  return (
    <div className="flex flex-col justify-center items-center w-auto h-auto mt-4">
      <h1 className="text-4xl font-semibold p-6">Edit Item</h1>
      <div className="h-auto w-auto shadow-2xl">
        <form className="h-auto w-lg">
          <div className="p-5">
            <label htmlFor="itemName" className="block font-medium mb-2">
              Name:
            </label>
            <input
              id="itemName"
              name="name"
              type="text"
              className="border border-gray-300 rounded w-full p-2"
              placeholder="Enter item name"
            />
            <label htmlFor="description" className="block font-medium mb-2 mt-2">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              className="border border-gray-300 rounded w-full p-2"
              placeholder="Enter description"
              rows={3}
            ></textarea>
            <label htmlFor="quantity" className="block font-medium mt-2 mb-2
    ">
              Quantity:
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              className="border border-gray-300 rounded w-full p-2"
              placeholder="0"
            />
            <label htmlFor="price" className="block font-medium mt-2 mb-2">
              Price:
            </label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              className="border border-gray-300 rounded w-full p-2"
              placeholder="0.00"
            />
            <label htmlFor="category" className="block font-medium mt-2 mb-2">
              Category:
            </label>
            <input
              id="category"
              name="category"
              type="text"
              className="border border-gray-300 rounded w-full p-2"
              placeholder="Enter category"
            />
              <button
                type="submit"
                className=" mt-4 bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
          </div>
        </form>
      </div>
    </div>
  );
};
