

export const View = ({data})=>{

    return(
<div className="bg-gray-100 p-6">
  <div className="text-black font-semibold max-w-full mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

  
      <div className="bg-white border rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold border-b-2 pb-2 mb-4">Bill Details</h3>
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between py-1">
            <span className="font-medium">TO:</span>
            <span className="font-bold">{data.to}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-medium">E-way No:</span>
            <span className="font-bold">{data.e_way_no}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-medium">Date:</span>
            <span className="font-bold">{data.date}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-medium">Party DC No:</span>
            <span className="font-bold">{data.party_dc_no}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-medium">Party GSTIN:</span>
            <span className="font-bold">{data.party_gstin}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-medium">HSN Code:</span>
            <span className="font-bold">{data.hsn_code}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-medium">Product Description:</span>
            <span className="font-bold">{data.product_description}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-medium">Vehicle No:</span>
            <span className="font-bold">{data.vehicle_no}</span>
          </div>
        </div>
      </div>


      <div className="bg-white border rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold border-b-2 pb-2 mb-4">ITEMS</h3>
        {data.items?.length > 0 ? (
          <div className="space-y-4">
            {data.items.map((orders, index) => (
              <div className="border-b pb-2 mb-2" key={index}>
                <h4 className="font-bold">Item No: {index + 1}</h4>
                <div className="flex flex-col space-y-1">
                  <div className="flex justify-between py-1">
                    <span className="font-medium">Quantity:</span>
                    <span className="font-bold">{orders.quantity}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-medium">Length:</span>
                    <span className="font-bold">{orders.meta_data?.length || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-medium">Width:</span>
                    <span className="font-bold">{orders.meta_data?.width || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-medium">Material Value:</span>
                    <span className="font-bold">{orders.material_value}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-medium">Rate:</span>
                    <span className="font-bold">{orders.rate}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-medium">Image:</span>
                    <span className="font-bold">
                      {orders.image}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <span>No items available</span>
        )}
      </div>

      <div className="bg-white border rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold border-b-2 pb-2 mb-4">AMOUNTS</h3>
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between py-1">
            <span className="font-medium">Handling Charges:</span>
            <span className="font-bold">{data.handling_charges}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-medium">Net Total:</span>
            <span className="font-bold">{data.net_total}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-medium">CGST:</span>
            <span className="font-bold">{data.cgst}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-medium">SGST:</span>
            <span className="font-bold">{data.sgst}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-medium">Total Weight:</span>
            <span className="font-bold">{data.total_weight}</span>
          </div>
          <div className="flex justify-between py-1 border-t mt-2">
            <span className="font-medium">Gross Total:</span>
            <span className="font-bold">{data.gross_total}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
)}