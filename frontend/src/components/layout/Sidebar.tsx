export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r p-5">
      <h1 className="text-xl font-bold mb-8">Notes App</h1>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mb-6">
        + New Note
      </button>

      <div className="space-y-3">
        <p className="font-medium text-gray-800">All Notes</p>
        <p className="text-gray-500">Labels</p>
      </div>
    </div>
  );
}