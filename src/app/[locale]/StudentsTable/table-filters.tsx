import { Input } from "@/components/ui/input";
import "../../styles/studentTable.scss";
import { Label } from "@/components/ui/label";
import { useTranslations } from "use-intl";

const TableFilters = ({ table }: any) => {
  const t = useTranslations("student.page.filters");
  return (
    <div className="border border-gray-300 rounded-lg mb-4 p-3">
      <div className="flex justify-between items-center gap-3">
        <div className="w-1/4">
          <Label htmlFor="search-filter"> {t("search-label")} </Label>
          <Input
            type="search"
            id="search-filter"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            placeholder={t("search-placeholder-by-name")}
          />
        </div>

        <div className="w-1/4">
          <Label htmlFor="search-filter"> {t("search-label")} </Label>
          <Input
            type="search"
            id="search-filter"
            value={(table.getColumn("idnp")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("idnp")?.setFilterValue(event.target.value)
            }
            placeholder={t("search-placeholder-by-idnp")}
          />
        </div>
        <div className="w-1/4">
          <Label htmlFor="from-filter"> {t("date-label-from")} </Label>
          <Input type="date" id="from-filter" />
        </div>
        <div className="w-1/4">
          <Label htmlFor="t0-filter"> {t("date-label-to")} </Label>
          <Input type="date" id="to-filter" />
        </div>
      </div>
    </div>
  );
};
export default TableFilters;
