"use client";

import { useState } from "react";
import { createLabel } from "@/services/api";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [newLabel, setNewLabel] = useState("");
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const handleCreate = async () => {
    if (!newLabel.trim()) return;

    try {
      setLoading(true);

      await createLabel(newLabel.trim());

      window.dispatchEvent(new Event("labelsUpdated"));

      setNewLabel("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.message === "Label already exists") {
          alert("Label already exists");
        } else {
          alert("Failed to create label");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-64 bg-white border-r p-5">
      <h1 className="text-xl font-bold mb-8">Notes App</h1>

      <div className="space-y-3 mb-8">
        <Link
          href="/"
          className={`block w-full rounded-lg py-2 text-center font-medium transition ${
            pathname === "/"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "text-gray-500 hover:text-gray-800 hover:bg-blue-200 hover:-translate-y-1 transition-all duration-200"
          }`}
        >
          All Notes
        </Link>

        <Link
          href="/labels"
          className={`block w-full rounded-lg py-2 text-center font-medium transition ${
            pathname === "/labels"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "text-gray-500 hover:text-gray-800 hover:bg-blue-200 hover:-translate-y-1 transition-all duration-200"
          }`}
        >
          Labels
        </Link>
      </div>

      <div className="mt-6 border-t pt-4">
        <h3 className="text-sm font-semibold mb-2">Create Label</h3>

        <input
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="Enter label name"
          className="w-full text-sm font-medium px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <button
          onClick={handleCreate}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          {loading ? "Adding..." : "+ Add Label"}
        </button>
      </div>
    </div>
  );
}
