export const ItemsDetails = () => {
  return (
    <div className="flex justify-center flex-col  items-start mt-4 h-auto w-auto m-12">
      <h1 className="font-bold text-4xl pt-3 w-full text-center">Item Details</h1>
      {/* <div className="flex justify-center">
        <h1 className="font-bold text-4xl"> Item Details</h1>
      </div>*/}
      <div className="pt-4 pl-4">
        <p className="">
          <strong>Item: </strong>
        </p>
        <p className="">
          <strong>Item Quantity: </strong>
        </p>
        <p className="">
          <strong>Item Price: </strong>
        </p>
        <p className="">
          <strong>Item Something: </strong>
        </p>
      </div>
      <div className="flex gap-3 p-3">
        <button className="bg-gray-500 text-white px-4 py-2 rounded text-sm font-medium">Home</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded text-sm font-medium">Edit Item</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded text-sm font-medium">Delete Item</button>
      </div>
    </div>
  );
};
