import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import SummaryCard from "@/components/SummaryCard";

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

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <SummaryCard
              title="Tasks"
              value="5"
              description="Due today"
            />

            <SummaryCard
              title="Habits"
              value="3 / 4"
              description="Completed today"
            />
            
          </div>
        </section>
      </div>
    </main>
  );
}