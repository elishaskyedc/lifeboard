import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      <div className="flex">
        <Sidebar />

        <section className="flex-1 p-8">
          <h1 className="text-4xl font-bold">LifeBoard</h1>

          <p className="mt-2 text-gray-600">
            Your personal life dashboard.
          </p>
        </section>
      </div>
    </main>
  );
}