import { Sidebar } from "@/components/Sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div>{children}</div>
    </div>
  );
}
