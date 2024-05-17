"use client";
import { Input } from "@/components/ui/input";
import "../../styles/studentTable.scss";
import { Label } from "@/components/ui/label";
import { useTranslations } from "use-intl";
import { ChangeEvent, useState } from "react";
import {
  searchByName,
  searchByIdnp,
  setEndDate,
  setStartDate,
} from "../../lib/features/students/studentsSlice";
import { AppDispatch } from "@/app/lib/store";
import { useDispatch } from "react-redux";

const TableFilters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const handleDateFromChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDateFrom(event.target.value);
  };

  const handleDateToChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDateTo(event.target.value);
  };

  const t = useTranslations("student.page.filters");
  return (
    <div className="border border-gray-300 rounded-lg mb-4 p-3">
      <div className="flex justify-between items-center gap-3">
        <div className="w-1/4">
          <Label htmlFor="search-filter"> {t("search-label")} </Label>
          <Input
            type="search"
            id="search-filter"
            onChange={(e) => dispatch(searchByName(e.target.value))}
            placeholder={t("search-placeholder-by-name")}
          />
        </div>
        <div className="w-1/4">
          <Label htmlFor="search-filter"> {t("search-label")} </Label>
          <Input
            type="search"
            id="search-filter"
            onChange={(e) => dispatch(searchByIdnp(e.target.value))}
            placeholder={t("search-placeholder-by-idnp")}
          />
        </div>
        <div className="w-1/4">
          <Label htmlFor="from-filter">{t("date-label-from")}</Label>
          <Input
            type="date"
            id="from-filter"
            onChange={(e) => dispatch(setStartDate(e.target.value))}
          />
        </div>
        <div className="w-1/4">
          <Label htmlFor="to-filter">{t("date-label-to")}</Label>
          <Input
            type="date"
            id="to-filter"
            onChange={(e) => dispatch(setEndDate(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};
export default TableFilters;
