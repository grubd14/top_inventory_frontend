export const NewCategory = () => {
  return (
    <div className="flex flex-col justify-center items-center w-auto h-auto mt-4">
      <h1 className="text-4xl font-semibold p-6">Add New Category</h1>
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
            <label
              htmlFor="description"
              className="block font-medium mb-2 mt-2"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              className="border border-gray-300 rounded w-full p-2"
              placeholder="Enter description"
              rows={3}
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};
