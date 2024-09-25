import { useState } from "react";

export const CreateForm = () => {
  const [products, setProducts] = useState([
    {
      product_description: "",
      quantity: "",
      rate: "",
    },
  ]);

  const addProductField = () => {
    setProducts([
      ...products,
      {
        product_description: "",
        quantity: "",
        rate: "",
      },
    ]);
  };

  const removeProductField = (index: number) => {
    if (index !== 0) {
      setProducts(products.filter((_product, i) => i !== index));
    }
  };

  return (
    <div className="flex justify-center gap-4 bg-white text-black">
      <div className="w-2/5 flex flex-col ">
        <h1 className="text-3xl font-bold mb-3 mt-3 text-center">
          Create Order
        </h1>
        <label className=" text-lg font-bold flex-1 p-2">
          To
          <textarea
            rows={5}
            placeholder="Enter To"
            className="border rounded w-full p-2 font-normal bg-transparent"
          />
        </label>
        <div className="flex gap-4 p-2">
          <label className=" text-lg font-bold flex-1">
            E-way No
            <input
              type="text"
              placeholder="Enter E-way No"
              className="border rounded p-2 w-full font-normal bg-transparent"
            />
          </label>
          <label className=" text-lg font-bold flex-1">
            Party DC No
            <input
              type="text"
              placeholder="Enter Party DC No"
              className="border rounded p-2 w-full font-normal bg-transparent"
            />
          </label>
          <label className=" text-lg font-bold flex-1">
            Party DC Date
            <input
              type="date"
              placeholder="Enter Party DC Date"
              className="border rounded w-full p-2 font-normal bg-transparent"
            />
          </label>
        </div>
        <div className="flex gap-4 p-2">
          <label className=" text-lg font-bold flex-1">
            Party GSTIN
            <input
              type="text"
              placeholder="Enter Party GSTIN"
              className="border rounded w-full p-2 font-normal bg-transparent"
            />
          </label>
          <label className=" text-lg font-bold flex-1">
            Our DC No
            <input
              type="number"
              placeholder="Enter Our DC No"
              className="border rounded w-full p-2 font-normal bg-transparent"
            />
          </label>
          <label className=" text-lg font-bold flex-1">
            HSN Code
            <select className="border rounded w-full p-2 font-normal bg-transparent">
              <option value="">Select HSN Code</option>
              <option value="hsn-code-1">998898</option>
              <option value="hsn-code-2">997212</option>
              <option value="hsn-code-3">73084000</option>
            </select>
          </label>
        </div>

        {/* Product fields */}
        <div>
          {products.map((_product, index) => (
            <div key={index}>
              <div className="flex gap-4 p-2">
                <label className=" text-lg font-bold flex-1">
                  Product Description
                  <input
                    name="product_description"
                    type="text"
                    placeholder="Enter Product Description"
                    className="border rounded w-full p-2 font-normal bg-transparent"
                  />
                </label>
              </div>
              <div className="flex gap-4 p-2">
                <label className=" text-lg font-bold flex-1">
                  Qty
                  <input
                    name="quantity"
                    type="text"
                    placeholder="Enter Qty"
                    className="border rounded w-full p-2 font-normal bg-transparent"
                  />
                </label>
                <label className=" text-lg font-bold flex-1">
                  Rate
                  <input
                    name="rate"
                    type="number"
                    placeholder="Enter Rate"
                    className="border rounded w-full p-2 font-normal bg-transparent"
                  />
                </label>
                <label className="text-center font-bold text-lg">
                  Add
                  <button
                    className="border rounded border-black w-full p-2 font-bold text-2xl"
                    onClick={addProductField}
                  >
                    +
                  </button>
                </label>
                <label className="text-center font-bold text-lg">
                  Remove
                  <button
                    className="border rounded border-black w-full p-2 font-bold text-2xl"
                    onClick={() => removeProductField(index)}
                  >
                    -
                  </button>
                </label>
              </div>
            </div>
          ))}
          <div className="flex gap-4 p-2 mb-5">
            <label className=" text-lg font-bold flex-1">
              CGST
              <input
                type="number"
                placeholder="Enter CGST"
                className="border rounded w-full p-2 font-normal bg-transparent"
              />
            </label>
            <label className=" text-lg font-bold flex-1">
              SGST
              <input
                type="number"
                placeholder="Enter SGST"
                className="border rounded w-full p-2 font-normal bg-transparent"
              />
            </label>
            <label className=" text-lg font-bold flex-1">
              Vehicle No
              <input
                type="text"
                placeholder="Enter Vehicle No"
                className="border rounded w-full p-2 font-normal bg-transparent"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
