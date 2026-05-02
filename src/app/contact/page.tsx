"use client";

import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading mb-4">Get in <span className="gradient-text">Touch</span></h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Have questions, suggestions, or want to contribute? We&apos;d love to hear from you!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            {[
              { icon: FiMail, title: "Email", value: "info@travelbharat.com", href: "mailto:info@travelbharat.com" },
              { icon: FiPhone, title: "Phone", value: "+91 12345 67890", href: "tel:+911234567890" },
              { icon: FiMapPin, title: "Location", value: "New Delhi, India", href: "#" },
            ].map((item) => (
              <a key={item.title} href={item.href} className="glass-card p-6 flex items-center gap-4 group hover:border-saffron-200 transition-colors block">
                <div className="w-12 h-12 rounded-xl bg-saffron-50 flex items-center justify-center group-hover:bg-saffron-100 transition-colors">
                  <item.icon className="text-xl text-saffron-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">{item.title}</p>
                  <p className="font-medium text-gray-900">{item.value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
              {submitted && (
                <div className="p-4 rounded-xl bg-green-50 text-green-700 text-sm font-medium">✅ Message sent successfully! We&apos;ll get back to you soon.</div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/30 focus:border-saffron-500" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/30 focus:border-saffron-500" placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-saffron-500/30 focus:border-saffron-500 resize-none" placeholder="Your message..." />
              </div>
              <button type="submit" className="btn-primary"><FiSend /> Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
