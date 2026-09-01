import Header from "@/components/Header";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <Header />

      <h1 className="text-4xl font-bold">LifeBoard</h1>

      <p className="mt-2 text-gray-600">
        Your personal life dashboard.
      </p>
    </main>
  );
}