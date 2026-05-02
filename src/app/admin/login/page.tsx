"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiMapPin, FiLock, FiMail } from "react-icons/fi";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/admin/dashboard");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-2xl gradient-saffron flex items-center justify-center shadow-lg shadow-saffron-600/30 mb-4">
            <FiMapPin className="text-white text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-white font-heading">Admin Login</h1>
          <p className="text-gray-400 text-sm mt-1">TravelBharat Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8 space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-sm">{error}</div>
          )}

          <div>
            <label className="block text-sm text-gray-300 mb-1.5">Email</label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/50" placeholder="admin@travelbharat.com" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1.5">Password</label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/50" placeholder="••••••••" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full btn-primary justify-center disabled:opacity-50">
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-center text-xs text-gray-500">Default: admin@travelbharat.com / Admin@123</p>
        </form>
      </div>
    </div>
  );
}
