import React from 'react'

export default function Inventory({ inventory }) {
  const totalProductPrice = inventory?.reduce((total, item) => total + parseFloat(item?.ProductPrice), 0);

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="w-full bg-gray-100 text-left text-sm leading-normal">
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {inventory?.map((item, index) => (
              <tr key={index} className="text-gray-700 text-sm">
                <td className="py-2 px-4 border-b">{item?.ProductName}</td>
                <td className="py-2 px-4 border-b">Rs-{parseFloat(item?.ProductPrice).toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{item?.ProductQuantity}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 text-left text-sm leading-normal">
              <td className="py-2 px-4 border-b font-bold">Total</td>
              <td className="py-2 px-4 border-b font-bold">Rs-{totalProductPrice.toFixed(2)}</td>
              <td className="py-2 px-4 border-b"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
