export default function EmptyState({ icon = "*", message = "No data available", sub = "" }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-4xl mb-3">{icon}</div>
      <p className="font-medium text-textSecondary">{message}</p>
      {sub && <p className="text-sm text-textSecondary mt-1 opacity-70">{sub}</p>}
    </div>
  );
}