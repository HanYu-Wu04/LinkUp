import { Sidebar } from "@/components/Sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="max-lg:hidden">
        <Sidebar />
      </div>
      <div className="flex">{children}</div>
    </div>
  );
}
