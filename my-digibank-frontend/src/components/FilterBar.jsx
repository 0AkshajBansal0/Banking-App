export default function FilterBar({ filters, setFilters }) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <select
        value={filters.type}
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        className="border p-2 rounded"
      >
        <option value="">All Types</option>
        <option>Savings</option>
        <option>Checking</option>
      </select>

      <select
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        className="border p-2 rounded"
      >
        <option value="">All Status</option>
        <option>Active</option>
        <option>Closed</option>
      </select>
    </div>
  );
}