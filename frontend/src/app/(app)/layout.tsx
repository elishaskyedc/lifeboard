import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Header />

      <div className="flex min-h-[calc(100vh-81px)]">
        <Sidebar />

        <section className="min-w-0 flex-1">
          {children}
        </section>
      </div>
    </main>
  );
}