import React from 'react'
import Sidebar from './_components/Sidebar'
import headerAdmin from './_components/headerAdmin'
export default function layout({children}) {
  return (
    <div className="flex bg-gray-100">
    <Sidebar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <headerAdmin />
      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>
    </div>
  </div>  )
}
