import Head from 'next/head';
import Link from 'next/link';

export default function Admin() {
  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-gray-100">
          <div className="p-4 text-lg font-bold">Admin Panel</div>
          <nav>
            <a href="#" className="block py-2.5 px-4 hover:bg-gray-700">Dashboard</a>
            <a href={'/admin/bookings'} className="block py-2.5 px-4 hover:bg-gray-700">Bookings</a>
            <a href="#" className="block py-2.5 px-4 hover:bg-gray-700">Settings</a>
            <a href="#" className="block py-2.5 px-4 hover:bg-gray-700">Logout</a>
          </nav>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 bg-gray-100">
          <header className="bg-white shadow p-4 flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <button className="bg-primary text-white px-4 py-2 rounded">Add New</button>
          </header>
          
          <div className="p-4">
            {/* Your main content goes here */}
            <div className="bg-white p-6 rounded-lg shadow">
                
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
