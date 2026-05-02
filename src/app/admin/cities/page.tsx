"use client";

import { useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";

interface CityItem { _id: string; name: string; slug: string; image: string; description: string; bestTime: string; stateId: { _id: string; name: string } | string; }
interface StateOption { _id: string; name: string; }

export default function AdminCitiesPage() {
  const [cities, setCities] = useState<CityItem[]>([]);
  const [states, setStates] = useState<StateOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<CityItem | null>(null);
  const [form, setForm] = useState({ name: "", image: "", description: "", bestTime: "", stateId: "" });

  const fetchData = () => {
    Promise.all([fetch("/api/cities").then(r => r.json()), fetch("/api/states").then(r => r.json())])
      .then(([c, s]) => { setCities(Array.isArray(c) ? c : []); setStates(Array.isArray(s) ? s : []); setLoading(false); });
  };
  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setEditing(null); setForm({ name: "", image: "", description: "", bestTime: "", stateId: states[0]?._id || "" }); setShowModal(true); };
  const openEdit = (c: CityItem) => {
    const sId = typeof c.stateId === "object" ? c.stateId._id : c.stateId;
    setEditing(c); setForm({ name: c.name, image: c.image, description: c.description, bestTime: c.bestTime || "", stateId: sId }); setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/cities/${editing._id}` : "/api/cities";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setShowModal(false); fetchData();
  };

  const handleDelete = async (id: string) => { if (!confirm("Delete this city?")) return; await fetch(`/api/cities/${id}`, { method: "DELETE" }); fetchData(); };

  const getStateName = (stateId: CityItem["stateId"]) => typeof stateId === "object" ? stateId.name : states.find(s => s._id === stateId)?.name || "";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-3xl font-extrabold font-heading">Manage Cities</h1><p className="text-gray-500 mt-1">{cities.length} cities</p></div>
        <button onClick={openAdd} className="btn-primary text-sm"><FiPlus /> Add City</button>
      </div>

      {loading ? <div className="text-gray-400">Loading...</div> : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b"><tr>
                <th className="text-left p-4 font-semibold text-gray-600">Name</th>
                <th className="text-left p-4 font-semibold text-gray-600">State</th>
                <th className="text-left p-4 font-semibold text-gray-600">Best Time</th>
                <th className="text-right p-4 font-semibold text-gray-600">Actions</th>
              </tr></thead>
              <tbody>
                {cities.map((c) => (
                  <tr key={c._id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="p-4 font-medium">{c.name}</td>
                    <td className="p-4 text-gray-500">{getStateName(c.stateId)}</td>
                    <td className="p-4 text-gray-500">{c.bestTime}</td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => openEdit(c)} className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"><FiEdit2 /></button>
                      <button onClick={() => handleDelete(c._id)} className="p-2 hover:bg-red-50 rounded-lg text-red-600"><FiTrash2 /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold font-heading">{editing ? "Edit City" : "Add City"}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><FiX /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium mb-1">State</label><select required value={form.stateId} onChange={e => setForm({ ...form, stateId: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/30"><option value="">Select State</option>{states.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}</select></div>
              <div><label className="block text-sm font-medium mb-1">Name</label><input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/30" /></div>
              <div><label className="block text-sm font-medium mb-1">Image URL</label><input required value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/30" /></div>
              <div><label className="block text-sm font-medium mb-1">Best Time</label><input value={form.bestTime} onChange={e => setForm({ ...form, bestTime: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/30" /></div>
              <div><label className="block text-sm font-medium mb-1">Description</label><textarea required rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/30 resize-none" /></div>
              <button type="submit" className="btn-primary w-full justify-center">{editing ? "Update City" : "Add City"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
