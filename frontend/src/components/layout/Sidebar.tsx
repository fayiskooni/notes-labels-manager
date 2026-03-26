export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow p-4">
      <h1 className="text-xl font-bold mb-6">Notes App</h1>

      <button className="w-full bg-blue-600 text-white py-2 rounded mb-4">
        + New Note
      </button>

      <div className="space-y-2">
        <p className="font-medium">All Notes</p>
        <p className="text-gray-500">Labels</p>
      </div>
    </div>
  );
}
