
export const EditCategory = () => {
  return (
    <div className="flex flex-col justify-center items-center w-auto h-auto mt-4">
      <h1 className="text-4xl font-semibold p-6">Edit Category</h1>
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
              placeholder="Edit Category Name"
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