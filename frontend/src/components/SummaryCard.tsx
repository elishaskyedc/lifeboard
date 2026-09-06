type SummaryCardProps = {
  title: string;
  value: string;
  description: string;
}; // telling summary card it expects 3 pieces of information

export default function SummaryCard({
  title,
  value,
  description,
}: SummaryCardProps) { // receives those values
  return (
    <div className="rounded-xl border p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
    </div>
  );
}