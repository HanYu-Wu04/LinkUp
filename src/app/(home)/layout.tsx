import { Sidebar } from "@/components/Sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 max-lg:hidden">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
