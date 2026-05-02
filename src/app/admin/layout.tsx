import AdminSidebar from "@/components/layout/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="lg:ml-64 p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8">
        {children}
      </div>
    </div>
  );
}
