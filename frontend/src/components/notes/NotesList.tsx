"use client";

export default function NotesList() {
  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition">
        <h2 className="font-semibold text-lg text-gray-800">
          Sample Note
        </h2>

        <p className="text-gray-600 mt-2 text-sm">
          This is a sample note
        </p>

        <div className="flex gap-2 mt-4 flex-wrap">
          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
            work
          </span>
        </div>
      </div>
    </div>
  );
}