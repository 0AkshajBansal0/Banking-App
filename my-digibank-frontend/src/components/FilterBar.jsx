import { useTranslation } from "react-i18next";

export default function FilterBar({ filters, setFilters }) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <select
        value={filters.type}
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        className="border p-2 rounded"
      >
        <option value="">{t("allTypes")}</option>
        <option value="Savings">{t("savings")}</option>
        <option value="Checking">{t("checking")}</option>
      </select>

      <select
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        className="border p-2 rounded"
      >
        <option value="">{t("allStatus")}</option>
        <option value="Active">{t("active")}</option>
        <option value="Closed">{t("closed")}</option>
      </select>
    </div>
  );
}