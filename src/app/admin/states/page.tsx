"use client";

import { useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";

interface StateItem { _id: string; name: string; slug: string; image: string; description: string; capital: string; bestSeason: string; featured: boolean; }

export default function AdminStatesPage() {
  const [states, setStates] = useState<StateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<StateItem | null>(null);
  const [form, setForm] = useState({ name: "", slug: "", image: "", description: "", capital: "", bestSeason: "", featured: false });

  const fetchStates = () => {
    fetch("/api/states").then((r) => r.json()).then((d) => { setStates(Array.isArray(d) ? d : []); setLoading(false); });
  };

  useEffect(() => { fetchStates(); }, []);

  const openAdd = () => { setEditing(null); setForm({ name: "", slug: "", image: "", description: "", capital: "", bestSeason: "", featured: false }); setShowModal(true); };
  const openEdit = (s: StateItem) => { setEditing(s); setForm({ name: s.name, slug: s.slug, image: s.image, description: s.description, capital: s.capital, bestSeason: s.bestSeason, featured: s.featured }); setShowModal(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/states/${editing._id}` : "/api/states";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setShowModal(false);
    fetchStates();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this state?")) return;
    await fetch(`/api/states/${id}`, { method: "DELETE" });
    fetchStates();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-3xl font-extrabold font-heading">Manage States</h1><p className="text-gray-500 mt-1">{states.length} states</p></div>
        <button onClick={openAdd} className="btn-primary text-sm"><FiPlus /> Add State</button>
      </div>

      {loading ? <div className="text-gray-400">Loading...</div> : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b"><tr>
                <th className="text-left p-4 font-semibold text-gray-600">Name</th>
                <th className="text-left p-4 font-semibold text-gray-600">Capital</th>
                <th className="text-left p-4 font-semibold text-gray-600">Season</th>
                <th className="text-left p-4 font-semibold text-gray-600">Featured</th>
                <th className="text-right p-4 font-semibold text-gray-600">Actions</th>
              </tr></thead>
              <tbody>
                {states.map((s) => (
                  <tr key={s._id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium">{s.name}</td>
                    <td className="p-4 text-gray-500">{s.capital}</td>
                    <td className="p-4 text-gray-500">{s.bestSeason}</td>
                    <td className="p-4">{s.featured ? <span className="text-green-600 text-xs font-semibold px-2 py-1 bg-green-50 rounded-full">Yes</span> : <span className="text-gray-400 text-xs">No</span>}</td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => openEdit(s)} className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors"><FiEdit2 /></button>
                      <button onClick={() => handleDelete(s._id)} className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"><FiTrash2 /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold font-heading">{editing ? "Edit State" : "Add State"}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><FiX /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium mb-1">Name</label><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/30" /></div>
              <div><label className="block text-sm font-medium mb-1">Image URL</label><input required value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/30" /></div>
              <div><label className="block text-sm font-medium mb-1">Capital</label><input required value={form.capital} onChange={(e) => setForm({ ...form, capital: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/30" /></div>
              <div><label className="block text-sm font-medium mb-1">Best Season</label><input value={form.bestSeason} onChange={(e) => setForm({ ...form, bestSeason: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/30" /></div>
              <div><label className="block text-sm font-medium mb-1">Description</label><textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/30 resize-none" /></div>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="rounded" />Featured</label>
              <button type="submit" className="btn-primary w-full justify-center">{editing ? "Update State" : "Add State"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
