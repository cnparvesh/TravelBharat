"use client";

import { useEffect, useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX } from "react-icons/fi";

interface PlaceItem { _id: string; name: string; slug: string; category: string; images: string[]; description: string; history: string; bestTime: string; fees: string; timings: string; mapLink: string; nearbyAttractions: string[]; tips: string[]; tags: string[]; featured: boolean; stateId: { _id: string; name: string } | string; cityId: { _id: string; name: string } | string; }
interface Option { _id: string; name: string; }

export default function AdminPlacesPage() {
  const [places, setPlaces] = useState<PlaceItem[]>([]);
  const [states, setStates] = useState<Option[]>([]);
  const [cities, setCities] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<PlaceItem | null>(null);
  const emptyForm = { name: "", stateId: "", cityId: "", category: "heritage" as string, images: "", description: "", history: "", bestTime: "", fees: "", timings: "", mapLink: "", nearbyAttractions: "", tips: "", tags: "", featured: false };
  const [form, setForm] = useState(emptyForm);

  const fetchData = () => {
    Promise.all([fetch("/api/places").then(r => r.json()), fetch("/api/states").then(r => r.json()), fetch("/api/cities").then(r => r.json())])
      .then(([p, s, c]) => { setPlaces(Array.isArray(p) ? p : []); setStates(Array.isArray(s) ? s : []); setCities(Array.isArray(c) ? c : []); setLoading(false); });
  };
  useEffect(() => { fetchData(); }, []);

  const openAdd = () => { setEditing(null); setForm({ ...emptyForm, stateId: states[0]?._id || "", cityId: cities[0]?._id || "" }); setShowModal(true); };
  const openEdit = (p: PlaceItem) => {
    setEditing(p);
    setForm({
      name: p.name, stateId: typeof p.stateId === "object" ? p.stateId._id : p.stateId, cityId: typeof p.cityId === "object" ? p.cityId._id : p.cityId,
      category: p.category, images: (p.images || []).join("\n"), description: p.description, history: p.history || "", bestTime: p.bestTime || "",
      fees: p.fees || "", timings: p.timings || "", mapLink: p.mapLink || "", nearbyAttractions: (p.nearbyAttractions || []).join(", "),
      tips: (p.tips || []).join("\n"), tags: (p.tags || []).join(", "), featured: p.featured
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = { ...form, images: form.images.split("\n").filter(Boolean), nearbyAttractions: form.nearbyAttractions.split(",").map(s => s.trim()).filter(Boolean), tips: form.tips.split("\n").filter(Boolean), tags: form.tags.split(",").map(s => s.trim()).filter(Boolean) };
    const method = editing ? "PUT" : "POST";
    const url = editing ? `/api/places/${editing._id}` : "/api/places";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setShowModal(false); fetchData();
  };

  const handleDelete = async (id: string) => { if (!confirm("Delete this place?")) return; await fetch(`/api/places/${id}`, { method: "DELETE" }); fetchData(); };
  const getName = (ref: { _id: string; name: string } | string, list: Option[]) => typeof ref === "object" ? ref.name : list.find(x => x._id === ref)?.name || "";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="text-3xl font-extrabold font-heading">Manage Places</h1><p className="text-gray-500 mt-1">{places.length} places</p></div>
        <button onClick={openAdd} className="btn-primary text-sm"><FiPlus /> Add Place</button>
      </div>

      {loading ? <div className="text-gray-400">Loading...</div> : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b"><tr>
                <th className="text-left p-4 font-semibold text-gray-600">Name</th>
                <th className="text-left p-4 font-semibold text-gray-600">State</th>
                <th className="text-left p-4 font-semibold text-gray-600">City</th>
                <th className="text-left p-4 font-semibold text-gray-600">Category</th>
                <th className="text-left p-4 font-semibold text-gray-600">Featured</th>
                <th className="text-right p-4 font-semibold text-gray-600">Actions</th>
              </tr></thead>
              <tbody>
                {places.map((p) => (
                  <tr key={p._id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="p-4 font-medium">{p.name}</td>
                    <td className="p-4 text-gray-500">{getName(p.stateId, states)}</td>
                    <td className="p-4 text-gray-500">{getName(p.cityId, cities)}</td>
                    <td className="p-4"><span className="capitalize text-xs px-2 py-1 bg-saffron-50 text-saffron-700 rounded-full">{p.category}</span></td>
                    <td className="p-4">{p.featured ? <span className="text-green-600 text-xs font-semibold px-2 py-1 bg-green-50 rounded-full">Yes</span> : <span className="text-gray-400 text-xs">No</span>}</td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => openEdit(p)} className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"><FiEdit2 /></button>
                      <button onClick={() => handleDelete(p._id)} className="p-2 hover:bg-red-50 rounded-lg text-red-600"><FiTrash2 /></button>
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
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold font-heading">{editing ? "Edit Place" : "Add Place"}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg"><FiX /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">State</label><select required value={form.stateId} onChange={e => setForm({...form, stateId: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border text-sm"><option value="">Select</option>{states.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}</select></div>
                <div><label className="block text-sm font-medium mb-1">City</label><select required value={form.cityId} onChange={e => setForm({...form, cityId: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border text-sm"><option value="">Select</option>{cities.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}</select></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-1">Name</label><input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border text-sm" /></div>
                <div><label className="block text-sm font-medium mb-1">Category</label><select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border text-sm"><option value="heritage">Heritage</option><option value="nature">Nature</option><option value="religious">Religious</option><option value="adventure">Adventure</option></select></div>
              </div>
              <div><label className="block text-sm font-medium mb-1">Image URLs (one per line)</label><textarea rows={2} value={form.images} onChange={e => setForm({...form, images: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border text-sm resize-none" /></div>
              <div><label className="block text-sm font-medium mb-1">Description</label><textarea required rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border text-sm resize-none" /></div>
              <div><label className="block text-sm font-medium mb-1">History</label><textarea rows={2} value={form.history} onChange={e => setForm({...form, history: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border text-sm resize-none" /></div>
              <div className="grid grid-cols-3 gap-4">
                <div><label className="block text-sm font-medium mb-1">Best Time</label><input value={form.bestTime} onChange={e => setForm({...form, bestTime: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border text-sm" /></div>
                <div><label className="block text-sm font-medium mb-1">Fees</label><input value={form.fees} onChange={e => setForm({...form, fees: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border text-sm" /></div>
                <div><label className="block text-sm font-medium mb-1">Timings</label><input value={form.timings} onChange={e => setForm({...form, timings: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border text-sm" /></div>
              </div>
              <div><label className="block text-sm font-medium mb-1">Map Link</label><input value={form.mapLink} onChange={e => setForm({...form, mapLink: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border text-sm" /></div>
              <div><label className="block text-sm font-medium mb-1">Tags (comma separated)</label><input value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} className="w-full px-4 py-2.5 rounded-xl border text-sm" placeholder="popular, family-friendly, free-entry" /></div>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} className="rounded" />Featured</label>
              <button type="submit" className="btn-primary w-full justify-center">{editing ? "Update Place" : "Add Place"}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
